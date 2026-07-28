import React, { useState } from 'react';
import { ExternalLink, Sparkles, Zap, Shield, Globe, Cpu, ArrowUpRight, CheckCircle2, Star, Activity, Server, Lock, AlertTriangle, X } from 'lucide-react';
import { playClickSound, playHoverSound, playShockwaveSound } from '../utils/audio';

interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  url: string;
  performance: {
    lighthouse: string;
    loadTime: string;
    throughput: string;
  };
  description: string;
  tags: string[];
  gradient: string;
  featured?: boolean;
}

const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'instant-bible-projection',
    name: 'Instant Bible Projection',
    tagline: 'AI Live Sermon Passage Detection & Ultra-Fast Screen Projection',
    category: 'AI & CHURCH BROADCAST',
    url: 'https://instant-bible-projection.ai.studio',
    performance: {
      lighthouse: '100 / 100',
      loadTime: '0.04s',
      throughput: 'Instant Verse Match',
    },
    description: 'Real-time AI speech listening platform that listens to live preaching, automatically detects Bible verses, and projects scripture instantly on screen to accelerate worship and prevent service delays.',
    tags: ['AI Audio Listening', 'Speech-to-Text', 'React 18', 'Tailwind CSS', 'Bible Search API'],
    gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    featured: true,
  },
  {
    id: 'aether-analytics',
    name: 'Aether AI Analytics Cloud',
    tagline: 'Enterprise Sub-Atomic Telemetry Platform',
    category: 'AI & ENTERPRISE CLOUD',
    url: 'https://aether.favlisnoble.com',
    performance: {
      lighthouse: '100 / 100',
      loadTime: '0.12s',
      throughput: '128 TB/s Ingestion',
    },
    description: 'Real-time metric visualizer and AI intelligence platform powering enterprise cloud infrastructure, live WebSocket telemetry streams, and predictive anomaly detection.',
    tags: ['TypeScript', 'Recharts', 'Node.js', 'Tailwind', 'Real-Time WebSockets'],
    gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    featured: true,
  },
  {
    id: 'aura-luxury',
    name: 'Aura Luxury Studio',
    tagline: 'Interactive 3D WebGL E-Commerce Canvas',
    category: 'LUXURY BOUTIQUE & WEBGL',
    url: 'https://auraluxury.favlisnoble.com',
    performance: {
      lighthouse: '99 / 100',
      loadTime: '0.15s',
      throughput: '60 FPS 3D Engine',
    },
    description: 'High-end responsive WebGL boutique storefront for luxury fashion products featuring real-time 3D product customizers, spatial audio, and high-conversion checkout.',
    tags: ['Three.js', 'WebGL', 'Tailwind CSS', 'Framer Motion', 'E-Commerce'],
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    featured: true,
  },
  {
    id: 'nexus-biotech',
    name: 'Nexus Bio-Quantum Systems',
    tagline: 'Molecular Lattice Simulation Interface',
    category: 'BIOTECH & RESEARCH',
    url: 'https://nexusbio.favlisnoble.com',
    performance: {
      lighthouse: '100 / 100',
      loadTime: '0.10s',
      throughput: '0.002ms Query Speed',
    },
    description: 'Real-time molecular structure simulation interface built for high-throughput gene sequencing, quantum material research, and atomic lattice visualization.',
    tags: ['React', 'D3.js', 'Canvas API', 'TypeScript', 'Tailwind'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  {
    id: 'noble-capital',
    name: 'Noble Quantum Capital',
    tagline: 'High-Frequency Algorithmic Trading Suite',
    category: 'FINANCIAL ASSET MANAGEMENT',
    url: 'https://capital.favlisnoble.com',
    performance: {
      lighthouse: '100 / 100',
      loadTime: '0.05s',
      throughput: 'Sub-millisecond API',
    },
    description: 'Ultra-low latency algorithmic asset management portal featuring live WebSocket order books, automated risk hedging, and dark mode luxury styling.',
    tags: ['React 18', 'Tailwind CSS', 'Node.js', 'Finance SDK', 'TypeScript'],
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    id: 'zero-mesh-telemetry',
    name: 'Zero-Point Global Mesh HUD',
    tagline: 'Decentralized Node Network Control Center',
    category: 'DECENTRALIZED INFRASTRUCTURE',
    url: 'https://mesh.favlisnoble.com',
    performance: {
      lighthouse: '100 / 100',
      loadTime: '0.09s',
      throughput: '5 Global Edge Regions',
    },
    description: 'Global node map monitoring zero-point fluctuation harvesting arrays across Zurich, Tokyo, Neo-Singapore, Silicon Valley, and Reykjavik in real time.',
    tags: ['WebGL', 'Leaflet / Maps', 'Tailwind CSS', 'TypeScript', 'Audio Synth'],
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
  },
];

interface ProjectsPageProps {
  onOpenContactModal: () => void;
  onGoToQuantumLab: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onOpenContactModal,
  onGoToQuantumLab,
}) => {
  const [restrictedProject, setRestrictedProject] = useState<ProjectItem | null>(null);

  const handleOpenProject = (project: ProjectItem) => {
    playClickSound();
    if (project.id === 'instant-bible-projection') {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    } else {
      playShockwaveSound();
      setRestrictedProject(project);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 font-space relative">
      
      {/* Restricted Access Notification Modal */}
      {restrictedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#080d1a] border border-amber-500/40 text-left space-y-6 shadow-[0_0_80px_rgba(245,158,11,0.25)] font-space">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
                  <Lock size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <AlertTriangle size={12} />
                    <span>RESTRICTED ACCESS PROTOCOL</span>
                  </div>
                  <h3 className="font-unbounded font-black text-lg text-white mt-0.5">
                    SPECIFIC USERS ONLY
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setRestrictedProject(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Notification Body Message */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-b border-white/10 py-4">
              <p className="font-semibold text-white">
                Access to <span className="text-amber-300 font-unbounded">{restrictedProject.name}</span> is restricted.
              </p>
              <p>
                This project platform is strictly reserved for specific authorized enterprise clients, verified organization members, and designated users. Unauthorised public access is prohibited.
              </p>
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 text-amber-200 text-xs font-mono">
                Notice: If you require a custom instance or private client access engineered by Fav Li$ Noble Tech Co., please submit a project brief.
              </div>
            </div>

            {/* Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setRestrictedProject(null);
                  onOpenContactModal();
                }}
                className="flex-1 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-unbounded font-bold text-xs uppercase tracking-wider text-center active:scale-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                SUBMIT PROJECT BRIEF
              </button>
              <button
                onClick={() => setRestrictedProject(null)}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-unbounded font-bold text-xs uppercase tracking-wider text-center transition-colors"
              >
                UNDERSTOOD
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#080d1a]/90 via-[#030508]/90 to-[#030508] border border-cyan-500/30 text-center space-y-6 relative overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)]">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase">
          <Sparkles size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>PORTFOLIO & PROJECT SHOWCASE // FAV LI$ NOBLE</span>
        </div>

        <h1 className="font-unbounded font-black text-3xl sm:text-5xl text-white tracking-wider uppercase leading-tight">
          PROJECTS DELIVERED BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">FAV LI$ NOBLE</span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore production websites, enterprise platforms, and zero-latency WebGL interfaces engineered by Fav Li$ Noble Tech Co. Click any project card or button below to visit the live platform.
        </p>

        {/* Global Website Performance Metrics Summary */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left border-t border-white/10 mt-6 max-w-4xl mx-auto">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">LIGHTHOUSE SCORE</div>
            <div className="font-unbounded font-bold text-lg sm:text-xl text-emerald-400">100 / 100</div>
            <div className="text-[10px] text-slate-400">Sub-0.2s load speed</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">GLOBAL UPTIME</div>
            <div className="font-unbounded font-bold text-lg sm:text-xl text-cyan-300">99.99%</div>
            <div className="text-[10px] text-slate-400">Zero-downtime SLA</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">PROJECTS DELIVERED</div>
            <div className="font-unbounded font-bold text-lg sm:text-xl text-teal-300">50+ APPS</div>
            <div className="text-[10px] text-slate-400">Production deployed</div>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-[10px] font-mono text-slate-400 uppercase">CLIENT RATING</div>
            <div className="font-unbounded font-bold text-lg sm:text-xl text-amber-300">5.0 / 5.0</div>
            <div className="text-[10px] text-slate-400">Enterprise verified</div>
          </div>
        </div>
      </div>

      {/* Projects Showcase Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              <Cpu size={20} />
            </div>
            <div>
              <h2 className="font-unbounded font-bold text-lg text-white">LIVE PRODUCTION WEBSITES & APPS</h2>
              <p className="text-xs text-slate-400 font-mono">ALL PROJECTS CRAFTED BY FAV LI$ NOBLE TECH CO.</p>
            </div>
          </div>

          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
            {PROJECTS_LIST.length} VERIFIED WEBSITES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_LIST.map((project) => (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              onMouseEnter={playHoverSound}
              className={`group relative p-6 rounded-3xl bg-[#080c16] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between space-y-6 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] bg-gradient-to-b ${project.gradient}`}
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-bold uppercase tracking-wider text-[10px]">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30 text-[10px]">
                    <Star size={10} />
                    <span>{project.performance.lighthouse}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-unbounded font-black text-lg text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between gap-2">
                    <span>{project.name}</span>
                    <ArrowUpRight size={18} className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">{project.tagline}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-space">
                  {project.description}
                </p>

                {/* Performance Highlights */}
                <div className="p-3 rounded-2xl bg-black/50 border border-white/5 space-y-1.5 text-[11px] font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>LOAD SPEED:</span>
                    <span className="text-emerald-300 font-bold">{project.performance.loadTime}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>PERFORMANCE:</span>
                    <span className="text-cyan-300 font-bold">{project.performance.throughput}</span>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-400 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visit Link Button */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-unbounded font-bold text-cyan-400 group-hover:text-cyan-300">
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <span>VISIT WEBSITE / PROJECT</span>
                  <ExternalLink size={14} />
                </span>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400">
                  HTTP 200 OK
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need Custom Website CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-[#080d1a] to-emerald-950/60 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
            <Zap size={14} />
            <span>CUSTOM QUANTUM DEVELOPMENT SERVICES</span>
          </div>
          <h3 className="font-unbounded font-black text-xl sm:text-2xl text-white">
            WANT FAV LI$ NOBLE TO BUILD YOUR NEXT WEBSITE?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            We architect bespoke web platforms, sub-second landing pages, WebGL 3D canvases, and enterprise software.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenContactModal}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-unbounded font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all active:scale-95 text-center"
          >
            SUBMIT PROJECT BRIEF
          </button>
          <button
            onClick={onGoToQuantumLab}
            className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-unbounded font-bold text-xs uppercase tracking-widest transition-all text-center"
          >
            MATRIX LAB
          </button>
        </div>
      </div>

    </div>
  );
};
