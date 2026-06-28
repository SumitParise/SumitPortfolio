import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

const Contact = () => {
  const containerRef = useScrollReveal<HTMLDivElement>();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/parisesumit86@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');
        setShowToast(true);
        
        // Auto-close toast notification after 5 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        alert("Failed to send message. Please email parisesumit86@gmail.com directly.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Failed to send message. Please email parisesumit86@gmail.com directly.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden relative"
    >
      {/* Toast CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slide-in-toast {
          0% { transform: translate3d(120%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes progress-shrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
      `}} />

      {/* Premium Toast Popup Notification */}
      {showToast && (
        <div 
          className="fixed top-6 right-6 z-[100000] bg-[#111118]/95 backdrop-blur-md border border-[#00D4FF]/30 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-start gap-3.5 w-[330px] overflow-hidden select-none pointer-events-auto"
          style={{
            animation: 'slide-in-toast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
          }}
        >
          <div className="w-10 h-10 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,212,255,0.15)]">
            <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h5 className="font-heading font-bold text-white text-sm">Message Sent!</h5>
            <p className="text-xs text-[#6B6B80] mt-1 font-sans leading-relaxed">
              Your message was sent to **parisesumit86@gmail.com**. Sumit will get back to you shortly.
            </p>
          </div>

          <button 
            onClick={() => setShowToast(false)}
            className="text-neutral-500 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 5-second animated progress bar countdown */}
          <div 
            className="absolute bottom-0 left-0 h-[3px] bg-[#00D4FF] shadow-[0_-2px_6px_#00D4FF]"
            style={{
              animation: 'progress-shrink 5s linear forwards'
            }}
          ></div>
        </div>
      )}

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

            <a
              href={`mailto:${PORTFOLIO.email}`}
              className="interactive font-heading text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white hover:text-[#00D4FF] transition-colors duration-300 relative py-2 mb-10 block w-fit border-b border-dashed border-[#6C63FF] hover:border-[#00D4FF] break-all max-w-full overflow-hidden text-ellipsis"
            >
              {PORTFOLIO.email}
            </a>
          </div>

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
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label htmlFor="form-name" className="block text-xs font-mono uppercase tracking-wider text-[#6B6B80] mb-2">
                Name
              </label>
              <input
                type="text"
                id="form-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hey Sumit, let's discuss..."
                className="w-full bg-[#0a0a0f] border border-[#1E1E2E] rounded-lg py-3 px-4 text-white font-sans text-sm focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="interactive w-full py-3.5 rounded-lg bg-[#6C63FF] text-[#E8E8F0] font-heading font-semibold hover:bg-[#6C63FF]/90 transition-all duration-300 shadow-[0_0_15px_rgba(108,99,255,0.2)] hover:shadow-[0_0_20px_rgba(108,99,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
