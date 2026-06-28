export const PORTFOLIO = {
  name: "Sumit Parise",
  role: "Software Engineer",
  tagline: "I build things for the web.",
  about: `I'm a Software Engineer passionate about crafting clean, performant, and user-focused digital experiences. I love working at the intersection of design and engineering — turning complex problems into elegant solutions.`,
  email: "sumitparise@gmail.com",
  github: "https://github.com/SumitParise",
  linkedin: "https://linkedin.com/in/sumitparise",
  twitter: "https://x.com/sumitparise",
  instagram: "https://instagram.com/sumitparise",
  resume: "/resume.pdf",
  skills: [
    "React", "TypeScript", "Node.js", "Python",
    "Three.js", "GSAP", "REST APIs", "Git", "Docker",
    "Tailwind CSS", "HTML5/CSS3", "FastAPI"
  ],
  projects: [
    {
      title: "Interactive 3D Portfolio",
      description: "An immersive developer portfolio crafted with React Three Fiber, GSAP scroll-triggered animations, and a customized interactive custom cursor.",
      tech: ["React", "TypeScript", "Three.js", "GSAP", "Tailwind CSS"],
      link: "https://github.com/SumitParise/SumitPortfolio",
      live: "https://sumitparise.dev"
    },
    {
      title: "AI Code Reviewer",
      description: "Automated analysis tool leveraging LLMs to detect syntax bugs, security vulnerabilities, and suggest refactoring improvements on pull requests.",
      tech: ["Python", "FastAPI", "React", "Docker"],
      link: "https://github.com/SumitParise/ai-code-reviewer",
      live: ""
    },
    {
      title: "DevSync",
      description: "A real-time collaborative workspace featuring a rich-text code editor, synchronized state synchronization over WebSockets, and built-in sandbox preview.",
      tech: ["React", "Node.js", "Socket.io", "TypeScript"],
      link: "https://github.com/SumitParise/devsync",
      live: "https://devsync-app.vercel.app"
    }
  ],
  experience: [
    {
      company: "TechSolutions Inc.",
      role: "Software Engineer",
      period: "Jan 2023 – Present",
      description: "Architecting high-performance React frontends and designing scalable microservices. Spearheaded transition to modern monorepo setup."
    },
    {
      company: "Innovation Labs",
      role: "Associate Developer",
      period: "Jun 2021 – Dec 2022",
      description: "Developed and maintained RESTful APIs using Python and FastAPI. Improved query optimization on database operations, cutting latency by 25%."
    }
  ]
}
