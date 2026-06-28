import useScrollReveal from '../../hooks/useScrollReveal';
import { PORTFOLIO } from '../../data/portfolio';

const Skills = () => {
  const containerRef = useScrollReveal<HTMLDivElement>({ stagger: 0.05 });

  // Map skill strings from PORTFOLIO.skills into categories dynamically
  const frontendSkills = PORTFOLIO.skills.filter(skill =>
    ['react', 'typescript', 'three.js', 'gsap', 'tailwind css', 'html5/css3'].includes(skill.toLowerCase())
  );

  const backendSkills = PORTFOLIO.skills.filter(skill =>
    ['node.js', 'python', 'fastapi', 'rest apis'].includes(skill.toLowerCase())
  );

  const devopsSkills = PORTFOLIO.skills.filter(skill =>
    ['git', 'docker'].includes(skill.toLowerCase())
  );

  const categories = [
    {
      title: "Frontend Development",
      skills: frontendSkills,
      description: "Building interactive, performant, and responsive client-side interfaces."
    },
    {
      title: "Backend & Systems",
      skills: backendSkills,
      description: "Designing scalable APIs, services, and handling server logic."
    },
    {
      title: "Tools & DevOps",
      skills: devopsSkills,
      description: "Managing containerization, version control, and environments."
    }
  ];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-12 max-w-6xl mx-auto overflow-hidden"
    >
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="w-10 h-[2px] bg-[#00D4FF]"></span>
          <span className="font-mono text-sm tracking-widest text-[#00D4FF] uppercase font-semibold">
            Expertise
          </span>
          <span className="w-10 h-[2px] bg-[#00D4FF]"></span>
        </div>
        
        <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          My Technical Skillset
        </h3>
        
        <p className="text-[#6B6B80] max-w-lg font-sans text-sm md:text-base">
          A summary of the languages, frameworks, and developer tools that I use to bring ideas to life.
        </p>
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, catIndex) => (
          <div
            key={catIndex}
            className="reveal-item p-6 md:p-8 rounded-2xl bg-[#111118] border border-[#1E1E2E] hover:border-[#6C63FF]/50 transition-all duration-300 group flex flex-col h-full shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
          >
            <h4 className="text-xl font-heading font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] group-hover:bg-[#00D4FF] transition-colors duration-300"></span>
              {cat.title}
            </h4>
            
            <p className="text-[#6B6B80] text-xs font-sans mb-6 leading-relaxed">
              {cat.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mt-auto">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="interactive px-3 py-1.5 rounded-lg bg-[#0a0a0f] border border-[#1E1E2E]/80 text-[#E8E8F0] font-mono text-xs hover:border-[#00D4FF] hover:text-[#00D4FF] hover:bg-[#00D4FF]/5 transition-all duration-300 select-none shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
