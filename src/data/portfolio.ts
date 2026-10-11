export interface AssignmentItem {
  id: number;
  question: string;
  category: string;
  summary: string;
  answer: string;
  keyPoints?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  details?: Record<string, string>;
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  repoUrl: string;
  readmeUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  specialization?: string;
  grade: string;
  period: string;
  location: string;
}

export interface AchievementItem {
  title: string;
  category: string;
  subtitle: string;
  period: string;
  description: string;
  placeholderText?: string;
  highlights: string[];
  imageUrl?: string;
  organizer?: string;
  date?: string;
  team?: string;
}

export interface PortfolioData {
  student: {
    name: string;
    monogram: string;
    photoUrl?: string;
    uid: string;
    branch: string;
    specialization: string;
    university: string;
    location: string;
    cgpa: string;
    section: string;
    submittedTo: string;
    tagline: string;
    supportingSentence: string;
    aboutBio: string;
    strengths: string[];
    academicInterests: string[];
    technicalSkills: {
      category: string;
      items: string[];
    }[];
    futureGoals: {
      placeholder: string;
      statement: string;
    };
    contact: {
      email: string;
      githubUrl: string;
      linkedinUrl: string;
      leetcodeUrl: string;
    };
    documents: {
      resumePdf: string;
      assignmentPdf: string;
    };
  };
  education: EducationItem[];
  featuredProject: ProjectItem;
  otherProjects: ProjectItem[];
  achievements: AchievementItem[];
  assignments: AssignmentItem[];
}

export const portfolioData: PortfolioData = {
  student: {
    name: "Subarna Lodh",
    monogram: "SL",
    photoUrl: "/profile.jpg",
    uid: "25BAI10051",
    branch: "B.E. CSE (AI)",
    specialization: "AI (in collaboration with Microsoft)",
    university: "Chandigarh University",
    location: "Mohali, Punjab",
    cgpa: "7.9",
    section: "25BAH-601",
    submittedTo: "Dr. Ruchika Gupta",
    tagline: "Computer Science Student | AI Enthusiast | Developer",
    supportingSentence:
      "Exploring software development, artificial intelligence, automation and problem solving.",
    aboutBio:
      "I am a motivated B.Tech CSE (Microsoft AI) student at Chandigarh University with a strong interest in software development, artificial intelligence and automation. I have experience with Python, C, C++, Data Structures and Algorithms, and workflow automation using n8n. I have worked on projects involving student management, cyber threat/dashboard concepts, and real-time weather applications.",
    strengths: [
      "Problem Solving",
      "Teamwork",
      "Communication",
      "Quick Learning",
    ],
    academicInterests: [
      "Software Development",
      "Artificial Intelligence",
      "Automation",
      "Data Structures & Algorithms",
      "Computer Organization & Architecture",
    ],
    technicalSkills: [
      {
        category: "Programming Languages",
        items: ["Python", "C", "C++"],
      },
      {
        category: "Core Foundations",
        items: ["Data Structures & Algorithms", "Computer Organization & Architecture"],
      },
      {
        category: "Automation & Systems",
        items: ["n8n / Workflow Automation", "Git & GitHub", "Linux Environment"],
      },
    ],
    futureGoals: {
      placeholder: "[ADD FUTURE GOALS]",
      statement:
        "Dedicated to deepening architectural mastery across hardware-software interfaces, advancing applied machine learning systems, and engineering robust, scalable software solutions that deliver high real-world impact.",
    },
    contact: {
      email: "subarna.gungun2006@gmail.com",
      githubUrl: "https://github.com/SubarnaLodh",
      linkedinUrl: "https://www.linkedin.com/in/subarna-lodh-3b39b6383/",
      leetcodeUrl: "https://leetcode.com/u/Subarna_Lodh/",
    },
    documents: {
      resumePdf: "/docs/Subarna_Lodh_Resume.pdf",
      assignmentPdf: "/docs/25BAI10051_COA_Assignment_1.pdf",
    },
  },

  education: [
    {
      degree: "Bachelor of Computer Science Engineering",
      institution: "Chandigarh University, Mohali",
      specialization: "AI (in collaboration with Microsoft)",
      grade: "CGPA: 7.9",
      period: "2025–2029",
      location: "Mohali, Punjab",
    },
    {
      degree: "Intermediate",
      institution: "Udaipur Eng. Med. School",
      grade: "87.5% CBSE",
      period: "2023–2025",
      location: "Udaipur, Tripura",
    },
    {
      degree: "Matriculation",
      institution: "Don Bosco School, Udaipur",
      grade: "94.5% CBSE",
      period: "2022–2023",
      location: "Udaipur, Tripura",
    },
  ],

  featuredProject: {
    title: "Instruction Set Simulator",
    category: "Computer Organization & Architecture",
    description:
      "An academic project focused on simulating instruction-set concepts and demonstrating core Computer Organization and Architecture principles.",
    repoUrl:
      "https://github.com/SubarnaLodh/25BAI10051-Instruction-Set-Simulator-COA.git",
    readmeUrl:
      "https://github.com/SubarnaLodh/25BAI10051-Instruction-Set-Simulator-COA/blob/main/README.md",
    tags: [
      "Computer Architecture",
      "Assembly & ISA",
      "Instruction Cycles",
      "Simulation",
      "Academic Project",
    ],
    featured: true,
  },

  otherProjects: [
    {
      title: "Student Management System",
      category: "Software Development & Systems",
      description:
        "Developed a student-focused management application demonstrating practical programming fundamentals, modular architecture, and structured data handling.",
      repoUrl:
        "https://github.com/SubarnaLodh/25BAI10051-Student-Management-System.git",
      tags: ["Python / C++", "Data Management", "CLI / GUI", "Algorithms"],
    },
    {
      title: "Cyber Threat Dashboard",
      category: "Security & Monitoring",
      description:
        "Conceptualized and developed an interactive dashboard interface for monitoring security events, network indicators, and real-time threat intelligence feeds.",
      repoUrl:
        "https://github.com/SubarnaLodh/v0-cyber-threat-dashboard.git",
      tags: ["Dashboard", "UI / UX", "Threat Analytics", "Web Technologies"],
    },
    {
      title: "Weather Forecasting Application",
      category: "APIs & Python Applications",
      description:
        "Built a Python GUI application that fetches real-time weather data through the OpenWeather API, allowing users to search cities and view temperature, humidity, and wind speed with strict input validation.",
      repoUrl:
        "https://github.com/SubarnaLodh/25bai10051_python-weather-app.git",
      tags: ["Python", "OpenWeather API", "GUI Application", "REST API"],
    },
  ],

  achievements: [
    {
      title: "Integrated Green Mobility Ideathon — Sustainable Vehicles",
      category: "Ideathon Participation",
      subtitle: "Chandigarh University & Ignite Youth Club (IKS)",
      period: "16 February 2026",
      description:
        "Participation in an ideathon focused on sustainable vehicles inspired by Indian Knowledge Systems, developing technology-enabled concepts for clean urban transit.",
      imageUrl: "/achievements/IKS.jpeg",
      organizer: "Chandigarh University and Ignite Youth Club, in collaboration with Indian Knowledge Systems",
      date: "16 February 2026",
      highlights: [
        "Collaborative problem solving and ideation",
        "Sustainable vehicles inspired by Indian Knowledge Systems",
        "Interdisciplinary team presentation",
      ],
    },
    {
      title: "Microsoft Certified — Azure Fundamentals",
      category: "Professional Certification",
      subtitle: "Microsoft Certified Credential",
      period: "20 November 2025",
      description:
        "Microsoft Azure Fundamentals certification demonstrating foundational knowledge of cloud computing, core Azure architecture, security, and cloud governance.",
      imageUrl: "/achievements/AZ900.jpeg",
      organizer: "Microsoft",
      date: "20 November 2025",
      highlights: [
        "Core Azure architectural services and computing models",
        "Cloud security, defense-in-depth, and privacy standards",
        "Identity, governance, compliance, and cost management",
      ],
    },
    {
      title: "HERizon 2026 — Discipline Coordinator",
      category: "Certificate of Appreciation",
      subtitle: "Chandigarh University & IEEE India Council",
      period: "27–28 March 2026",
      description:
        "Recognition for contributions as a Discipline Coordinator (She Points) during HERizon 2026, supporting event operations and participant coordination.",
      imageUrl: "/achievements/IEEE.jpeg",
      organizer: "Chandigarh University and IEEE India Council",
      date: "27–28 March 2026",
      highlights: [
        "Discipline Coordinator (She Points) leadership",
        "Joint initiative by Chandigarh University & IEEE India Council",
        "Event operations, crowd management, & coordination",
      ],
    },
    {
      title: "Build Summit 2026 — Byte Built 1.0",
      category: "Participation",
      subtitle: "Chandigarh University",
      period: "14–15 September 2026",
      description:
        "Participation in Build Summit 2026, celebrating engineering, creativity, innovation, and technology through hands-on technical tracks.",
      imageUrl: "/achievements/BYTEXL.jpeg",
      organizer: "Chandigarh University",
      date: "14–15 September 2026",
      highlights: [
        "Hands-on engineering, creativity, and technical innovation",
        "Celebration of technology and collaborative software design",
        "Active participation in campus technical build track",
      ],
    },
    {
      title: "Build With Bharat 2.0 — National-Level Hackathon",
      category: "Hackathon Participation",
      subtitle: "Build With Bharat 2.0 (NIT Delhi)",
      period: "13–14 September 2026",
      description:
        "Participation in the PPT Submission Round of the Build With Bharat 2.0 national-level hackathon as part of Team Cipher Core.",
      imageUrl: "/achievements/Built%20with%20bharat.png",
      organizer: "Build With Bharat 2.0, held at NIT Delhi",
      date: "13–14 September 2026",
      team: "Cipher Core",
      highlights: [
        "National-level hackathon held at NIT Delhi",
        "PPT Submission Round participant",
        "Team: Cipher Core",
      ],
    },
  ],

  assignments: [
    {
      id: 1,
      question: "What is Raspberry Pi?",
      category: "Embedded & Single-Board Computers",
      summary:
        "Affordable credit-card-sized single-board computer developed in the UK for education, robotics, and hardware automation.",
      answer:
        "Raspberry Pi, which was made in the United Kingdom (UK), is a small, affordable single-board computer developed by the Raspberry Pi Foundation. People from all over the world use this small computer to build hardware projects, learn programming skills, automate home appliances, and much more.\n\nUnlike traditional computers, a Raspberry Pi is the size of a credit card, but contains all the essential computing components on a single board. It mainly runs on Linux and features a set of General Purpose Input/Output (GPIO) pins for interfacing with and controlling electronic systems.",
      keyPoints: [
        "Single-Board Computer (SBC) designed by Raspberry Pi Foundation (UK).",
        "Credit-card form factor containing CPU, GPU, RAM, USB, HDMI, and network ports.",
        "Equipped with GPIO pins for direct hardware and sensor automation.",
        "Primarily runs Linux distributions (such as Raspberry Pi OS).",
      ],
    },
    {
      id: 2,
      question: "AI Summit 10 Key Takeaways",
      category: "Artificial Intelligence & Global Policy",
      summary:
        "The 10 foundational pillars from the AI Summit 2026 covering ethics, democratization, infrastructure, and international cooperation.",
      answer:
        "The key takeaways of AI Summit 2026 highlighted pivotal directions for responsible AI development, sustainable infrastructure, and global governance:",
      keyPoints: [
        "AI FOR ALL: 'Sarvajan Hitaya, Sarvajan Sukhaya' (Welfare for All, Happiness for All). AI must not exclusively benefit large tech corporations or advanced nations; it should directly assist farmers in detecting crop diseases, empower students learning regional languages, and help individuals with disabilities communicate smoothly.",
        "Democratization of AI: AI computing and data resources should not be monopolized by wealthy tech giants. Broadening affordable access to datasets, foundation models, and scalable compute bridges the global divide.",
        "HUMAN + AI: Reframing the narrative from 'AI will replace humans' to an era of collaborative synergy where humans and AI co-work, co-create, and co-evolve.",
        "M.A.N.A.V. Framework: M — Moral and Ethical Systems; A — Accountable Governance; N — National Sovereignty; A — Accessible and Inclusive; V — Valid and Legitimate.",
        "Multilingual AI: Recognizing linguistic diversity (particularly in India and the Global South) by building foundational models native to vernacular languages beyond English.",
        "AI for Economic Growth and Social Good: Acknowledging that cloud AI consumes vast server, electricity, water, and cooling resources; growth must be aligned with energy efficiency and green sustainability.",
        "India as an AI Innovation Hub: Evolving from a pure technology consumer into a global creator, tester, and exporter of foundational AI solutions.",
        "Building Computing Infrastructure: Urgent domestic expansion of high-density GPUs, green datacenters, high-speed networking, and cooling systems.",
        "Massive Capital Investment: Developing the AI economy requires immense capital commitments; post-summit commitments exceeded $250 billion across the AI value chain.",
        "International Cooperation: AI safety cannot be solved unilaterally. The New Delhi Declaration was endorsed by 92 countries and international bodies to foster multilateral governance.",
      ],
    },
    {
      id: 3,
      question: "What is Yotta?",
      category: "Cloud & AI Infrastructure",
      summary:
        "Indian hyper-scale data center and cloud infrastructure provider powering AI workloads through Shakti Cloud GPU clusters.",
      answer:
        "Yotta is a major data center and cloud infrastructure provider in India that provides advanced AI computing infrastructure and cloud services to enterprises, government institutions, researchers, and AI developers to train and run modern AI systems.\n\nYotta delivers an AI-focused cloud platform called the SHAKTI CLOUD, which offers high-performance NVIDIA GPU computing clusters tailored for heavy AI training, fine-tuning, and inference workloads.",
      keyPoints: [
        "Leading Indian cloud and sovereign data center infrastructure company.",
        "Provides SHAKTI CLOUD: high-density GPU supercomputing for AI developers.",
        "Delivers end-to-end colocation, enterprise cloud, and scalable AI accelerators.",
      ],
    },
    {
      id: 4,
      question: "What is NPTEL?",
      category: "Education & Academic Initiatives",
      summary:
        "National Programme on Technology Enhanced Learning — premier e-learning initiative by IITs and IISc.",
      answer:
        "NPTEL stands for National Programme on Technology Enhanced Learning. It is a premier online learning initiative established by leading Indian Institutes of Technology (IITs) and the Indian Institute of Science (IISc) to provide high-quality, free educational coursework primarily across engineering, technology, and sciences.\n\nNPTEL also offers proctored examinations and verifiable certifications at the completion of courses upon finishing scheduled assignments and passing the final examination.",
      keyPoints: [
        "Joint initiative of 7 Indian Institutes of Technology (IITs) and IISc Bangalore.",
        "Free open-access video lectures and curriculum for engineering and technology.",
        "Provides recognized certifications through proctored examinations.",
      ],
    },
    {
      id: 5,
      question: "How to decide a programming language to design an application and what are the parameters?",
      category: "Software Engineering & Architecture",
      summary:
        "Framework for selecting software languages based on application domain, performance thresholds, and ecosystem support.",
      answer:
        "A programming language should never be chosen merely based on popularity or hype. Instead, architects and engineers evaluate specific parameters to find the optimal fit for the project:",
      keyPoints: [
        "Type of Application: Identify the platform and deployment environment. Web Applications: JavaScript, TypeScript, Python; Desktop Applications: C++, C, Python, Java; Game Applications: C++, C, C#.",
        "Performance Requirements: High Performance & Low Latency: C, C++, Rust; Rapid Development & Prototyping where raw execution speed is less critical: Python, Java.",
        "Ecosystem, Libraries & Frameworks: Python: Machine Learning, Artificial Intelligence, Data Science, Workflow Automation; JavaScript/TypeScript: Full-stack Web Development (React, Next.js, Node.js); Java: High-concurrency enterprise and banking systems; C++: Systems programming, game engines, graphics, and real-time execution; C#: Windows desktop, enterprise .NET, and Unity game development.",
        "Developer Velocity & Maintenance: Availability of documentation, developer talent pool, community support, and long-term maintainability.",
      ],
    },
    {
      id: 6,
      question: "RAM size, Word size, meaning if system is of 64 bit, speed and OS of our laptop.",
      category: "Hardware Specifications & Architecture",
      summary:
        "Personal laptop system profile: 16 GB RAM, 64-bit word size (8 bytes), 2.10 GHz clock frequency, 64-bit Windows OS.",
      answer:
        "Detailed architectural breakdown of the student laptop hardware configuration:",
      keyPoints: [
        "RAM Size: 16 GB — Represents the primary volatile working memory available for active processes, instruction buffering, and memory paging.",
        "Word Size: 64-bit (8 bytes) — The natural data unit that the CPU processor registers, ALUs, and internal data buses manipulate simultaneously in a single clock cycle.",
        "Meaning of 64-bit System: Both the CPU registers/ALU and the operating system architecture handle 64-bit virtual memory addresses and integer data types, enabling direct access to virtually unlimited physical memory (>4 GB limit of 32-bit systems).",
        "Processor Clock Speed: 2.10 GHz base clock — Dictates the internal clock frequency generating pulses to synchronize micro-operations and instruction execution cycles.",
        "Operating System: 64-bit Windows — Coordinates hardware resource abstraction, process scheduling, and memory protection.",
      ],
    },
    {
      id: 7,
      question: "Which CPU organization is my laptop?",
      category: "CPU & Microarchitecture",
      summary: "Processor architecture classification: Intel Core i5.",
      answer:
        "The laptop processor is organized around the Intel Core i5 processor microarchitecture, featuring multi-core pipelined processing, multi-level internal caches (L1, L2, and shared L3 Smart Cache), out-of-order execution, and integrated hardware vector extensions.",
      keyPoints: [
        "CPU Family: Intel Core i5.",
        "Microarchitecture: Multi-core, multi-threaded pipelined CPU organization.",
        "Cache Hierarchy: Dedicated L1 instruction/data caches, dedicated L2 caches, and unified L3 Smart Cache.",
      ],
    },
    {
      id: 8,
      question: "Why is GPU faster than CPU?",
      category: "Parallel Processing & Architecture",
      summary:
        "CPUs optimize for low-latency serial logic with large caches, while GPUs use thousands of smaller cores for massive SIMD parallel data throughput.",
      answer:
        "A CPU is designed as the versatile, general-purpose brain of the computer. It excels at low-latency sequential operations, intricate control-flow logic, branching, and managing system-wide tasks using large cache memories and sophisticated branch predictors.\n\nIn contrast, a GPU (Graphics Processing Unit) is engineered with thousands of smaller, streamlined arithmetic cores organized for massive parallel execution. Because computer graphics and deep neural network matrices consist of millions of independent calculations that can be computed simultaneously, a GPU provides dramatically higher arithmetic throughput and memory bandwidth than a CPU.",
      keyPoints: [
        "CPU focus: Optimized for low latency, single-threaded execution, complex instruction pipelines, and serial branch prediction.",
        "GPU focus: Optimized for massive throughput, data-parallel processing (SIMD / SIMT), and high floating-point arithmetic density.",
        "Core count comparison: Modern CPUs have 8–24 high-performance cores; modern GPUs possess thousands of stream cores.",
      ],
    },
    {
      id: 9,
      question: "CPU vs TPU vs GPU Comparison",
      category: "Hardware Accelerators",
      summary:
        "Comparative evaluation across Central Processing Units, Tensor Processing Units, and Graphics Processing Units.",
      answer:
        "Comparison of computing paradigms across CPU, TPU, and GPU architectures:",
      tableData: {
        headers: ["Parameter", "CPU", "TPU", "GPU"],
        rows: [
          [
            "Full Form",
            "Central Processing Unit",
            "Tensor Processing Unit",
            "Graphics Processing Unit",
          ],
          [
            "Primary Purpose",
            "General-purpose computing, system management, control flow",
            "Specialized application-specific ASIC designed for AI matrix operations",
            "Massively parallel computing, graphics rendering, array processing",
          ],
          [
            "Architectural Strength",
            "Low latency, high clock frequency, complex branch prediction",
            "Systolic arrays executing high-speed matrix multiplications directly in hardware",
            "Thousands of SIMD cores delivering high parallel floating-point throughput",
          ],
          [
            "Best Suited For",
            "Operating systems, everyday computing, serial application logic",
            "TensorFlow & large-scale neural network training/inference",
            "Gaming, 3D graphics, deep learning, scientific simulations",
          ],
          [
            "AI Workload Speed",
            "Standard / Baseline",
            "Very High (for dedicated matrix tensor operations)",
            "Excellent (across flexible deep learning frameworks)",
          ],
          [
            "Pioneered / Built By",
            "Intel, AMD, ARM, Apple",
            "Google",
            "NVIDIA, AMD, Intel",
          ],
        ],
      },
    },
    {
      id: 10,
      question: "Who won the Turing Award last year?",
      category: "Computer Science Honors",
      summary:
        "Charles H. Bennett and Gilles Brassard for foundational contributions to quantum information science and quantum cryptography.",
      answer:
        "In 2025, the prestigious ACM A.M. Turing Award — widely regarded as the 'Nobel Prize of Computing' — was awarded to Charles H. Bennett (IBM Fellow Emeritus) and Gilles Brassard (Université de Montréal) for their foundational and groundbreaking contributions to quantum information science, including the invention of quantum cryptography (BB84 protocol) and quantum teleportation.\n\nThe Turing Award carries an accompanying prize of $1,000,000, supported by Google.",
      keyPoints: [
        "Laureates: Charles H. Bennett & Gilles Brassard.",
        "Field of Achievement: Quantum Information Science & Quantum Cryptography.",
        "Key Milestone: Invention of the BB84 quantum key distribution protocol.",
        "Significance: The highest honor in computer science ($1,000,000 prize).",
      ],
    },
    {
      id: 11,
      question: "What is the Stampeding Herd problem?",
      category: "Distributed Systems & Concurrency",
      summary:
        "System failure mode occurring when thousands of concurrent clients simultaneously request a cached or shared resource.",
      answer:
        "In computing and distributed systems, the Stampeding Herd problem (also widely termed the Thundering Herd Problem) occurs when a large cluster of waiting threads, processes, or clients all awaken simultaneously to access the same scarce system resource, causing an immediate cascade of contention and system overload.\n\nA classic real-world example is an e-commerce flash sale or ticket release: if 100,000 users all attempt to refresh and purchase a hot item at the exact moment cache expiration occurs, all 100,000 requests bypass the cache and hammer the underlying database directly at the same instant. The server becomes overwhelmed with identical read/write locks, leading to drastic latency spikes, resource exhaustion, or total system crashes.",
      keyPoints: [
        "Occurs when many concurrent clients contest a single resource upon event trigger or cache expiration.",
        "Causes CPU spikes, socket exhaustion, database connection pool saturation, and system crash.",
        "Common Mitigation Strategies: Mutual exclusion locks (Mutex / Single-Flight), Cache warming, Probabilistic early expiration (XFetch), and Exponential backoff with jitter.",
      ],
    },
    {
      id: 12,
      question: "Who is the founder of Intel and AMD?",
      category: "Semiconductor Industry History",
      summary:
        "Intel founded by Robert Noyce & Gordon Moore (1968); AMD founded by Jerry Sanders and co-founders (1969).",
      answer:
        "Historical origins and founders of the two semiconductor giants that shaped modern microprocessor architecture:\n\nIntel Corporation:\nFounded on July 18, 1968 by semiconductor pioneers Robert Noyce and Gordon Moore (famed for Moore's Law), along with third employee Andy Grove. Intel is headquartered in Santa Clara, California, USA.\n\nAdvanced Micro Devices, Inc. (AMD):\nFounded on May 1, 1969 by Jerry Sanders, along with seven colleagues who departed from Fairchild Semiconductor (Jack Gifford, Edwin Turney, John Carey, Sven Simonsen, Frank Botte, Jim Giles, and Larry Stenger). AMD is headquartered in Santa Clara, California, USA.",
      keyPoints: [
        "Intel Corporation: Founded July 18, 1968 by Robert Noyce & Gordon Moore (Santa Clara, CA, USA).",
        "AMD (Advanced Micro Devices): Founded May 1, 1969 by Jerry Sanders and 7 co-founders (Santa Clara, CA, USA).",
        "Both companies emerged from Fairchild Semiconductor alumni and drove the evolution of the x86 microprocessor architecture.",
      ],
    },
  ],
};
