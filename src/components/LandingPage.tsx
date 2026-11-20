import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Cpu,
  CheckCircle2,
  Lock,
  Send,
  DollarSign,
  Mail,
  FileText,
  AlertCircle,
  Compass,
  Code,
  Cloud,
  Layout,
  Smartphone,
  Globe,
  Bot,
  ArrowUpRight,
} from 'lucide-react';
import { playClickSound, playHoverSound, playShockwaveSound } from '../utils/audio';
import mobileAppShowcaseImg from '../assets/images/mobile_app_development_showcase_1795202240668.jpg';
import customWebShowcaseImg from '../assets/images/custom_web_application_showcase_1795202240607.jpg';
import aiDashboardShowcaseImg from '../assets/images/ai_dashboard_automation_showcase_1795202241145.jpg';

interface LandingPageProps {
  onGoToQuantumLab: () => void;
  onGoToProjects: () => void;
  onGoToAbout?: () => void;
  onOpenTerminal: () => void;
  onOpenSpecsModal: () => void;
  onOpenContactModal: () => void;
}

interface CoreServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  accentClass: string;
}

const CORE_SERVICES: CoreServiceItem[] = [
  {
    id: 'mobile-app-development',
    number: '01',
    title: 'Mobile App Development (iOS & Android)',
    subtitle: 'Native & Cross-Platform Mobile Engineering',
    description:
      'We architect fast, intuitive iOS and Android applications engineered for seamless offline sync, biometric security, real-time notifications, and App Store & Google Play scalability.',
    deliverables: ['iOS Swift & SwiftUI', 'Android Kotlin', 'React Native & Flutter', 'App Store Deployment'],
    ctaLabel: 'Request Mobile App Quote',
    imageSrc: mobileAppShowcaseImg,
    imageAlt: 'Custom iOS and Android mobile application analytics interface engineered by Fav Lis Noble Tech Company',
    icon: <Smartphone size={18} />,
    accentClass: 'border-cyan-400/30 hover:border-cyan-400/60',
  },
  {
    id: 'custom-web-development',
    number: '02',
    title: 'Custom Web Applications & Website Development',
    subtitle: 'Full-Stack Platforms, SaaS & SEO Websites',
    description:
      'From enterprise SaaS dashboards and e-commerce portals to conversion-focused corporate websites, we deliver sub-second load speeds, technical SEO, and resilient cloud backends.',
    deliverables: ['React & Next.js Apps', 'Custom APIs & Databases', 'Technical SEO Architecture', 'Responsive Web Design'],
    ctaLabel: 'Start Web Project',
    imageSrc: customWebShowcaseImg,
    imageAlt: 'Custom web application architecture and responsive website design workspace by Fav Lis Noble Tech Company',
    icon: <Globe size={18} />,
    accentClass: 'border-teal-400/30 hover:border-teal-400/60',
  },
  {
    id: 'ai-solutions-automation',
    number: '03',
    title: 'Artificial Intelligence (AI) Solutions, Integration & Automation',
    subtitle: 'LLM Workflows, Intelligent Agents & Predictive Systems',
    description:
      'Transform business operations with custom AI assistants, document & OCR pipelines, retrieval-augmented search, and end-to-end workflow automation tailored to your data.',
    deliverables: ['LLM & API Integration', 'AI Agents & Chatbots', 'Document & OCR Automation', 'Predictive Analytics'],
    ctaLabel: 'Explore AI Automation',
    imageSrc: aiDashboardShowcaseImg,
    imageAlt: 'Custom AI web application dashboard and automated neural workflow built by Fav Lis Noble Tech Company',
    icon: <Bot size={18} />,
    accentClass: 'border-emerald-400/30 hover:border-emerald-400/60',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onGoToQuantumLab,
  onGoToProjects,
  onGoToAbout,
  onOpenTerminal,
  onOpenContactModal,
}) => {
  // Booking Form State
  const [email, setEmail] = useState('');
  const [budget, setBudget] = useState('$50,000 - $100,000');
  const [brief, setBrief] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !brief) {
      setErrorMessage('Please fill in required fields.');
      setStatus('error');
      return;
    }

    playClickSound();
    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      email,
      budget,
      message: brief,
      brief,
      _subject: `[Project Intake] New Brief for Fav Lis Noble Tech Company from ${email}`,
      timestamp: new Date().toISOString(),
    };

    try {
      const apiEndpoint = (import.meta as any).env?.VITE_API_URL
        ? `${(import.meta as any).env.VITE_API_URL.replace(/\/$/, '')}/api/transmit-brief`
        : '/api/transmit-brief';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        setStatus('success');
        playShockwaveSound();
      } else {
        setErrorMessage(data.error || 'Failed to dispatch proposal email. Please verify server connection.');
        setStatus('error');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Network error transmitting proposal to server.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20 font-space">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center text-center py-10 sm:py-16 px-4 overflow-hidden rounded-3xl bg-cyan-950/10 backdrop-blur-sm border border-cyan-400/30 shadow-[0_0_80px_rgba(6,182,212,0.2)] hover:border-cyan-400/50 transition-colors">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs font-mono tracking-wider text-cyan-300">
            <span>Fav Lis Noble Tech Company</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">iOS &amp; Android Apps</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Custom Web &amp; AI Automation</span>
          </div>

          <h1 className="font-unbounded font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.08] text-balance break-words pt-1">
            Custom Mobile App, Web &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              AI Development Solutions
            </span>
          </h1>

          <p className="font-unbounded font-bold text-sm sm:text-base md:text-lg text-cyan-300 tracking-wide pt-1">
            Fav Lis Noble Tech Company — Software Engineered for Global Impact.
          </p>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-space">
            At Fav Lis Noble Tech Company, we engineer high-performance iOS and Android mobile applications, custom web applications, modern websites, and artificial intelligence automation systems built to scale businesses and drive measurable growth.
          </p>

          <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                playClickSound();
                if (onGoToAbout) onGoToAbout();
              }}
              onMouseEnter={playHoverSound}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-unbounded font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] active:scale-95 transition-all w-full sm:w-auto whitespace-nowrap shrink-0"
            >
              <Shield size={18} className="fill-current" />
              <span>ABOUT</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onGoToProjects();
              }}
              onMouseEnter={playHoverSound}
              className="flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 font-unbounded font-bold text-xs uppercase tracking-widest active:scale-95 transition-all w-full sm:w-auto whitespace-nowrap shrink-0"
            >
              <Compass size={16} />
              <span>PROJECTS</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                onGoToQuantumLab();
              }}
              onMouseEnter={playHoverSound}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-unbounded font-bold text-xs uppercase tracking-widest active:scale-95 transition-all w-full sm:w-auto cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] whitespace-nowrap shrink-0"
            >
              <Cpu size={16} className="text-cyan-400 animate-pulse" />
              <span>ANALYSE THIS WEBSITE</span>
            </button>
          </div>

          {/* Quick Performance & Substrate Metrics Bar */}
          <div className="pt-8 sm:pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left border-t border-white/10 mt-6 sm:mt-8">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">DELIVERED PLATFORMS</span>
              <div className="font-unbounded font-bold text-lg sm:text-xl text-emerald-400 tabular-nums">50+ APPS</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">PLATFORMS</span>
              <div className="font-unbounded font-bold text-lg sm:text-xl text-cyan-300">iOS · Android · Web</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">LIGHTHOUSE SCORE</span>
              <div className="font-unbounded font-bold text-lg sm:text-xl text-teal-300 tabular-nums">100 / 100</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">GLOBAL UPTIME</span>
              <div className="font-unbounded font-bold text-lg sm:text-xl text-purple-300 tabular-nums">99.99%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section: Mobile App, Web Application & AI Development */}
      <section id="core-services" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
              Fav Lis Noble Tech Company · Core Services
            </p>
            <h2 className="font-unbounded font-black text-2xl sm:text-3xl md:text-4xl text-white leading-tight text-balance">
              Mobile App, Web Application &amp; AI Development Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            End-to-end software architecture, native mobile apps, custom web systems, and applied artificial intelligence built for speed and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service) => (
            <article
              key={service.id}
              onMouseEnter={playHoverSound}
              className={`rounded-3xl bg-[#080c16] border ${service.accentClass} transition-all duration-300 flex flex-col justify-between overflow-hidden`}
            >
              <div>
                {/* Below-the-fold Lazy Loaded Visual Showcase */}
                <div className="relative aspect-[4/3] w-full bg-[#050914] border-b border-white/10 overflow-hidden">
                  {!failedImages[service.id] ? (
                    <img
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(service.id)}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 bg-gradient-to-br from-cyan-950/60 via-[#080d1a] to-emerald-950/40 text-cyan-300">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                        {service.icon}
                      </div>
                      <span className="font-unbounded font-bold text-xs text-center text-white">
                        {service.title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span>{service.number}.</span>
                    <span className="text-slate-400">{service.subtitle}</span>
                  </div>

                  <h3 className="font-unbounded font-bold text-lg text-white leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] font-mono text-slate-400">
                    {service.deliverables.map((item, idx) => (
                      <span key={item} className="inline-flex items-center gap-2">
                        <span>{item}</span>
                        {idx < service.deliverables.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => {
                    playClickSound();
                    onOpenContactModal();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-xs font-unbounded font-bold text-cyan-300 transition-all whitespace-nowrap"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: About & Preserved 4 Capability Cards */}
      <section id="capabilities" className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#080d1a]/80 border border-cyan-500/20 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
              <Shield size={14} />
              <span>About Fav Lis Noble Tech Company</span>
            </div>

            <h2 className="font-unbounded font-black text-xl sm:text-2xl text-white leading-snug">
              Engineering Scalable Software &amp; Digital Systems
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed font-space">
              Fav Lis Noble Tech Company is a forward-thinking software agency dedicated to building custom mobile apps, high-performance web applications, and AI-driven automation. We combine modern engineering with user-centric design to turn complex technological challenges into measurable commercial growth.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                playClickSound();
                onGoToProjects();
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold text-xs uppercase transition-all w-full sm:w-auto whitespace-nowrap"
            >
              <Compass size={16} />
              <span>PROJECTS</span>
            </button>
            <button
              onClick={onOpenTerminal}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 font-bold text-xs uppercase transition-all w-full sm:w-auto whitespace-nowrap"
            >
              <Cpu size={16} />
              <span>OPEN CLI TERMINAL</span>
            </button>
          </div>
        </div>

        {/* Preserved What We Do 4 Cards */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="px-1 flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-unbounded text-cyan-400 uppercase tracking-wider font-bold">
              What We Do · Core Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            <div className="p-5 rounded-2xl bg-[#080c16] border border-white/10 hover:border-cyan-400/40 transition-all space-y-2 flex flex-col justify-between">
              <div className="p-2.5 w-fit rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                <Code size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-xs sm:text-sm text-white">Custom Software Development</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Designing and engineering tailored applications to meet unique corporate and consumer needs.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#080c16] border border-white/10 hover:border-emerald-400/40 transition-all space-y-2 flex flex-col justify-between">
              <div className="p-2.5 w-fit rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                <Cloud size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-xs sm:text-sm text-white">Agile Cloud Solutions</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Building secure, scalable, and resilient cloud architecture optimized for modern business demands.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#080c16] border border-white/10 hover:border-purple-400/40 transition-all space-y-2 flex flex-col justify-between">
              <div className="p-2.5 w-fit rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300">
                <Cpu size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-xs sm:text-sm text-white">Digital Transformation</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Modernizing legacy systems with next-generation technologies to enhance operational productivity.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#080c16] border border-white/10 hover:border-amber-400/40 transition-all space-y-2 flex flex-col justify-between">
              <div className="p-2.5 w-fit rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
                <Layout size={18} />
              </div>
              <div>
                <h3 className="font-unbounded font-bold text-xs sm:text-sm text-white">UI/UX Product Design</h3>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Crafting intuitive, data-driven user experiences that maximize engagement and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Project Brief Intake Form */}
      <section id="contact-intake" className="p-6 sm:p-8 md:p-12 rounded-3xl bg-[#080c16]/95 border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.2)] space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
              Fav Lis Noble Tech Company · Direct Project Intake
            </span>
            <h2 className="font-unbounded font-black text-xl sm:text-2xl md:text-3xl text-white">
              SUBMIT A PROJECT BRIEF
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Start your mobile app, custom web application, or AI automation project with our engineering team.
          </p>
        </div>

        {status === 'success' ? (
          <div className="py-8 sm:py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="font-unbounded font-black text-lg sm:text-xl text-white">BRIEF DELIVERED</h3>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Your inquiry has been encrypted and routed to our team. Our engineers will initiate contact within 24 hours.
            </p>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-emerald-300 bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-500/30">
              <Lock size={14} />
              <span>STATUS: ROUTED · HTTP 200 OK</span>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} className="text-cyan-400 shrink-0" />
                  USER EMAIL ADDRESS <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. founder@yourcompany.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#030508] border border-white/10 focus:border-cyan-400 text-sm text-white placeholder-slate-600 focus:outline-none transition-all font-space"
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign size={14} className="text-amber-400 shrink-0" />
                  PROJECT BUDGET ALLOCATION
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    '$25k - $50k',
                    '$50k - $100k',
                    '$100k - $250k',
                    '$250k+',
                    'Enterprise',
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setBudget(option)}
                      className={`p-2.5 rounded-xl border text-xs font-space font-semibold transition-all ${
                        budget === option
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Brief */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FileText size={14} className="text-purple-400 shrink-0" />
                PROJECT BRIEF &amp; ARCHITECTURAL SPECIFICATIONS <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe your iOS/Android mobile app, custom web application, website design, or AI automation requirements..."
                className="w-full px-4 py-3.5 rounded-xl bg-[#030508] border border-white/10 focus:border-purple-400 text-sm text-white placeholder-slate-600 focus:outline-none transition-all font-space resize-none"
              />
            </div>

            {status === 'error' && errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <span className="text-[10px] font-mono text-slate-500">
                ENCRYPTED TRANSMISSION PROTOCOL · DIRECT ROUTE
              </span>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-unbounded font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap"
              >
                {status === 'submitting' ? (
                  <>
                    <Sparkles size={16} className="animate-spin" />
                    <span>TRANSMITTING BRIEF...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>TRANSMIT BRIEF</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
