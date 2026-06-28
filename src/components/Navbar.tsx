import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PORTFOLIO } from '../data/portfolio';

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbar = navbarRef.current;
      if (!navbar) return;

      // Only animate if mobile menu is closed
      if (!isMobileMenuOpen) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          // Scrolling down - hide navbar
          gsap.to(navbar, { y: '-100%', duration: 0.3, ease: 'power2.inOut' });
        } else {
          // Scrolling up - show navbar
          gsap.to(navbar, { y: '0%', duration: 0.3, ease: 'power2.inOut' });
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Handle entry animation for navbar on page load
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
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Projects', target: 'projects' },
    { label: 'Experience', target: 'experience' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#1E1E2E]/60 py-4 px-6 md:px-12 flex justify-between items-center transition-shadow duration-300"
    >
      <a
        href="#"
        onClick={(e) => handleNavClick(e, 'hero')}
        className="font-heading font-bold text-2xl tracking-wider text-white select-none flex items-center gap-1 group"
      >
        <span className="text-[#6C63FF] group-hover:text-[#00D4FF] transition-colors duration-300">&lt;</span>
        SP
        <span className="text-[#00D4FF] group-hover:text-[#6C63FF] transition-colors duration-300">/&gt;</span>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                onClick={(e) => handleNavClick(e, item.target)}
                className="font-heading text-sm font-medium tracking-wide text-[#E8E8F0] hover:text-[#00D4FF] transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#00D4FF] hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${PORTFOLIO.email}`}
          className="interactive px-5 py-2 rounded-full border border-[#6C63FF] text-sm text-[#E8E8F0] hover:bg-[#6C63FF]/15 hover:border-[#00D4FF] transition-all duration-300 font-heading font-medium tracking-wide shadow-[0_0_15px_rgba(108,99,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.2)]"
        >
          Let's Connect
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-[#E8E8F0] hover:text-[#00D4FF] focus:outline-none z-50 p-1"
        aria-label="Toggle Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 w-full h-screen bg-[#0a0a0f]/95 flex flex-col items-center justify-center transition-transform duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col items-center gap-8 mb-8">
          {navItems.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                onClick={(e) => handleNavClick(e, item.target)}
                className="font-heading text-2xl font-bold tracking-wide text-[#E8E8F0] hover:text-[#00D4FF] transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${PORTFOLIO.email}`}
          className="px-8 py-3 rounded-full border border-[#6C63FF] text-[#E8E8F0] hover:bg-[#6C63FF]/15 hover:border-[#00D4FF] transition-all duration-300 font-heading font-medium tracking-wide"
        >
          Let's Connect
        </a>
      </div>
    </header>
  );
};

export default Navbar;
