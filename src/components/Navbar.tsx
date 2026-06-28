import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PORTFOLIO } from '../data/portfolio';

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbar = navbarRef.current;
      if (!navbar) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide navbar
        gsap.to(navbar, { y: '-100%', duration: 0.3, ease: 'power2.inOut' });
      } else {
        // Scrolling up - show navbar
        gsap.to(navbar, { y: '0%', duration: 0.3, ease: 'power2.inOut' });
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    gsap.fromTo(
      navbar,
      { y: '-100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0f]/60 backdrop-blur-md border-b border-[#1E1E2E]/40 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300"
    >
      {/* Left Logo */}
      <a
        href="#"
        onClick={(e) => handleNavClick(e, 'hero')}
        className="font-heading font-bold text-lg md:text-xl tracking-wider text-white select-none flex items-center gap-1 group"
      >
        <span className="text-[#6C63FF] group-hover:text-[#00D4FF] transition-colors duration-300">&lt;</span>
        sumitparise.dev
        <span className="text-[#00D4FF] group-hover:text-[#6C63FF] transition-colors duration-300">/&gt;</span>
      </a>

      {/* Center Email (Clickable) */}
      <a
        href={`mailto:${PORTFOLIO.email}`}
        className="interactive hidden sm:block font-mono text-xs md:text-sm text-[#E8E8F0] hover:text-[#00D4FF] transition-colors duration-300 select-none py-1 border-b border-transparent hover:border-[#00D4FF]"
      >
        {PORTFOLIO.email}
      </a>

      {/* Right Anchors */}
      <nav className="flex items-center gap-6 md:gap-8">
        <ul className="flex items-center gap-6 md:gap-8">
          <li>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="font-heading text-xs md:text-sm font-semibold tracking-widest text-[#E8E8F0] hover:text-[#00D4FF] transition-colors duration-300 relative py-1"
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="font-heading text-xs md:text-sm font-semibold tracking-widest text-[#E8E8F0] hover:text-[#00D4FF] transition-colors duration-300 relative py-1"
            >
              WORK
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="font-heading text-xs md:text-sm font-semibold tracking-widest text-[#E8E8F0] hover:text-[#00D4FF] transition-colors duration-300 relative py-1"
            >
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
