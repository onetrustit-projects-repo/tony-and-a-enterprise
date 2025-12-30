import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Services from './sections/Services';
import About from './sections/About';
import Pricing from './sections/Pricing';
import Contact from './sections/Contact';
import Ecosystem from './sections/Ecosystem';
import Testimonials from './sections/Testimonials';

function App() {
  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-primary selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Pricing />
        <Ecosystem />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
