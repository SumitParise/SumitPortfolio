import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

const Contact = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (document.getElementById('form-name') as HTMLInputElement).value;
    const email = (document.getElementById('form-email') as HTMLInputElement).value;
    const message = (document.getElementById('form-message') as HTMLTextAreaElement).value;

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // Open default mail client pre-filled
    window.location.href = `mailto:${PORTFOLIO.email}?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden"
    >
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-10 h-[2px] bg-[#00D4FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#00D4FF] uppercase font-semibold">
            Contact
          </span>
          <span className="w-10 h-[2px] bg-[#00D4FF]"></span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          Get In Touch
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* Left Column - Contact Details */}
        <div className="reveal-item flex flex-col items-start h-full justify-between">
          <div>
            <h4 className="text-2xl font-heading font-bold text-white mb-6">
              Let's build something great together.
            </h4>
            
            <p className="text-[#6B6B80] font-sans text-base leading-relaxed mb-8">
              I am currently open to new opportunities, contract work, or just chatting about interesting web projects. 
              Drop me an email, and I'll get back to you as soon as possible.
            </p>

            {/* Email mailto link */}
            <a
              href={`mailto:${PORTFOLIO.email}`}
              className="interactive font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white hover:text-[#00D4FF] transition-colors duration-300 relative py-2 mb-10 block w-fit border-b border-dashed border-[#6C63FF] hover:border-[#00D4FF] break-all max-w-full overflow-hidden text-ellipsis"
            >
              {PORTFOLIO.email}
            </a>
          </div>

          {/* Social Links Row */}
          <div>
            <h5 className="font-mono text-xs text-[#6B6B80] uppercase tracking-wider mb-4">
              Find me on
            </h5>
            <div className="flex items-center gap-6">
              <a
                href={PORTFOLIO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive flex items-center gap-2 text-white hover:text-[#00D4FF] transition-colors duration-300 font-mono text-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={PORTFOLIO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive flex items-center gap-2 text-white hover:text-[#6C63FF] transition-colors duration-300 font-mono text-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form UI */}
        <div className="reveal-item p-4 xs:p-6 md:p-8 bg-[#111118]/70 border border-[#1E1E2E] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[360px] flex items-center justify-center">
          {submitted ? (
            <div className="text-center py-6 px-4 flex flex-col items-center justify-center w-full">
              {/* Success Tick Icon */}
              <div className="w-16 h-16 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,212,255,0.2)] animate-pulse">
                <svg className="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h4 className="text-2xl font-heading font-bold text-white mb-3">
                Message Drafted!
              </h4>
              <p className="text-[#6B6B80] font-sans text-sm leading-relaxed max-w-xs mb-6">
                Your default email client was opened to send the message to **{PORTFOLIO.email}**. Thank you for reaching out!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="interactive px-6 py-2.5 rounded-lg border border-[#1E1E2E] text-white hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all duration-300 font-mono text-xs"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div>
                <label htmlFor="form-name" className="block text-xs font-mono uppercase tracking-wider text-[#6B6B80] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="form-name"
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#0a0a0f] border border-[#1E1E2E] rounded-lg py-3 px-4 text-white font-sans text-sm focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all duration-300"
                />
              </div>
              
              <div>
                <label htmlFor="form-email" className="block text-xs font-mono uppercase tracking-wider text-[#6B6B80] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="form-email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-[#0a0a0f] border border-[#1E1E2E] rounded-lg py-3 px-4 text-white font-sans text-sm focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all duration-300"
                />
              </div>
              
              <div>
                <label htmlFor="form-message" className="block text-xs font-mono uppercase tracking-wider text-[#6B6B80] mb-2">
                  Message
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={4}
                  placeholder="Hey Sumit, let's discuss..."
                  className="w-full bg-[#0a0a0f] border border-[#1E1E2E] rounded-lg py-3 px-4 text-white font-sans text-sm focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="interactive w-full py-3.5 rounded-lg bg-[#6C63FF] text-[#E8E8F0] font-heading font-semibold hover:bg-[#6C63FF]/90 transition-all duration-300 shadow-[0_0_15px_rgba(108,99,255,0.2)] hover:shadow-[0_0_20px_rgba(108,99,255,0.4)]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
