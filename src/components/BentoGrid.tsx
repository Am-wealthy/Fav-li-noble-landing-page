import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Volume2,
  VolumeX,
  Play,
  Globe,
  Compass,
  ArrowUpRight,
  Sliders,
  CheckCircle2,
  Radio,
  Fingerprint,
  ChevronRight,
  Activity,
  ShieldCheck,
  Disc
} from 'lucide-react';
import { ParticleTopology, ParticleTheme } from './ParticleBackground';
import {
  playClickSound,
  playHoverSound,
  playShockwaveSound,
  getAudioData
} from '../utils/audio';

interface BentoGridProps {
  topology: ParticleTopology;
  setTopology: (t: ParticleTopology) => void;
  theme: ParticleTheme;
  setTheme: (t: ParticleTheme) => void;
  density: number;
  setDensity: (d: number) => void;
  speed: number;
  setSpeed: (s: number) => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onTriggerShockwave: () => void;
  onOpenTerminal: () => void;
  onOpenSpecsModal: () => void;
  onOpenContactModal: () => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  topology,
  setTopology,
  theme,
  setTheme,
  density,
  setDensity,
  speed,
  setSpeed,
  audioEnabled,
  onToggleAudio,
  onTriggerShockwave,
  onOpenTerminal,
  onOpenSpecsModal,
  onOpenContactModal,
}) => {
  // Local state for interactive bento components
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const [activeNode, setActiveNode] = useState('Zurich');
  const [terminalQuickOutput, setTerminalQuickOutput] = useState('SYSTEM READY // STANDBY FOR DIRECTIVE');
  const audioCanvasRef = useRef<HTMLCanvasElement>(null);

  // Audio frequency visualizer animation loop
  useEffect(() => {
    let animId: number;
    const canvas = audioCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderAudioBars = () => {
      animId = requestAnimationFrame(renderAudioBars);
      const data = getAudioData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 4;
      const barGap = 3;
      const totalBars = Math.floor(canvas.width / (barWidth + barGap));

      for (let i = 0; i < totalBars; i++) {
        const val = audioEnabled && data.length > 0 ? data[i % data.length] : Math.sin(Date.now() * 0.005 + i * 0.2) * 15 + 18;
        const barHeight = Math.max(3, (val / 255) * canvas.height);
        const x = i * (barWidth + barGap);
        const y = canvas.height - barHeight;

        ctx.fillStyle = audioEnabled ? '#06b6d4' : '#334155';
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    renderAudioBars();
    return () => cancelAnimationFrame(animId);
  }, [audioEnabled]);

  const nodesList = [
    { name: 'Zurich', region: 'EU-CENTRAL', ping: '1.2ms', status: 'ENTANGLED' },
    { name: 'Tokyo', region: 'AP-EAST', ping: '4.8ms', status: 'ENTANGLED' },
    { name: 'Neo-Singapore', region: 'AP-SOUTH', ping: '3.1ms', status: 'ENTANGLED' },
    { name: 'Silicon Valley', region: 'US-WEST', ping: '2.4ms', status: 'ENTANGLED' },
    { name: 'Reykjavik', region: 'EU-NORTH', ping: '0.9ms', status: 'ENTANGLED' },
  ];

  const specsList = [
    { title: 'FLN-01 ZERO-POINT HARVESTER', yieldVal: '99.84%', desc: 'Vacuum zero-point fluctuation harvesting array' },
    { title: 'FLN-02 SYNAPTIC LINK MK-IV', yieldVal: '128.4 TB/s', desc: 'Direct neural silicon bandwidth transceivers' },
    { title: 'FLN-03 MOLECULAR CRYSTAL STORAGE', yieldVal: '1.2 EB/mm³', desc: 'Atomic electron spin lattice memory matrices' },
  ];

  return (
    <section className="relative z-10 w-full px-4 md:px-8 py-8 max-w-7xl mx-auto">
      
      {/* Asymmetrical Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-[minmax(220px,auto)]">
        
        {/* =========================================================================
            CARD 1: HERO TITAN CARD (Spans md:col-span-12 lg:col-span-7, 2-row height)
           ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-10 md:col-span-12 lg:col-span-7 flex flex-col justify-between relative overflow-hidden group">
          
          {/* Subtle glowing radial background accent */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />

          {/* Top Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-space font-medium tracking-wide">
              <Sparkles size={13} className="animate-spin text-cyan-300" style={{ animationDuration: '8s' }} />
              <span>AWWWARDS DESIGN SELECTION // 2026</span>
            </div>
            <div className="font-mono text-xs text-slate-400 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              HASH: #0X984-FLN-NOBLE
            </div>
          </div>

          {/* Heavy Experimental Typography Banner */}
          <div className="my-6 sm:my-8 z-10 space-y-3">
            <div className="text-[10px] sm:text-xs font-space font-bold tracking-[0.25em] text-cyan-400 uppercase">
              NEXT-GEN QUANTUM INFRASTRUCTURE
            </div>

            <h1 className="font-unbounded font-black text-3xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tighter text-white leading-[0.95] uppercase drop-shadow-2xl break-words">
              FAV LI$<br />
              <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent glow-text-cyan">
                NOBLE TECH
              </span>
            </h1>

            <p className="font-space text-xs sm:text-sm md:text-base text-slate-300 max-w-xl leading-relaxed pt-2">
              WE DO NOT PREDICT THE FUTURE. WE MANUFACTURE ITS PHYSICAL SUBSTRATE. FEATURING REAL-TIME 3D QUANTUM PARTICLE DYNAMICS AND ASYMMETRICAL GLASS ARCHITECTURE.
            </p>
          </div>

          {/* Action CTAs & Key Stats */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/10 z-10">
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => {
                  playClickSound();
                  onTriggerShockwave();
                }}
                onMouseEnter={playHoverSound}
                className="flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-unbounded font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all duration-300 active:scale-95"
              >
                <Zap size={16} className="animate-bounce" />
                <span>INITIALIZE SHOCKWAVE</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenSpecsModal();
                }}
                onMouseEnter={playHoverSound}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 font-space font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95"
              >
                <Compass size={15} className="text-cyan-400" />
                <span>SPECIFICATION DECK</span>
              </button>

              <button
                onClick={() => {
                  playClickSound();
                  onOpenContactModal();
                }}
                onMouseEnter={playHoverSound}
                className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-space font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 active:scale-95"
              >
                <Sparkles size={15} className="text-emerald-400 animate-pulse" />
                <span>PROJECT BRIEF</span>
              </button>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 font-space text-xs justify-between sm:justify-start pt-2 sm:pt-0">
              <div>
                <div className="text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-widest">SUB-ATOMIC YIELD</div>
                <div className="font-unbounded font-black text-cyan-300 text-base sm:text-lg">99.84%</div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div>
                <div className="text-slate-400 text-[9px] sm:text-[10px] uppercase tracking-widest">BANDWIDTH</div>
                <div className="font-unbounded font-black text-purple-300 text-base sm:text-lg">128 TB/S</div>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            CARD 2: THREE.JS PARTICLE ENGINE CONTROLLER (Spans md:col-span-12 lg:col-span-5)
           ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-8 md:col-span-12 lg:col-span-5 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-cyan-300">
                <Sliders size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-sm text-white">
                  3D PARTICLE ENGINE
                </h3>
                <p className="text-[10px] font-space text-cyan-400 tracking-wider">
                  REAL-TIME WEBGL PARAMETRICS
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
              3D THREE.JS
            </span>
          </div>

          {/* Topology Switcher Buttons */}
          <div className="space-y-2">
            <label className="text-[11px] font-space font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={13} className="text-cyan-400" />
              PARTICLE TOPOLOGY MATRIX:
            </label>
            <div className="grid grid-cols-2 gap-2 font-space text-xs">
              {[
                { id: 'torus', label: 'PARAMETRIC TORUS' },
                { id: 'wave', label: 'NEURAL WAVE SHEET' },
                { id: 'galaxy', label: 'GALAXY SPIRAL' },
                { id: 'hypercube', label: 'HYPERCUBE LATTICE' },
              ].map((top) => {
                const isActive = topology === top.id;
                return (
                  <button
                    key={top.id}
                    onClick={() => {
                      playClickSound();
                      setTopology(top.id as ParticleTopology);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`p-2.5 rounded-xl border font-bold text-[11px] tracking-wide transition-all duration-300 text-left flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{top.label}</span>
                    {isActive && <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Matrix Theme Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-space font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} className="text-purple-400" />
              CHROMATIC PALETTE THEME:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'cyber', name: 'CYBER', bg: 'from-cyan-400 to-purple-600' },
                { id: 'gold', name: 'NOBLE', bg: 'from-amber-400 to-rose-600' },
                { id: 'emerald', name: 'EMERALD', bg: 'from-emerald-400 to-cyan-500' },
                { id: 'space', name: 'SPACE', bg: 'from-indigo-400 to-fuchsia-500' },
              ].map((th) => {
                const isActive = theme === th.id;
                return (
                  <button
                    key={th.id}
                    onClick={() => {
                      playClickSound();
                      setTheme(th.id as ParticleTheme);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`p-2 rounded-xl border transition-all duration-300 text-center flex flex-col items-center gap-1.5 ${
                      isActive
                        ? 'bg-white/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${th.bg}`} />
                    <span className="text-[10px] font-space font-bold tracking-wider">{th.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders: Density & Speed */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <div>
              <div className="flex justify-between text-[11px] font-space text-slate-300 mb-1">
                <span>PARTICLE DENSITY:</span>
                <span className="font-mono text-cyan-300 font-bold">{density} PARTICLES</span>
              </div>
              <input
                type="range"
                min="2000"
                max="7000"
                step="500"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-space text-slate-300 mb-1">
                <span>ROTATION SPEED:</span>
                <span className="font-mono text-cyan-300 font-bold">{speed.toFixed(1)}X</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* =========================================================================
            CARD 3: SUB-ATOMIC SPEC MATRIX (Spans md:col-span-6 lg:col-span-5)
           ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-8 md:col-span-6 lg:col-span-5 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-500/20 border border-purple-400/40 rounded-xl text-purple-300">
                <Cpu size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-sm text-white">
                  SPEC MATRIX TERMINAL
                </h3>
                <p className="text-[10px] font-space text-purple-400 tracking-wider">
                  SUB-ATOMIC HARVESTING SPECS
                </p>
              </div>
            </div>
            <button
              onClick={onOpenSpecsModal}
              className="text-xs font-space text-cyan-400 hover:text-cyan-200 flex items-center gap-1 hover:underline"
            >
              <span>DECK</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          {/* Interactive Spec Switcher List */}
          <div className="space-y-2">
            {specsList.map((item, idx) => {
              const isSelected = activeSpecIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    playClickSound();
                    setActiveSpecIndex(idx);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.25)] text-white'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-unbounded font-bold text-xs">{item.title}</div>
                    <div className="font-space text-[11px] text-slate-400">{item.desc}</div>
                  </div>
                  <div className="font-mono font-bold text-xs text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30 shrink-0">
                    {item.yieldVal}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live SVG Telemetry Chart */}
          <div className="p-4 rounded-2xl bg-[#030508]/80 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-space text-slate-400">
              <span className="flex items-center gap-1 text-cyan-400">
                <Activity size={12} className="animate-pulse" /> TELEMETRY OSCILLATION
              </span>
              <span className="font-mono text-emerald-400">STABLE // 14.2 GHz</span>
            </div>
            <svg className="w-full h-12 overflow-visible" viewBox="0 0 200 40">
              <path
                d="M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20"
                fill="none"
                stroke="url(#cyanGrad)"
                strokeWidth="2.5"
                className="animate-pulse"
              >
                <animate
                  attributeName="d"
                  dur="4s"
                  repeatCount="indefinite"
                  values="
                    M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20;
                    M 0,20 Q 25,35 50,20 T 100,20 T 150,20 T 200,20;
                    M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20
                  "
                />
              </path>
              <defs>
                <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>

        {/* =========================================================================
            CARD 4: MANIFESTO & AUDIO SYNTHESIZER (Spans md:col-span-6 lg:col-span-7)
           ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-8 md:col-span-6 lg:col-span-7 flex flex-col justify-between space-y-6 relative overflow-hidden group">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-300">
                <Disc size={18} className={audioEnabled ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-sm text-white">
                  MANIFESTO & AUDIO SYNTH
                </h3>
                <p className="text-[10px] font-space text-amber-400 tracking-wider">
                  SUB-BASS FREQUENCY DRONE ENGINE
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onToggleAudio();
              }}
              onMouseEnter={playHoverSound}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-space font-bold transition-all ${
                audioEnabled
                  ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {audioEnabled ? <Volume2 size={14} className="animate-bounce" /> : <VolumeX size={14} />}
              <span>{audioEnabled ? 'SYNTH: ON' : 'SYNTH: MUTED'}</span>
            </button>
          </div>

          {/* Heavy Experimental Typography Quote */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="text-[10px] font-space text-cyan-400 tracking-[0.2em] uppercase font-bold">
              THE NOBLE TECH DIRECTIVE
            </div>
            <blockquote className="font-unbounded font-extrabold text-base sm:text-lg md:text-xl text-white leading-snug">
              "WE ELIMINATE SILICON BOUNDARIES TO MANIFEST UNCHAINED QUANTUM INTELLIGENCE."
            </blockquote>
          </div>

          {/* Audio Frequency Canvas Equalizer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-space text-slate-400">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Radio size={13} className={audioEnabled ? 'animate-pulse' : ''} />
                REAL-TIME HARMONIC EQUALIZER
              </span>
              <span className="font-mono text-slate-400">55 Hz SUB-BASS DRONE</span>
            </div>
            <div className="p-3 bg-[#030508] border border-white/10 rounded-2xl flex items-center justify-center">
              <canvas
                ref={audioCanvasRef}
                width={360}
                height={40}
                className="w-full h-10 block"
              />
            </div>
          </div>

          {/* SFX Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={playClickSound}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-space text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Play size={10} className="text-cyan-400" /> SFX: LASER CHIME
            </button>
            <button
              onClick={playShockwaveSound}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-space text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Play size={10} className="text-amber-400" /> SFX: SUB PULSE
            </button>
          </div>

        </div>

        {/* =========================================================================
            CARD 5: GLOBAL QUANTUM NODE MATRIX (Spans md:col-span-6 lg:col-span-4)
           ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-8 md:col-span-6 lg:col-span-4 flex flex-col justify-between space-y-5 relative overflow-hidden group">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300">
                <Globe size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-sm text-white">
                  GLOBAL QUANTUM NODES
                </h3>
                <p className="text-[10px] font-space text-emerald-400 tracking-wider">
                  ENTANGLED MESH MAP
                </p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Node List */}
          <div className="space-y-2">
            {nodesList.map((node) => {
              const isSelected = activeNode === node.name;
              return (
                <button
                  key={node.name}
                  onClick={() => {
                    playClickSound();
                    setActiveNode(node.name);
                  }}
                  onMouseEnter={playHoverSound}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all duration-300 ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                    <span className="font-unbounded font-bold text-xs">{node.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-slate-400 text-[10px]">{node.region}</span>
                    <span className="text-cyan-300 font-bold">{node.ping}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-center font-space text-xs text-emerald-300">
            SELECTED NODE: <strong className="font-unbounded text-white">{activeNode.toUpperCase()}</strong> // 100% HEALTH
          </div>

        </div>

        {/* =========================================================================
            CARD 6: LEADERSHIP & NOBLE TECH ARCHITECTS (Spans md:col-span-6 lg:col-span-4)
           ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-8 md:col-span-6 lg:col-span-4 flex flex-col justify-between space-y-5 relative overflow-hidden group">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/20 border border-indigo-400/40 rounded-xl text-indigo-300">
                <Fingerprint size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-sm text-white">
                  FOUNDERS & ARCHITECTS
                </h3>
                <p className="text-[10px] font-space text-indigo-400 tracking-wider">
                  FAV LI$ NOBLE VISIONARIES
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Dr. Favian Vance', role: 'Chief Quantum Architect', quote: 'Pioneered sub-atomic topological resonance arrays.' },
              { name: 'Lady Lishan Noble', role: 'Neural Systems Director', quote: 'Engineered synaptic silicon bandwidth transceivers.' },
              { name: 'Jaxen $', role: 'Head of Sub-Atomic Mechanics', quote: 'Architected faster-than-light entanglement verification.' },
            ].map((person, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-400/40 hover:bg-indigo-950/20 transition-all duration-300 group/person"
              >
                <div className="flex items-center justify-between">
                  <div className="font-unbounded font-bold text-xs text-white group-hover/person:text-indigo-300">
                    {person.name}
                  </div>
                  <span className="text-[10px] font-space text-cyan-400 font-mono">FLN-0{i+1}</span>
                </div>
                <div className="text-[11px] font-space text-slate-400 mt-0.5">{person.role}</div>
                <div className="text-[10px] font-space text-slate-500 italic mt-1">{person.quote}</div>
              </div>
            ))}
          </div>

        </div>

        {/* =========================================================================
            CARD 7: INTERACTIVE COMMAND CONSOLE DRAWER (Spans md:col-span-12 lg:col-span-4)
           ========================================================================= */}
        <div className="glass-card rounded-3xl p-6 md:p-8 md:col-span-12 lg:col-span-4 flex flex-col justify-between space-y-5 relative overflow-hidden group">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-cyan-500/20 border border-cyan-400/40 rounded-xl text-cyan-300">
                <Terminal size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-sm text-white">
                  QUANTUM TERMINAL
                </h3>
                <p className="text-[10px] font-space text-cyan-400 tracking-wider">
                  DIRECT CLI COMMAND ENTRY
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                playClickSound();
                onOpenTerminal();
              }}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-space font-semibold transition-all"
            >
              LAUNCH CLI
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#030508] border border-white/10 font-mono text-xs text-emerald-400 space-y-2 h-28 overflow-y-auto">
            <div className="text-slate-500 text-[11px]">// FAV LI$ NOBLE QUANTUM CONSOLE v9.8.4</div>
            <div>{terminalQuickOutput}</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-space">
            <button
              onClick={() => {
                playClickSound();
                setTerminalQuickOutput('EXECUTED: morph torus // TOPOLOGY MORPHED TO TORUS KNOT');
                setTopology('torus');
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-left flex items-center justify-between"
            >
              <span>MORPH TORUS</span>
              <ChevronRight size={13} className="text-cyan-400" />
            </button>
            <button
              onClick={() => {
                playClickSound();
                setTerminalQuickOutput('EXECUTED: theme gold // COLOR MATRIX RECONFIGURED TO NOBLE GOLD');
                setTheme('gold');
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-left flex items-center justify-between"
            >
              <span>THEME GOLD</span>
              <ChevronRight size={13} className="text-amber-400" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
