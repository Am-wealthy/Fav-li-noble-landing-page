import React, { useState } from 'react';
import { X, Cpu, Zap, Database, Shield, ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface SpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPECS_DATA = [
  {
    id: 'fln-01',
    code: 'FLN-01',
    fullCode: 'FLN-01 // ZERO-POINT HARVESTER',
    title: 'Zero-Point Energy Synthesizer',
    shortTitle: 'Energy Synthesizer',
    icon: Zap,
    category: 'Energy Infrastructure',
    metrics: [
      { label: 'Energy Yield Efficiency', value: '99.84%' },
      { label: 'Thermal Floor', value: '0.0014 Kelvin' },
      { label: 'Sub-Atomic Output', value: '14.2 Petawatts' },
    ],
    description:
      'Harvesting quantum zero-point vacuum fluctuations utilizing non-linear topological resonator arrays. Provides clean, boundless energy for continuous deep-space and sub-atomic quantum computing nodes.',
    highlights: ['Topological Resonators', 'Non-linear Vacuum Cavities', 'Self-cooling Entanglement Field'],
  },
  {
    id: 'fln-02',
    code: 'FLN-02',
    fullCode: 'FLN-02 // SYNAPTIC LINK MK-IV',
    title: 'Direct Neural Silicon Bandwidth Bridge',
    shortTitle: 'Neural Silicon Link',
    icon: Cpu,
    category: 'Neural Interface',
    metrics: [
      { label: 'Bi-Directional Bandwidth', value: '128.4 TB/s' },
      { label: 'Synaptic Latency', value: '0.003 milliseconds' },
      { label: 'Neural Channel Count', value: '10,000,000 Synapses' },
    ],
    description:
      'Seamless non-invasive bi-directional interface mapping biological cerebral action potentials directly to 3D sub-atomic silicon processing matrices in real-time.',
    highlights: ['Optogenetic Sensor Array', 'Zero Signal Degradation', 'Quantum Encryption Shield'],
  },
  {
    id: 'fln-03',
    code: 'FLN-03',
    fullCode: 'FLN-03 // SUB-ATOMIC STORAGE',
    title: 'Molecular Spin Crystal Lattice Storage',
    shortTitle: 'Spin Crystal Storage',
    icon: Database,
    category: 'Data Architecture',
    metrics: [
      { label: 'Data Density', value: '1.2 Exabytes / mm³' },
      { label: 'Data Half-Life', value: '10,000,000 Years' },
      { label: 'Read/Write Bandwidth', value: '450 Petabytes/sec' },
    ],
    description:
      'Storing dense hyper-dimensional state tensors in synthetic diamond crystal lattices by precisely encoding electron quantum spin orientation vectors.',
    highlights: ['Diamond Spin Memory', 'Atomic Lattice Encoding', 'Radiation Immune Architecture'],
  },
  {
    id: 'fln-04',
    code: 'FLN-04',
    fullCode: 'FLN-04 // TACHYON VERIFICATION',
    title: 'Instantaneous Entanglement Consensus',
    shortTitle: 'Entanglement Protocol',
    icon: Shield,
    category: 'Security & Protocol',
    metrics: [
      { label: 'Entanglement Pair Count', value: '1,000,000 Nodes' },
      { label: 'Consensus Speed', value: 'Instantaneous' },
      { label: 'Decoherence Guard', value: '99.99999%' },
    ],
    description:
      'Cryptographic verification utilizing quantum entanglement phase shift changes to validate high-value global transactions without electromagnetic latency constraints.',
    highlights: ['Quantum Key Distribution', 'Relativistic Proof of State', 'Zero-Knowledge Entanglement'],
  },
];

export const SpecModal: React.FC<SpecModalProps> = ({ isOpen, onClose }) => {
  const [activeSpecId, setActiveSpecId] = useState(SPECS_DATA[0].id);

  if (!isOpen) return null;

  const activeSpec = SPECS_DATA.find((s) => s.id === activeSpecId) || SPECS_DATA[0];
  const IconComp = activeSpec.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md transition-all animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#080d1a]/95 border border-cyan-400/40 rounded-3xl shadow-[0_0_80px_rgba(6,182,212,0.3)] flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-5 border-b border-white/10 bg-[#040711]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
              <Layers size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  FAV LI$ NOBLE TECH
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  SPEC DECK 2026
                </span>
              </div>
              <h2 className="font-unbounded font-black text-base sm:text-xl text-white tracking-wide mt-0.5">
                QUANTUM SPECIFICATION DECK
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6">
          
          {/* Top Horizontal Specification Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {SPECS_DATA.map((spec) => {
              const SpecIcon = spec.icon;
              const isSelected = spec.id === activeSpecId;
              return (
                <button
                  key={spec.id}
                  onClick={() => {
                    playClickSound();
                    setActiveSpecId(spec.id);
                  }}
                  className={`p-3 sm:p-4 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-gradient-to-b from-cyan-950/80 to-cyan-900/30 border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.3)] text-white scale-[1.02]'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/25 hover:bg-white/[0.05] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-mono font-bold tracking-wider ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`}>
                      {spec.code}
                    </span>
                    <SpecIcon size={16} className={isSelected ? 'text-cyan-400' : 'text-slate-500'} />
                  </div>
                  <div className="font-unbounded font-bold text-xs sm:text-sm line-clamp-1 leading-tight">
                    {spec.shortTitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Specification Detail Card */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-5 sm:p-7 space-y-6">
            
            {/* Title & Category Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3.5 bg-cyan-500/20 border border-cyan-400/40 rounded-2xl text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] shrink-0">
                  <IconComp size={26} />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                    {activeSpec.fullCode}
                  </div>
                  <h3 className="font-unbounded font-black text-lg sm:text-xl text-white mt-0.5">
                    {activeSpec.title}
                  </h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase self-start sm:self-center shrink-0">
                <Sparkles size={12} className="text-cyan-400" />
                <span>{activeSpec.category}</span>
              </div>
            </div>

            {/* Description Callout */}
            <p className="font-space text-xs sm:text-sm text-slate-200 leading-relaxed bg-cyan-950/20 p-4 sm:p-5 rounded-2xl border border-cyan-500/20">
              {activeSpec.description}
            </p>

            {/* Metrics 3-Column Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                BENCHMARK METRICS & YIELD
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeSpec.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 transition-colors text-center"
                  >
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div className="font-unbounded font-black text-base sm:text-lg text-cyan-300 mt-1">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Highlights Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold">
                CORE ARCHITECTURAL HIGHLIGHTS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeSpec.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs font-space text-slate-200 bg-white/[0.03] p-3 rounded-xl border border-white/10"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Footer Action Bar */}
        <div className="px-5 sm:px-8 py-4 border-t border-white/10 bg-[#040711]/80 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400 hidden sm:block">
            FAV LI$ NOBLE TECH // ALL RIGHTS RESERVED 2026
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-unbounded font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95 transition-all"
          >
            <span>ACKNOWLEDGE SPECIFICATIONS</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
