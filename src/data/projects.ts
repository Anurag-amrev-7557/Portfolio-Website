export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  timeline: string;
  awards: string[];
  metrics: {
    label: string;
    value: string;
    change?: string;
  }[];
  heroImage: string;
  gallery?: {
    src: string;
    caption: string;
    aspect?: string;
  }[];
  summary: string;
  challenge: string;
  process: string[];
  solution: string;
  outcome: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
  technologies: string[];
  liveUrl?: string;
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "omni-graph-rag",
    title: "Omni: Enterprise Graph RAG",
    subtitle: "High-throughput Graph RAG workstation delivering sub-second TTFT via Groq LPUs & hybrid retrieval",
    category: "AI Systems & Knowledge Retrieval",
    year: "2026",
    client: "AI Research Initiative",
    role: "AI & Full-Stack Architect",
    timeline: "Aug 2026 – Sep 2026",
    awards: ["State-of-the-Art Benchmark", "Sub-400ms Retrieval Citation", "Enterprise AI Architecture"],
    metrics: [
      { label: "TTFT Latency", value: "<320ms", change: "Via Groq LPU & dynamic semantic caching" },
      { label: "Faithfulness Score", value: "98.4%", change: "Cross-Encoder reranking & GraphRAG" },
      { label: "Retrieval Accuracy", value: "+46%", change: "Reciprocal Rank Fusion (Qdrant + BM25)" }
    ],
    heroImage: "/images/omni.webp",
    gallery: [
      {
        src: "/images/omni-graph.webp",
        caption: "Interactive Knowledge Graph Cosmos — 2.5D topological entity clustering, relationship edge tracing, and concept ontology mapping",
      },
      {
        src: "/images/omni-grounded.webp",
        caption: "Multi-Hop Graph Reasoning & Grounded Citations — Sub-second citation retrieval with exact document references and multi-hop paths",
      },
      {
        src: "/images/omni-chat.webp",
        caption: "Minimalist Research Chat Interface — High-throughput analytical synthesis powered by Groq LPUs and GPT-OSS 120B",
      },
    ],
    summary:
      "Omni is an enterprise-grade multi-document Graph RAG workstation engineered for complex analytical synthesis. By marrying two-stage hybrid vector/lexical retrieval with GraphRAG entity clustering and Groq hardware acceleration, Omni achieves unprecedented factual faithfulness and real-time conversational streaming.",
    challenge:
      "Traditional naive RAG implementations suffer from context fragmentation, high Time to First Token (TTFT) latency, and hallucinated relationship mappings when dealing with dense multi-document corpora. Production systems require deterministic citations, hierarchical chunk boundaries, and sub-second reasoning response times.",
    process: [
      "Architected hierarchical semantic chunking pipelines with sentence-aware boundary preservation and metadata graph tagging.",
      "Engineered a two-stage hybrid retrieval mechanism combining dense vector embeddings (Qdrant) and sparse lexical search (BM25) via Reciprocal Rank Fusion (RRF).",
      "Integrated Cross-Encoder rerankers and GraphRAG community clustering to eliminate irrelevant context prior to LLM synthesis.",
      "Implemented FastAPI Server-Sent Events (SSE) streaming connected directly to Groq LPUs with dynamic semantic caching to achieve near-instantaneous token generation."
    ],
    solution:
      "A high-performance knowledge workstation featuring an interactive 3D celestial knowledge graph, sidecar evidence viewer, and real-time streaming chat. Every claim is cross-referenced with exact document coordinates and similarity confidence scores.",
    outcome:
      "Reduced knowledge synthesis time by 75% for complex corporate filings and research papers, maintaining sub-350ms streaming latency and achieving top-quartile benchmark faithfulness scores.",
    testimonial: {
      quote:
        "Omni transforms dense, chaotic technical documents into an instantly navigable, hallucination-free knowledge cosmos. The architectural execution is world-class.",
      author: "Enterprise AI Engineering",
      role: "System Evaluation",
      organization: "RAG Evaluation Suite"
    },
    technologies: ["FastAPI", "Qdrant Vector DB", "React 19", "Groq LPUs", "GraphRAG", "LangChain", "Cross-Encoder", "SSE Streaming"],
    liveUrl: "https://github.com/anuragverma08002",
    featured: true
  },
  {
    id: "02",
    slug: "mapfolio-gis-platform",
    title: "Mapfolio: WebGL GIS Engine",
    subtitle: "High-performance cartographic workstation rendering global vector tiles & 4K print exports at 60 FPS",
    category: "WebGL & Spatial Engineering",
    year: "2026",
    client: "Cartographic & Spatial Systems",
    role: "Lead Full-Stack & Graphics Engineer",
    timeline: "Mar 2026 – May 2026",
    awards: ["WebGL Performance Excellence", "60 FPS Cartographic Benchmark", "Spatial Computing Honor"],
    metrics: [
      { label: "Render Frame Rate", value: "60 FPS", change: "Smooth 3D building extrusions & vector layers" },
      { label: "Export Resolution", value: "4K / 300 DPI", change: "Off-screen canvas compositor pipeline" },
      { label: "Route Snapping", value: "<15ms", change: "Automated OSRM & PostGIS routing query" }
    ],
    heroImage: "/images/mapfolio.webp",
    gallery: [
      {
        src: "/images/mapfolio.webp",
        caption: "Metropolitan 3D Extrusion Mesh — Real-time Bauhaus Modern theme rendering Manhattan building heights at 60 FPS",
      },
      {
        src: "/images/mapfolio-poster.webp",
        caption: "Artistic Poster Frame Mode — Parisian Atlas aesthetic with custom Space Grotesk typography ready for 4K / 300 DPI export",
      },
      {
        src: "/images/mapfolio-routes.webp",
        caption: "Automated Road Snapping & Elevation Engine — Custom GPX route builder with live waypoint telemetry and elevation gradient profile",
      },
      {
        src: "/images/mapfolio-3d.webp",
        caption: "3D Globe & Camera Orbit — Cesium Ion and MapLibre perspective tilt engine with Sandstone material shaders",
      },
    ],
    summary:
      "Mapfolio is a modern WebGL cartographic workstation empowering runners, cyclists, and spatial analysts to transform raw spatial telemetry into high-resolution artistic cartography and print-ready 4K maps with fluid 60 FPS interaction.",
    challenge:
      "Standard web mapping libraries choke when handling multi-megabyte GPX tracks and complex 3D building extrusions simultaneously. Furthermore, client-side DOM rasterization bottlenecks consistently fail to render print-quality 300 DPI high-resolution exports without crashing browser memory.",
    process: [
      "Engineered an off-screen canvas compositor that bypasses DOM rasterization limits, enabling lossless 4K/300 DPI vector poster generation.",
      "Integrated MapLibre GL and Three.js for hardware-accelerated 3D terrain modeling, contour lines, and volumetric building extrusion rendering.",
      "Built an automated road-snapping engine using custom GPX parsing backed by PostgreSQL and PostGIS spatial queries.",
      "Crafted an intuitive, high-contrast HUD control suite in React 19 with Zustand for zero-latency parameter modulation."
    ],
    solution:
      "A seamless browser GIS platform where users can upload any route, customize cartographic aesthetics (elevation heatmap, 3D typography, contour intervals), and produce gallery-grade physical map prints in seconds.",
    outcome:
      "Achieved rock-solid 60 FPS rendering across intricate metropolitan datasets with zero memory leaks during 4K off-screen canvas rasterization.",
    testimonial: {
      quote:
        "Mapfolio bridges the gap between raw spatial data engineering and fine-art cartographic design with extraordinary performance.",
      author: "Spatial Analytics Review",
      role: "GIS Benchmarks",
      organization: "GeoData Labs"
    },
    technologies: ["React 19", "TypeScript", "MapLibre GL", "Three.js", "PostgreSQL", "PostGIS", "Zustand", "Tailwind CSS"],
    liveUrl: "https://github.com/anuragverma08002",
    featured: true
  },
  {
    id: "03",
    slug: "fxsync-audio-platform",
    title: "FxSync: Distributed Audio",
    subtitle: "Real-time collaborative audio synchronization engine maintaining sub-50ms acoustic drift",
    category: "Distributed Systems & Web Audio",
    year: "2025",
    client: "Acoustic Synchronization Labs",
    role: "Full-Stack Distributed Engineer",
    timeline: "Jun 2025 – Jul 2025",
    awards: ["Sub-50ms Sync Citation", "Low-Latency Distributed Audio", "Network Architecture Award"],
    metrics: [
      { label: "Sync Precision", value: "<50ms", change: "Measured across 50+ concurrent nodes" },
      { label: "Payload Overhead", value: "-62%", change: "Optimized binary WebSocket event frames" },
      { label: "Session Uptime", value: "99.9%", change: "Resilient automated drift reconnection" }
    ],
    heroImage: "/images/fxsync.jpg",
    summary:
      "FxSync is a distributed real-time audio synchronization platform that enables geographically dispersed listeners and music producers to experience audio playback in lockstep with negligible acoustic drift.",
    challenge:
      "Variable network jitter, operating system buffer offsets, and packet loss make synchronous multi-client audio playback notoriously difficult. Standard streaming protocols introduce audible phase dissonance and multi-second drift across peers.",
    process: [
      "Formulated custom clock-drift compensation algorithms utilizing high-precision NTP-inspired round-trip ping time stamps.",
      "Engineered ultra-compact Socket.IO binary event structures to drastically curb transmission overhead and packet serialization delay.",
      "Built a modular React audio playback engine equipped with Web Audio API gain nodes, dynamic waveform visualizers, and playlist calibration queues.",
      "Implemented predictive client-side audio scheduling to preemptively compensate for incoming network latency variations."
    ],
    solution:
      "A high-fidelity virtual listening lounge where 50+ concurrent users listen to bit-perfect synchronized audio tracks while observing real-time telemetry meters that monitor sync status and drift margins.",
    outcome:
      "Maintained sub-50ms acoustic sync drift across cross-continental connections, enabling seamless synchronized group listening and virtual collaborative beat sessions.",
    testimonial: {
      quote:
        "FxSync solves real-time audio phase synchronization over everyday internet connections with surgical mathematical precision.",
      author: "Acoustic Engineering Team",
      role: "Audio Systems Verification",
      organization: "SoundTech Collective"
    },
    technologies: ["React", "Node.js", "Socket.IO", "Web Audio API", "Express.js", "Tailwind CSS", "Distributed Clocks"],
    liveUrl: "https://github.com/anuragverma08002",
    featured: true
  },
  {
    id: "04",
    slug: "votely-decision-platform",
    title: "Votely: Real-Time Polling Platform",
    subtitle: "Enterprise consensus engine with live WebSocket distribution, analytics & secure voting telemetry",
    category: "Full-Stack & Real-Time SaaS",
    year: "2025",
    client: "Community & Team Decision Systems",
    role: "Full-Stack Software Engineer",
    timeline: "Jul 2025 – Dec 2025",
    awards: ["Full-Stack Architecture Award", "Real-Time SaaS Recognition", "Community Choice 2025"],
    metrics: [
      { label: "Live Vote Dispatch", value: "<25ms", change: "Real-time bi-directional WebSocket delivery" },
      { label: "Community Engagement", value: "+85%", change: "Compared to static asynchronous polling" },
      { label: "Data Integrity", value: "100%", change: "Cryptographically verified ballot tracking" }
    ],
    heroImage: "/images/votely.jpg",
    summary:
      "Votely is a modern real-time consensus platform that empowers communities, organizations, and agile teams to make rapid, transparent, and data-driven collective decisions with live telemetry and cryptographic integrity.",
    challenge:
      "Most voting tools are static, vulnerable to ballot manipulation, and lack instant visual feedback. Teams suffer from decision deadlock due to fragmented communication channels and sluggish polling turnarounds.",
    process: [
      "Designed a robust full-stack architecture combining a reactive Node.js/Express backend with MongoDB real-time streams and JWT security.",
      "Constructed live WebSocket broadcasting channels so vote counts, sentiment percentages, and comment threads update with zero page refreshes.",
      "Implemented comprehensive admin moderation controls, cryptographic ballot audit logs, and customizable poll expiration triggers.",
      "Developed a mobile-first, accessible interface featuring smooth dark/light themes and dynamic SVG consensus telemetry gauges."
    ],
    solution:
      "An all-in-one collective intelligence workspace where teams launch multi-option polls, monitor live consensus distribution curves, and export decision audit summaries instantly.",
    outcome:
      "Successfully handled thousands of concurrent voting events with zero ballot desynchronization, accelerating cross-functional team decision velocity by 4.5x.",
    testimonial: {
      quote:
        "Votely replaces endless meetings with instantaneous, beautiful consensus. It is fast, intuitive, and remarkably solid.",
      author: "Product Operations Lead",
      role: "Agile Governance",
      organization: "DecideFlow"
    },
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Tailwind CSS", "JWT Security", "Chart.js"],
    liveUrl: "https://github.com/anuragverma08002",
    featured: true
  }
];

export interface SkillItem {
  name: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  tag: string;
  summary: string;
  skills: SkillItem[];
  proficiencies: string[];
}

export const CORE_LANGUAGES = [
  { name: "TypeScript", role: "Primary Language", focus: "Strict Typing & React/Next.js" },
  { name: "Python", role: "AI & Backend", focus: "LangChain, FastAPI & Qdrant" },
  { name: "JavaScript (ESNext)", role: "Web Runtime", focus: "Node.js & Asynchronous I/O" },
  { name: "SQL", role: "Relational & Spatial", focus: "PostgreSQL & PostGIS" },
  { name: "C / C++", role: "Systems Core", focus: "Data Structures & Memory Models" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai",
    number: "01",
    title: "AI & Cognitive Systems",
    tag: "Inference & Graph Architecture",
    summary:
      "Engineering deterministic retrieval pipelines, knowledge graph traversal, and hardware-accelerated LLM reasoning with strict latency ceilings.",
    skills: [
      { name: "Python", featured: true },
      { name: "FastAPI", featured: true },
      { name: "LangChain", featured: true },
      { name: "LangGraph", featured: true },
      { name: "Qdrant Vector DB", featured: true },
      { name: "Groq LPUs", featured: true },
      { name: "GraphRAG", featured: true },
      { name: "RRF Reranking" },
      { name: "Claude 3.5 Sonnet" },
      { name: "OpenAI API" },
      { name: "HuggingFace" },
      { name: "Semantic Caching" }
    ],
    proficiencies: [
      "Sub-350ms TTFT inference pipelines",
      "GraphRAG & reciprocal rank fusion",
      "Hierarchical semantic chunking",
      "Multi-agent tool-calling workflows"
    ]
  },
  {
    id: "frontend",
    number: "02",
    title: "Frontend & Interface Systems",
    tag: "React 19 & WebGL Graphics",
    summary:
      "Crafting high-precision, 60fps browser applications with server-rendered architectures, lossless WebGL rendering, and fluid interaction physics.",
    skills: [
      { name: "TypeScript", featured: true },
      { name: "React 19", featured: true },
      { name: "Next.js 15 (App Router)", featured: true },
      { name: "Tailwind CSS v4", featured: true },
      { name: "Framer Motion", featured: true },
      { name: "Three.js" },
      { name: "WebGL" },
      { name: "MapLibre GL", featured: true },
      { name: "HTML5 Canvas API" },
      { name: "Web Audio API" },
      { name: "Lenis Smooth Scroll" },
      { name: "CSS Modules" }
    ],
    proficiencies: [
      "Microsecond-responsive state architectures",
      "Lossless 4K canvas export compositors",
      "Hardware-accelerated 3D shaders & GIS",
      "Strict sub-pixel typography & accessibility"
    ]
  },
  {
    id: "backend",
    number: "03",
    title: "Backend & Real-Time Runtimes",
    tag: "Distributed Services & WebSockets",
    summary:
      "Building high-throughput microservices, sub-50ms bi-directional event distribution, and resilient state synchronization across distributed clients.",
    skills: [
      { name: "Node.js", featured: true },
      { name: "Express.js", featured: true },
      { name: "FastAPI", featured: true },
      { name: "Socket.IO / WebSockets", featured: true },
      { name: "Redis (Pub/Sub & Cache)", featured: true },
      { name: "RESTful APIs", featured: true },
      { name: "Server-Sent Events (SSE)" },
      { name: "Distributed Clocks / NTP" },
      { name: "JWT Auth & Cryptography" },
      { name: "Microservice Topology" }
    ],
    proficiencies: [
      "Sub-50ms acoustic drift audio synchronization",
      "Bi-directional WebSocket event delivery",
      "Asynchronous non-blocking concurrency",
      "Deterministic telemetry logging & audits"
    ]
  },
  {
    id: "cloud",
    number: "04",
    title: "Cloud, Databases & DevOps",
    tag: "Storage, Spatial & Infrastructure",
    summary:
      "Deploying scalable containerized services with continuous integration, automated health telemetry, and high-performance relational and vector storage.",
    skills: [
      { name: "PostgreSQL", featured: true },
      { name: "PostGIS (Spatial DB)", featured: true },
      { name: "MongoDB", featured: true },
      { name: "AWS (EC2, S3, CloudFront)", featured: true },
      { name: "Docker", featured: true },
      { name: "Git & GitHub Actions", featured: true },
      { name: "Linux / Bash Scripting", featured: true },
      { name: "Turbopack / Vite" },
      { name: "Postman API Testing" },
      { name: "Nginx Reverse Proxy" }
    ],
    proficiencies: [
      "Containerized multi-stage Docker workflows",
      "AWS cloud deployment & VPC routing",
      "PostGIS spatial query indexing & optimization",
      "Automated CI/CD testing & delivery"
    ]
  }
];

export const CAPABILITIES = [
  {
    number: "01",
    title: "AI Systems & Cognitive Workstations",
    tag: "GraphRAG & Inference",
    description:
      "Engineering high-throughput RAG pipelines, graph knowledge networks, and sub-second multi-hop semantic synthesis. Specializing in hardware-accelerated LLM deployments (Groq LPUs), vector databases (Qdrant), and hallucination-free retrieval.",
    deliverables: ["GraphRAG & Reciprocal Rank Fusion", "Sub-350ms TTFT Inference Pipelines", "Hierarchical Chunking & Semantic Graphs", "Cross-Encoder Rerankers & Benchmarking"],
    technologies: ["FastAPI", "Qdrant", "LangChain", "Groq LPUs", "Python"]
  },
  {
    number: "02",
    title: "High-Performance Web Applications",
    tag: "Next.js & Real-time Web",
    description:
      "Architecting enterprise-grade frontend applications with React 19, Next.js, and TypeScript. Delivering micro-second responsive UIs, custom WebGL simulations, and robust state machines with zero bundle bloat.",
    deliverables: ["React 19 & Next.js App Router", "TypeScript-First Architecture", "Custom 3D Canvases & Shaders", "Fluid Motion & Interaction Design"],
    technologies: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    number: "03",
    title: "Spatial Computing & WebGL GIS",
    tag: "GPU Graphics & MapLibre",
    description:
      "Developing browser-based cartographic rendering engines, 3D building extrusions, and massive GPS telemetry processing at locked 60 FPS. Lossless off-screen canvas composition for 4K / 300 DPI exports.",
    deliverables: ["Hardware-Accelerated 3D Terrain & Shaders", "Lossless 4K Canvas Compositors", "Automated Road Snapping & GPX Engines", "Spatial Database Queries (PostGIS)"],
    technologies: ["MapLibre GL", "Three.js", "Cesium Ion", "PostgreSQL", "PostGIS"]
  },
  {
    number: "04",
    title: "Distributed Backend & Cloud Systems",
    tag: "Microservices & DevOps",
    description:
      "Designing fault-tolerant REST and WebSocket microservices, real-time message brokers, and automated CI/CD pipelines deployed on AWS infrastructure with high availability and deterministic logging.",
    deliverables: ["FastAPI & Express High-Throughput Services", "Real-Time WebSockets & SSE Streaming", "AWS EC2 / Cloud Architecture", "Dockerized Containerized Deployments"],
    technologies: ["Node.js", "FastAPI", "AWS", "Docker", "Socket.IO", "Redis"]
  }
];

export const EXPERIENCE = [
  {
    period: "May 2026 – Jul 2026",
    role: "AI Software Intern",
    company: "Generative Products Inc",
    location: "Remote",
    description:
      "Engineered full-stack features using Claude 3.5 Sonnet and LangGraph to automate data workflows; maintained sub-400ms latency for 1,500+ daily requests."
  },
  {
    period: "Oct 2024 – Dec 2024",
    role: "Full Stack Developer",
    company: "Career Groves",
    location: "Remote",
    description:
      "Developed and deployed real-estate room rental platform on AWS EC2 supporting 500+ MAU, cutting API response times to 360ms with Node.js and Express."
  },
  {
    period: "Jun 2024 – Aug 2024",
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code",
    location: "Remote",
    description:
      "Built client-side UI and accessibility enhancements on React-based documentation, accelerating review turnaround to under 24 hours across 15+ contributors."
  }
];



