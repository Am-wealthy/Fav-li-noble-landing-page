import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MessageSquare, X, Send, Sparkles, ShieldCheck, CheckCheck } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  companyName?: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = '2348101580255',
  companyName = 'Fav Li$ Noble Tech',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: `Greetings. Welcome to ${companyName} Quantum Concierge. How can our sovereign engineers assist your deployment today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const widgetRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const triggerBtnRef = useRef<HTMLButtonElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);

  // GSAP Ambient Pulsing Glow Animation on trigger button
  useEffect(() => {
    if (glowRingRef.current) {
      gsap.to(glowRingRef.current, {
        scale: 1.45,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power2.out',
      });
    }
  }, []);

  // GSAP Expand/Collapse Animation for Chat Window
  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      gsap.fromTo(
        chatWindowRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
          transformOrigin: 'bottom right',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: 'back.out(1.5)',
        }
      );
    }
  }, [isOpen]);

  const toggleWidget = () => {
    playClickSound();
    if (!isOpen) {
      setIsOpen(true);
    } else {
      if (chatWindowRef.current) {
        gsap.to(chatWindowRef.current, {
          opacity: 0,
          scale: 0.85,
          y: 15,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => setIsOpen(false),
        });
      } else {
        setIsOpen(false);
      }
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    playClickSound();

    const userMsgTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: trimmed, time: userMsgTime },
    ]);

    // Route message via WhatsApp wa.me endpoint with encoded text
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(trimmed);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setMessage('');
  };

  const sendQuickChip = (quickText: string) => {
    setMessage(quickText);
    playClickSound();
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-space select-none">
      
      {/* Expanded Mini-Chat Window Interface */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[480px] mb-4 bg-[#080c16]/95 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.2)] flex flex-col overflow-hidden text-slate-100"
        >
          {/* Header Bar */}
          <div className="p-4 bg-gradient-to-r from-[#061a12] via-[#082218] to-[#0a1120] border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Sparkles size={18} className="animate-pulse" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#080c16]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-unbounded font-extrabold text-xs text-white uppercase tracking-wider">
                    {companyName}
                  </h4>
                  <ShieldCheck size={14} className="text-emerald-400" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-300/80 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  QUANTUM CONCIERGE // ONLINE
                </div>
              </div>
            </div>

            <button
              onClick={toggleWidget}
              onMouseEnter={playHoverSound}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Conversation Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#030508]/60 text-xs">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none border border-emerald-400/30'
                      : 'bg-[#0e1626] text-slate-200 rounded-bl-none border border-white/10'
                  }`}
                >
                  <p className="font-space">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1 text-[9px] font-mono text-slate-500">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck size={12} className="text-emerald-400" />}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-3 py-2 bg-[#060a12] border-t border-white/5 flex gap-1.5 overflow-x-auto text-[10px] font-space">
            {[
              'Request Quantum Spec Deck',
              'Deploy Custom Node Mesh',
              'Schedule Tech Consultation',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => sendQuickChip(chip)}
                className="px-2.5 py-1 rounded-full bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 transition-colors shrink-0 whitespace-nowrap"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input & Send Controls */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#080c16] border-t border-emerald-500/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your quantum inquiry..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#030508] border border-white/10 focus:border-emerald-400 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors font-space"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              onMouseEnter={playHoverSound}
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 shrink-0"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Footer Encryption Tag */}
          <div className="px-4 py-1.5 bg-[#030508] border-t border-white/5 text-[9px] font-mono text-center text-slate-500 tracking-wider">
            END-TO-END ENCRYPTED // WHATSAPP QUANTUM ROUTE
          </div>
        </div>
      )}

      {/* Floating Trigger Button with Ambient Pulse Ring */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Pulse Ring */}
        <div
          ref={glowRingRef}
          className="absolute inset-0 rounded-full bg-emerald-500/40 pointer-events-none"
        />

        <button
          ref={triggerBtnRef}
          onClick={toggleWidget}
          onMouseEnter={playHoverSound}
          aria-label="Open WhatsApp Chat"
          className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#075E54] text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.5)] border border-emerald-300/40 hover:scale-110 active:scale-95 transition-transform duration-300 group"
        >
          {isOpen ? (
            <X size={24} className="transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <MessageSquare size={24} className="fill-white stroke-none transition-transform duration-300 group-hover:scale-110" />
          )}

          {/* Unread Alert Indicator Dot */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-cyan-400 border-2 border-[#030508] rounded-full animate-bounce" />
          )}
        </button>
      </div>

    </div>
  );
};
