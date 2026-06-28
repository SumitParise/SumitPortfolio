import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import TechStack from './components/sections/TechStack';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SocialSidebar from './components/SocialSidebar';
import Loading from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Force ScrollTrigger to recalculate offsets once the heavy loading screen is unmounted
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-[#E8E8F0] selection:bg-[#6C63FF]/30 selection:text-white">
      {/* Page Loading Screen */}
      {isLoading && <Loading onComplete={() => setIsLoading(false)} />}

      {/* Custom Cursor for enhanced desktop interaction */}
      <CustomCursor />
      
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Social Sidebar (Fixed Left Pinned) */}
      <SocialSidebar />
      
      {/* Main Sections */}
      <main className="relative z-10 pl-0 md:pl-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
