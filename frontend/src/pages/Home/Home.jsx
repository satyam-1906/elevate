import React from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Domains from './sections/Domains';
import Events from './sections/Events';
import Legacy from './sections/Legacy';
import Knowledge from './sections/Knowledge';
import Challenges from './sections/Challenges';
import Sponsors from './sections/Sponsors';

function Home() {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Domains />
      <Events />
      <Legacy />
      <Knowledge />
      <Challenges />
      <Sponsors />
    </div>
  );
}

export default Home;
