import { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeFading, setWelcomeFading] = useState(false);
  const [welcomeTyped, setWelcomeTyped] = useState('');
  const [bootLines, setBootLines] = useState([]);
  const [activeLine, setActiveLine] = useState('');
  const [bootProgress, setBootProgress] = useState(0);
  const welcomeMessage = 'WELCOME, AMRESH. PROFILE OPENED.';

  const bootSequence = useMemo(
    () => [
      { text: 'AMRESH PORTFOLIO BIOS v2.7', speed: 10, pause: 90 },
      { text: '[DEV] CPU ............... ONLINE', speed: 8, pause: 60 },
      { text: '[DEV] RAM ............... ONLINE', speed: 8, pause: 60 },
      { text: '[OK ] UI MODULES ........ LOADED', speed: 8, pause: 60 },
      { text: '[OK ] API BRIDGE ........ LOADED', speed: 8, pause: 60 },
      { text: 'C:\\> run portfolio.exe', speed: 11, pause: 90 },
      { text: '[OK ] BOOT COMPLETE', speed: 8, pause: 110 }
    ],
    []
  );

  const finishBoot = useCallback(() => {
    setBootProgress(100);
    setActiveLine('');
    setShowBoot(false);
    setWelcomeTyped('');
    setWelcomeFading(false);
    setShowWelcome(true);
  }, []);

  useEffect(() => {
    if (!showWelcome) return;

    let index = 0;
    const typer = window.setInterval(() => {
      index += 1;
      setWelcomeTyped(welcomeMessage.slice(0, index));
      if (index >= welcomeMessage.length) {
        window.clearInterval(typer);
      }
    }, 16);

    const fadeTimer = window.setTimeout(() => {
      setWelcomeFading(true);
    }, 560);

    const hideTimer = window.setTimeout(() => {
      setShowWelcome(false);
      setWelcomeFading(false);
    }, 760);

    return () => {
      window.clearInterval(typer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [showWelcome, welcomeMessage]);

  useEffect(() => {
    if (!showBoot) return;

    let cancelled = false;
    let skipRequested = false;
    let completedCharacters = 0;
    const totalCharacters = bootSequence.reduce((sum, item) => sum + item.text.length + 1, 0);

    const sleep = (ms) => new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      skipRequested = true;
      setBootLines(bootSequence.map((row) => row.text));
      finishBoot();
    };

    window.addEventListener('keydown', handleKeyDown);

    const playBootSequence = async () => {
      for (const row of bootSequence) {
        for (let index = 0; index <= row.text.length; index += 1) {
          if (cancelled || skipRequested) return;
          setActiveLine(row.text.slice(0, index));
          setBootProgress(Math.min(100, Math.round(((completedCharacters + index) / totalCharacters) * 100)));
          await sleep(row.speed);
        }

        if (cancelled || skipRequested) return;
        setBootLines((prev) => [...prev, row.text]);
        setActiveLine('');
        completedCharacters += row.text.length + 1;
        await sleep(row.pause);
      }

      if (!cancelled && !skipRequested) {
        finishBoot();
      }
    };

    playBootSequence();

    return () => {
      cancelled = true;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [bootSequence, finishBoot, showBoot]);

  const getBootLineClass = (line) => {
    if (line.startsWith('[OK ]')) return 'boot-ok';
    if (line.startsWith('[WARN]')) return 'boot-warn';
    if (line.startsWith('[DEV]')) return 'boot-device';
    if (line.startsWith('C:\\>')) return 'boot-command';
    return '';
  };

  return (
    <div className="retro-shell min-h-screen antialiased transition-colors duration-300 text-emerald-300">
      {showBoot && (
        <div className="boot-overlay" role="status" aria-live="polite" aria-label="Boot sequence">
          <div className="boot-terminal">
            <div className="boot-meta">
              <span>BOOTING...</span>
              <span>{bootProgress}%</span>
            </div>
            <div className="boot-progress-track" aria-hidden="true">
              <div className="boot-progress-fill" style={{ width: `${bootProgress}%` }} />
            </div>
            {bootLines.map((line, idx) => (
              <div key={`${line}-${idx}`} className={`boot-line ${getBootLineClass(line)}`}>
                {line || ' '}
              </div>
            ))}
            <div className={`boot-line ${getBootLineClass(activeLine)}`}>
              {activeLine || ' '}
              <span className="boot-cursor">_</span>
            </div>
            <div className="boot-hint">Press ESC to skip boot</div>
          </div>
        </div>
      )}

      {showWelcome && (
        <div
          className={`welcome-overlay ${welcomeFading ? 'welcome-overlay-fade' : ''}`}
          role="status"
          aria-live="polite"
          aria-label="Welcome message"
        >
          <div className="welcome-box">
            <span className="welcome-text">{welcomeTyped}</span>
            <span className="welcome-cursor">_</span>
            <span className="welcome-sound" aria-hidden="true">
              |||
            </span>
          </div>
        </div>
      )}

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
