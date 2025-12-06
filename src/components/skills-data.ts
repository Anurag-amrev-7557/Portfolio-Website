import {
  Terminal,
  Brain,
  Layers,
  Server,
  Database,
} from "lucide-react";

export interface SkillCategoryData {
  id: string;
  title: string;
  caption: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  stoneRotation?: number;
  renderSrc?: string;
  tools: string[];
}

export const skillCategories: SkillCategoryData[] = [
  {
    id: "core",
    title: "Core Systems & Languages",
    caption: "Strict typing, low-level memory models & spatial queries.",
    icon: Terminal,
    stoneRotation: 0,
    tools: ["Python", "TypeScript", "JavaScript (ESNext)", "SQL", "C / C++"],
  },
  {
    id: "ai",
    title: "AI & Cognitive Systems",
    caption: "Deterministic retrieval pipelines, GraphRAG & sub-350ms inference.",
    icon: Brain,
    stoneRotation: 75,
    tools: [
      "GraphRAG",
      "LangGraph",
      "FastAPI",
      "Qdrant Vector DB",
      "Groq LPUs",
      "Claude 3.5 Sonnet",
      "Semantic Caching",
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Spatial Interfaces",
    caption: "60fps canvas compositors, WebGL 3D graphics & fluid interaction.",
    icon: Layers,
    stoneRotation: 155,
    tools: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "WebGL / Three.js",
      "MapLibre GL",
    ],
  },
  {
    id: "backend",
    title: "Backend & Real-Time Runtimes",
    caption: "Distributed state synchronization, WebSockets & event distribution.",
    icon: Server,
    stoneRotation: 230,
    tools: [
      "Node.js",
      "FastAPI",
      "Express.js",
      "Socket.IO",
      "Redis Pub/Sub",
      "Distributed Clocks",
      "REST APIs",
    ],
  },
  {
    id: "cloud",
    title: "Cloud, Databases & DevOps",
    caption: "Multi-stage container pipelines, spatial databases & VPC topologies.",
    icon: Database,
    stoneRotation: 310,
    tools: [
      "PostgreSQL",
      "PostGIS",
      "MongoDB",
      "AWS (EC2 / S3)",
      "Docker",
      "GitHub Actions",
      "Nginx",
    ],
  },
];

export const skillsFootnote =
  "Every stack verified in production environments with sub-350ms inference ceilings and continuous delivery.";
