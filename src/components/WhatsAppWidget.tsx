import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, Send, ShieldCheck, CheckCheck, ExternalLink } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

// Official Authentic WhatsApp Icon
export const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 28,
  className = '',
}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* White Speech Bubble Silhouette with Tail */}
    <path
      fill="#FFFFFF"
      d="M.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24Z"
    />
    {/* WhatsApp Green Phone Handset */}
    <path
      fill="#25D366"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"
    />
  </svg>
);

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
              <div className="relative w-10 h-10 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.3)]">
                <WhatsAppIcon size={24} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#080c16]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-unbounded font-extrabold text-xs text-white uppercase tracking-wider">
                    {companyName}
                  </h4>
                  <ShieldCheck size={14} className="text-[#25D366]" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-300/80 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                  WHATSAPP DIRECT // ONLINE
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Open directly in WhatsApp app or web"
                className="p-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] hover:text-white border border-[#25D366]/30 transition-all flex items-center gap-1 text-[10px]"
              >
                <ExternalLink size={14} />
              </a>
              <button
                onClick={toggleWidget}
                onMouseEnter={playHoverSound}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
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

          {/* Direct WhatsApp Call to Action */}
          <div className="px-3 pt-2.5 pb-1 bg-[#060a12] border-t border-emerald-500/15">
            <a
              href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Fav Li$ Noble Tech, I am interested in discussing a project.')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.35)] transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon size={16} />
              <span>Start Direct WhatsApp Chat</span>
            </a>
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
              placeholder="Type your inquiry or message..."
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
            END-TO-END ENCRYPTED // WHATSAPP DIRECT ROUTE
          </div>
        </div>
      )}

      {/* Floating Trigger Button with Ambient Pulse Ring */}
      <div className="relative flex items-center justify-center group">
        {/* Tooltip on desktop hover */}
        {!isOpen && (
          <div className="absolute right-18 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#080c16]/95 border border-[#25D366]/40 text-slate-100 text-xs font-mono shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-20">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            <span>Chat on WhatsApp</span>
          </div>
        )}

        {/* Ambient Pulse Ring */}
        <div
          className="absolute inset-0 rounded-full bg-[#25D366]/40 pointer-events-none animate-ping opacity-75"
          style={{ animationDuration: '2.5s' }}
        />

        <button
          ref={triggerBtnRef}
          onClick={toggleWidget}
          onMouseEnter={playHoverSound}
          aria-label="Chat on WhatsApp"
          className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.5)] border-2 border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {isOpen ? (
            <X size={26} className="text-white transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <WhatsAppIcon size={34} className="transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
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
