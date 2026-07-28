import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Send, Play, Sparkles } from 'lucide-react';
import { ParticleTopology, ParticleTheme } from './ParticleBackground';
import { playClickSound, playShockwaveSound } from '../utils/audio';

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  topology: ParticleTopology;
  setTopology: (t: ParticleTopology) => void;
  theme: ParticleTheme;
  setTheme: (t: ParticleTheme) => void;
  onTriggerShockwave: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

interface LogEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'error';
  text: string;
}

export const TerminalDrawer: React.FC<TerminalDrawerProps> = ({
  isOpen,
  onClose,
  setTopology,
  setTheme,
  onTriggerShockwave,
  audioEnabled,
  onToggleAudio,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      type: 'system',
      text: 'FAV LI$ NOBLE TECH // QUANTUM CONSOLE v9.8.4\nType "help" to display available system directives.',
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    playClickSound();

    const newLogs: LogEntry[] = [...logs, { id: Date.now().toString(), type: 'input', text: `> ${raw}` }];
    const parts = raw.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts[1];

    switch (cmd) {
      case 'help':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `AVAILABLE COMMANDS:\n  morph <torus|wave|galaxy|hypercube>  - Change particle topology\n  theme <cyber|gold|emerald|space>    - Change particle color matrix\n  shockwave                           - Trigger quantum pulse wave\n  audio                               - Toggle ambient synthesizer\n  status                              - Output system diagnostic readout\n  clear                               - Clear console terminal history`,
        });
        break;

      case 'morph':
        if (['torus', 'wave', 'galaxy', 'hypercube'].includes(arg)) {
          setTopology(arg as ParticleTopology);
          newLogs.push({
            id: (Date.now() + 1).toString(),
            type: 'system',
            text: `[QUANTUM MESH] Topology morphed to: ${arg.toUpperCase()}`,
          });
        } else {
          newLogs.push({
            id: (Date.now() + 1).toString(),
            type: 'error',
            text: 'Invalid topology. Use: torus, wave, galaxy, or hypercube.',
          });
        }
        break;

      case 'theme':
        if (['cyber', 'gold', 'emerald', 'space'].includes(arg)) {
          setTheme(arg as ParticleTheme);
          newLogs.push({
            id: (Date.now() + 1).toString(),
            type: 'system',
            text: `[COLOR MATRIX] Theme palette reconfigured to: ${arg.toUpperCase()}`,
          });
        } else {
          newLogs.push({
            id: (Date.now() + 1).toString(),
            type: 'error',
            text: 'Invalid theme. Use: cyber, gold, emerald, or space.',
          });
        }
        break;

      case 'shockwave':
      case 'pulse':
        onTriggerShockwave();
        playShockwaveSound();
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'system',
          text: '[QUANTUM PULSE] Shockwave vector discharged into WebGL buffer.',
        });
        break;

      case 'audio':
        onToggleAudio();
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'system',
          text: `[AUDIO SYNTH] State updated to: ${!audioEnabled ? 'ENABLED' : 'MUTED'}`,
        });
        break;

      case 'status':
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'output',
          text: `SYSTEM STATUS // FAV LI$ NOBLE TECH\n  Core Temperature: 0.0014 K (Superconducting)\n  Neural Bandwidth: 128.4 TB/s\n  Quantum Decoherence Rate: 0.000001%\n  Zero-Point Yield: 99.84% Efficiency\n  Active Nodes: Tokyo, Zurich, Neo-Singapore, Silicon Valley`,
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        newLogs.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for valid directives.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all">
      <div className="w-full max-w-2xl bg-[#080c16]/90 border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col h-[520px] overflow-hidden font-mono text-sm">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#030508] border-b border-white/10">
          <div className="flex items-center gap-2 text-cyan-400">
            <TerminalIcon size={16} />
            <span className="font-space font-semibold tracking-wide text-xs text-slate-200">
              FAV LI$ NOBLE // QUANTUM CONSOLE TERMINAL
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-white/5 overflow-x-auto text-xs font-space">
          <span className="text-slate-500 flex items-center gap-1 text-[11px] shrink-0">
            <Sparkles size={12} className="text-cyan-400" /> QUICK:
          </span>
          {['morph wave', 'morph torus', 'theme gold', 'theme cyber', 'shockwave', 'status'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleCommand(suggestion)}
              className="px-2.5 py-1 rounded bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 transition-colors shrink-0 flex items-center gap-1 text-[11px]"
            >
              <Play size={10} />
              {suggestion}
            </button>
          ))}
        </div>

        {/* Console Logs Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-slate-300 font-mono text-xs leading-relaxed">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`whitespace-pre-wrap ${
                log.type === 'input'
                  ? 'text-cyan-300 font-semibold'
                  : log.type === 'system'
                  ? 'text-emerald-400'
                  : log.type === 'error'
                  ? 'text-rose-400'
                  : 'text-slate-300'
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Command Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="flex items-center gap-2 p-3 bg-[#030508] border-t border-white/10"
        >
          <span className="text-cyan-400 font-bold">&gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type directive (e.g. 'morph torus', 'theme gold', 'help')..."
            className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none font-mono text-xs"
            autoFocus
          />
          <button
            type="submit"
            className="p-2 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 border border-cyan-400/40 transition-colors"
          >
            <Send size={14} />
          </button>
        </form>

      </div>
    </div>
  );
};
