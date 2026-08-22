import Hero from './sections/Hero';
import About from './sections/About';
import Domains from './sections/Domains';
import Events from './sections/Events';
import Legacy from './sections/Legacy';
import Knowledge from './sections/Knowledge';
import Challenges from './sections/Challenges';
import Sponsors from './sections/Sponsors';
import Team from './sections/Team';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Domains />
      <Team />
      <Events />
      <Legacy />
      <Knowledge />
      <Challenges />
      <Sponsors />
    </>
  );
}

export default Home;
