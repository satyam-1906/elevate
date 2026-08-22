import React, { lazy, Suspense } from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Domains from './sections/Domains';

const Events = lazy(() => import('./sections/Events'));
const Legacy = lazy(() => import('./sections/Legacy'));
const Knowledge = lazy(() => import('./sections/Knowledge'));
const Challenges = lazy(() => import('./sections/Challenges'));
const Sponsors = lazy(() => import('./sections/Sponsors'));

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Domains />
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading section...</div>}>
        <Events />
        <Legacy />
        <Knowledge />
        <Challenges />
        <Sponsors />
      </Suspense>
    </div>
  );
}

export default Home;
