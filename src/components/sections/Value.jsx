import React, { Suspense } from 'react';
import styled from 'styled-components';
import { lazy } from 'react';
import Projects from './earthsection/projects/index';

// Importation avec lazy loading pour Earth
const Earth = lazy(() => import('./earthsection/earth/index'));



const Section = styled.section`
  margin-top: 20rem;
  margin-bottom: 20rem;
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: 180vh;
    margin-top: 20rem;
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