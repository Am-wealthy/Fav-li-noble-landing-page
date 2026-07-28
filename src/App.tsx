import React, { useState } from 'react';
import { ParticleBackground, ParticleTopology, ParticleTheme } from './components/ParticleBackground';
import { CustomCursor } from './components/CustomCursor';
import { IntroScreen } from './components/IntroScreen';
import { HeaderHUD } from './components/HeaderHUD';
import { LandingPage } from './components/LandingPage';
import { AboutPage } from './components/AboutPage';
import { ProjectsPage } from './components/ProjectsPage';
import { BentoGrid } from './components/BentoGrid';
import { TerminalDrawer } from './components/TerminalDrawer';
import { SpecModal } from './components/SpecModal';
import { ContactModal } from './components/ContactModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { Footer } from './components/Footer';
import { toggleAmbientDrone, playShockwaveSound } from './utils/audio';

export default function App() {
  // Intro overlay state
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Page View Routing State ('landing' | 'about' | 'projects' | 'lab')
  const [activePage, setActivePage] = useState<'landing' | 'about' | 'projects' | 'lab'>('landing');

  // Three.js Particle Engine States
  const [topology, setTopology] = useState<ParticleTopology>('torus');
  const [theme, setTheme] = useState<ParticleTheme>('gold');
  const [density, setDensity] = useState<number>(4500);
  const [speed, setSpeed] = useState<number>(1.0);
  const [shockwaveTrigger, setShockwaveTrigger] = useState<number>(0);

  // Audio and Modals States
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  const handleToggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    toggleAmbientDrone(next);
  };

  const handleTriggerShockwave = () => {
    setShockwaveTrigger((prev) => prev + 1);
    if (audioEnabled) {
      playShockwaveSound();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030508] text-slate-100 font-space overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Precision Custom Cursor */}
      <CustomCursor />

      {/* Full-Bleed Three.js Interactive 3D Particle System Background */}
      <ParticleBackground
        topology={topology}
        theme={theme}
        density={density}
        speed={speed}
        shockwaveTrigger={shockwaveTrigger}
        onCanvasClick={handleTriggerShockwave}
      />

      {/* Immediate Load Intro Overlay */}
      {showIntro ? (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      ) : (
        /* Main Content Layout Overlay (shown after intro opens) */
        <div className="relative z-10 flex flex-col min-h-screen animate-fadeIn duration-500">
          
          {/* Navigation HUD */}
          <HeaderHUD
            topology={topology}
            theme={theme}
            audioEnabled={audioEnabled}
            activePage={activePage}
            onSelectPage={setActivePage}
            onToggleAudio={handleToggleAudio}
            onTriggerShockwave={handleTriggerShockwave}
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenSpecsModal={() => setIsSpecsOpen(true)}
            onOpenContactModal={() => setIsContactOpen(true)}
          />

          {/* Dynamic Page Views: Home, About, Projects, Lab */}
          <main className="flex-1">
            {activePage === 'landing' && (
              <LandingPage
                onGoToQuantumLab={() => setActivePage('lab')}
                onGoToProjects={() => setActivePage('projects')}
                onGoToAbout={() => setActivePage('about')}
                onOpenTerminal={() => setIsTerminalOpen(true)}
                onOpenSpecsModal={() => setIsSpecsOpen(true)}
                onOpenContactModal={() => setIsContactOpen(true)}
                targetEmail="boboike600@gmail.com"
              />
            )}

            {activePage === 'about' && (
              <AboutPage
                onOpenContactModal={() => setIsContactOpen(true)}
                onOpenSpecsModal={() => setIsSpecsOpen(true)}
                onOpenTerminal={() => setIsTerminalOpen(true)}
                onGoToProjects={() => setActivePage('projects')}
              />
            )}

            {activePage === 'projects' && (
              <ProjectsPage
                onOpenContactModal={() => setIsContactOpen(true)}
                onGoToQuantumLab={() => setActivePage('lab')}
              />
            )}

            {activePage === 'lab' && (
              <BentoGrid
                topology={topology}
                setTopology={setTopology}
                theme={theme}
                setTheme={setTheme}
                density={density}
                setDensity={setDensity}
                speed={speed}
                setSpeed={setSpeed}
                audioEnabled={audioEnabled}
                onToggleAudio={handleToggleAudio}
                onTriggerShockwave={handleTriggerShockwave}
                onOpenTerminal={() => setIsTerminalOpen(true)}
                onOpenSpecsModal={() => setIsSpecsOpen(true)}
                onOpenContactModal={() => setIsContactOpen(true)}
              />
            )}
          </main>

          {/* Footer */}
          <Footer
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onOpenSpecsModal={() => setIsSpecsOpen(true)}
            onOpenContactModal={() => setIsContactOpen(true)}
            onSelectPage={setActivePage}
          />

        </div>
      )}

      {/* Terminal Drawer Overlay */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        topology={topology}
        setTopology={setTopology}
        theme={theme}
        setTheme={setTheme}
        onTriggerShockwave={handleTriggerShockwave}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
      />

      {/* Specification Deck Modal Overlay */}
      <SpecModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      {/* Contact Project Brief Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        targetEmail="boboike600@gmail.com"
      />

      {/* Floating GSAP WhatsApp Chat Widget - Only visible after intro */}
      {!showIntro && <WhatsAppWidget phoneNumber="2348101580255" companyName="Fav Li$ Noble Tech" />}

    </div>
  );
}

