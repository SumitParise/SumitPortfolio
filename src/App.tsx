import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SocialSidebar from './components/SocialSidebar';

function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-[#E8E8F0] selection:bg-[#6C63FF]/30 selection:text-white">
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
        <Experience />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
