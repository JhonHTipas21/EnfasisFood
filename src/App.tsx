// ================================================================
// ÉNFASIS FOOD — App Root
// ================================================================
import './styles/global.css';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { MenuSection } from './features/menu/MenuSection';
import { Gallery } from './components/sections/Gallery';
import { SocialSection, Footer } from './components/sections/Social';
import { CartDrawer } from './features/cart/CartDrawer';

function App() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <Hero />
        <MenuSection />
        <Gallery />
        <SocialSection />
      </main>

      <Footer />

      {/* Global overlay components */}
      <CartDrawer />
    </>
  );
}

export default App;
