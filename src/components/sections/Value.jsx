import React, { Suspense } from 'react';
import styled from 'styled-components';
import { lazy } from 'react';
import Projects from './earthsection/projects/index';

// Importation avec lazy loading pour Earth
const Earth = lazy(() => import('./earthsection/earth/index'));



const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;

  @media (max-width: 768px) {
    margin-bottom: 20rem;
    height: auto;
    min-height: 140vh;
  }
`;

const Value = () => {
  return (
    <Section id="value">
      <Suspense fallback={<div>Chargement de la Terre...</div>}>
        <Earth />
      </Suspense>
      <Projects />
    </Section>
  );
};

export default Value;