import { createContext, useContext, useState, useEffect } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

const ModelsContext = createContext(false)

export const useModelsLoaded = () => useContext(ModelsContext)

export function ModelsProvider({ children }) {
  const [modelsLoaded, setModelsLoaded] = useState(false)

  useEffect(() => {
    const modelPaths = [
      '/safe-transformed.glb',
      '/handshake-transformed.glb',
      '/mobile-transformed.glb',
      '/padlock-transformed.glb',
      '/mac-draco.glb',
      
    ]

    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    dracoLoader.preload()
    loader.setDRACOLoader(dracoLoader)

    Promise.all(
      modelPaths.map((path) =>
        loader.loadAsync(path).then((gltf) => {
          // console.log(`Modèle chargé avec succès : ${path}`)
          return gltf
        })
      )
    )
      .then(() => {
        // console.log('Tous les modèles sont chargés !')
        setModelsLoaded(true)
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des modèles :', error)
      })
  }, [])

  return (
    <ModelsContext.Provider value={modelsLoaded}>
      {children}
    </ModelsContext.Provider>
  )
}
