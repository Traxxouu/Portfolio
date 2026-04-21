'use client';

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { getTerminalStatus, type TerminalStatus } from '@/lib/sanity.client';

interface TerminalLine {
  type: 'input' | 'output' | 'info' | 'success' | 'error' | 'file' | 'blank';
  text: string;
}

const BUILTIN_COMMANDS: Record<string, { description: string }> = {
  help: { description: 'Affiche les commandes disponibles' },
  clear: { description: 'Efface le terminal' },
  date: { description: 'Affiche la date actuelle' },
  ls: { description: 'Liste les fichiers du répertoire' },
  pwd: { description: 'Affiche le répertoire courant' },
  whoami: { description: 'Qui suis-je ?' },
  cat: { description: 'Affiche le contenu d\'un fichier' },
  exit: { description: 'Ferme le terminal' },
};

export function TerminalButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le terminal"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 
          p-3 sm:p-3.5 rounded-2xl backdrop-blur-xl border-2 
          transition-all duration-300 hover:scale-110 active:scale-95 
          touch-manipulation group
          bg-slate-900/80 border-green-500/40 hover:border-green-400/60 
          shadow-lg shadow-green-500/10 hover:shadow-green-500/30"
      >
        <TerminalIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 group-hover:text-green-300" />
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 animate-pulse border-2 border-slate-900" />
      </button>

      {isOpen && <TerminalWindow onClose={() => setIsOpen(false)} />}
    </>
  );
}

// Fonction d'animation séparée du composant React
async function runIntroAnimation(
  statusData: TerminalStatus | null,
  setLines: React.Dispatch<React.SetStateAction<TerminalLine[]>>,
  setPhase: React.Dispatch<React.SetStateAction<'intro' | 'interactive'>>,
  cancelled: { current: boolean },
  scrollFn: () => void,
) {
  const serverName = statusData?.serverName || 'maelserver';
  const fileName = statusData?.fileName || 'status.txt';
  const lastUpdate = statusData?.lastUpdate
    ? new Date(statusData.lastUpdate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  const contentLines = statusData?.content
    ? statusData.content.split('\n')
    : [
        `Dernière mise à jour : ${lastUpdate}`,
        '',
        '✅ Aucune info configurée dans Sanity.',
        '💡 Va dans le studio pour ajouter du contenu.',
        '',
        '— Maël Barbe',
      ];

  const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

  const push = (line: TerminalLine) => {
    if (cancelled.current) return;
    setLines(prev => [...prev, line]);
    scrollFn();
  };

  const typeCmd = async (command: string) => {
    if (cancelled.current) return;
    // Ajouter prompt vide
    setLines(prev => [...prev, { type: 'input' as const, text: '' }]);
    scrollFn();

    for (let i = 0; i < command.length; i++) {
      if (cancelled.current) return;
      await wait(25 + Math.random() * 45);
      if (cancelled.current) return;
      const partial = command.slice(0, i + 1);
      setLines(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { type: 'input', text: partial };
        return copy;
      });
      scrollFn();
    }
    await wait(350);
  };

  // --- Séquence ---
  await wait(300);
  if (cancelled.current) return;

  push({ type: 'info', text: `Connexion à ${serverName}.local...` });
  await wait(600);
  if (cancelled.current) return;

  push({ type: 'success', text: `Connecté à ${serverName}.local` });
  await wait(300);
  if (cancelled.current) return;

  push({ type: 'blank', text: '' });

  // ls
  await typeCmd('ls -la');
  if (cancelled.current) return;
  push({ type: 'output', text: 'total 1' });
  push({ type: 'output', text: `drwxr-xr-x  2 mael mael 4096  ${lastUpdate}  .` });
  push({ type: 'output', text: `-rw-r--r--  1 mael mael  512  ${lastUpdate}  ${fileName}` });
  await wait(400);
  if (cancelled.current) return;

  // cat
  await typeCmd(`cat ${fileName}`);
  if (cancelled.current) return;
  await wait(100);
  push({ type: 'output', text: '─'.repeat(45) });

  for (const line of contentLines) {
    if (cancelled.current) return;
    push({ type: 'file', text: line });
    await wait(100);
  }

  push({ type: 'output', text: '─'.repeat(45) });
  await wait(400);
  if (cancelled.current) return;

  push({ type: 'blank', text: '' });
  push({ type: 'info', text: '💡 Terminal interactif — tape "help" pour voir les commandes.' });
  push({ type: 'blank', text: '' });

  if (!cancelled.current) {
    setPhase('interactive');
  }
}

function TerminalWindow({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [phase, setPhase] = useState<'intro' | 'interactive'>('intro');
  const [statusData, setStatusData] = useState<TerminalStatus | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 10);
  }, []);

  // Charger Sanity + lancer l'animation
  useEffect(() => {
    const cancelled = { current: false };

    getTerminalStatus()
      .then(data => {
        if (!cancelled.current) {
          setStatusData(data);
          runIntroAnimation(data, setLines, setPhase, cancelled, () => {
            setTimeout(() => {
              if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
              }
            }, 10);
          });
        }
      })
      .catch(() => {
        if (!cancelled.current) {
          runIntroAnimation(null, setLines, setPhase, cancelled, () => {
            setTimeout(() => {
              if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
              }
            }, 10);
          });
        }
      });

    return () => { cancelled.current = true; };
  }, []);

  // Focus input quand on passe en interactif
  useEffect(() => {
    if (phase === 'interactive') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase]);

  const serverName = statusData?.serverName || 'maelserver';
  const fileName = statusData?.fileName || 'status.txt';
  const lastUpdate = statusData?.lastUpdate
    ? new Date(statusData.lastUpdate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  const sanityCommands = statusData?.commands || [];

  const focusInput = useCallback(() => {
    if (phase === 'interactive') inputRef.current?.focus();
  }, [phase]);

  const executeCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    const newLines: TerminalLine[] = [{ type: 'input', text: trimmed }];

    if (!trimmed) {
      setLines(prev => [...prev, ...newLines]);
      scrollToBottom();
      return;
    }

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    switch (cmd) {
      case 'help': {
        newLines.push({ type: 'blank', text: '' });
        newLines.push({ type: 'info', text: '╔══════════════════════════════════════════╗' });
        newLines.push({ type: 'info', text: '║         COMMANDES DISPONIBLES            ║' });
        newLines.push({ type: 'info', text: '╚══════════════════════════════════════════╝' });
        newLines.push({ type: 'blank', text: '' });
        Object.entries(BUILTIN_COMMANDS).forEach(([name, { description }]) => {
          newLines.push({ type: 'output', text: `  ${name.padEnd(14)} ${description}` });
        });
        newLines.push({ type: 'output', text: `  ${'neofetch'.padEnd(14)} Infos système` });
        if (sanityCommands.length > 0) {
          newLines.push({ type: 'blank', text: '' });
          newLines.push({ type: 'success', text: '── Commandes personnalisées ──' });
          sanityCommands.forEach(c => {
            newLines.push({ type: 'output', text: `  ${c.name.padEnd(14)} ${c.description}` });
          });
        }
        newLines.push({ type: 'blank', text: '' });
        break;
      }
      case 'clear': {
        setLines([]);
        setInputValue('');
        scrollToBottom();
        return;
      }
      case 'date': {
        const now = new Date();
        newLines.push({ type: 'output', text: now.toLocaleString('fr-FR', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        })});
        break;
      }
      case 'ls': {
        newLines.push({ type: 'output', text: 'total 1' });
        newLines.push({ type: 'output', text: `-rw-r--r--  1 mael mael  512  ${lastUpdate}  ${fileName}` });
        break;
      }
      case 'pwd': {
        newLines.push({ type: 'output', text: '/home/mael' });
        break;
      }
      case 'whoami': {
        newLines.push({ type: 'output', text: 'mael' });
        break;
      }
      case 'cat': {
        const target = args[0];
        if (!target) {
          newLines.push({ type: 'error', text: 'cat: argument manquant. Usage: cat <fichier>' });
        } else if (target === fileName) {
          newLines.push({ type: 'output', text: '─'.repeat(45) });
          const cl = statusData?.content
            ? statusData.content.split('\n')
            : [`Dernière mise à jour : ${lastUpdate}`, '', '— Maël Barbe'];
          cl.forEach(line => newLines.push({ type: 'file', text: line }));
          newLines.push({ type: 'output', text: '─'.repeat(45) });
        } else {
          newLines.push({ type: 'error', text: `cat: ${target}: Aucun fichier ou dossier de ce type` });
        }
        break;
      }
      case 'exit': {
        newLines.push({ type: 'info', text: `Déconnecté de ${serverName}.local` });
        setLines(prev => [...prev, ...newLines]);
        scrollToBottom();
        setTimeout(onClose, 800);
        return;
      }
      case 'cd': case 'rm': case 'rmdir': case 'mkdir': case 'touch': case 'mv': case 'cp': {
        newLines.push({ type: 'error', text: `bash: ${cmd}: permission denied (read-only filesystem)` });
        break;
      }
      case 'sudo': {
        newLines.push({ type: 'error', text: `Nice try 😏 — tu n'es pas root ici.` });
        break;
      }
      case 'neofetch': {
        newLines.push({ type: 'info',    text: '        .--.         ' });
        newLines.push({ type: 'info',    text: '       |o_o |        mael@' + serverName });
        newLines.push({ type: 'info',    text: '       |:_/ |        ─────────────────' });
        newLines.push({ type: 'output',  text: '      //   \\ \\       OS: MaëlOS 2026 LTS' });
        newLines.push({ type: 'output',  text: '     (|     | )      Host: Portfolio v3.0' });
        newLines.push({ type: 'output',  text: '    /\\_)   (_/\\      Kernel: Next.js 16' });
        newLines.push({ type: 'success', text: '    \\___)=(___/      Shell: React 19' });
        newLines.push({ type: 'file',    text: '                     Stack: TypeScript, Tailwind' });
        newLines.push({ type: 'file',    text: '                     Uptime: ∞' });
        break;
      }
      default: {
        const sc = sanityCommands.find(c => c.name.toLowerCase() === cmd);
        if (sc) {
          sc.output.split('\n').forEach(line => newLines.push({ type: 'file', text: line }));
        } else {
          newLines.push({ type: 'error', text: `bash: ${cmd}: commande introuvable. Tape "help" pour la liste.` });
        }
        break;
      }
    }

    setLines(prev => [...prev, ...newLines]);
    scrollToBottom();
  }, [statusData, sanityCommands, serverName, fileName, lastUpdate, onClose, scrollToBottom]);

  const handleTabComplete = useCallback(() => {
    if (!inputValue) return;
    const allCmds = [...Object.keys(BUILTIN_COMMANDS), ...sanityCommands.map(c => c.name.toLowerCase()), 'neofetch', 'sudo'];
    const parts = inputValue.split(/\s+/);
    const last = parts[parts.length - 1].toLowerCase();
    if (parts.length === 1) {
      const m = allCmds.filter(c => c.startsWith(last));
      if (m.length === 1) setInputValue(m[0]);
      else if (m.length > 1) {
        setLines(prev => [...prev, { type: 'input', text: inputValue }, { type: 'output', text: m.join('  ') }]);
        scrollToBottom();
      }
    } else if (parts[0] === 'cat' && fileName.startsWith(last)) {
      parts[parts.length - 1] = fileName;
      setInputValue(parts.join(' '));
    }
  }, [inputValue, sanityCommands, fileName, scrollToBottom]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { executeCommand(inputValue); setInputValue(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const ni = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(ni); setInputValue(commandHistory[ni]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const ni = historyIndex + 1;
        if (ni >= commandHistory.length) { setHistoryIndex(-1); setInputValue(''); }
        else { setHistoryIndex(ni); setInputValue(commandHistory[ni]); }
      }
    } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); setLines([]); }
    else if (e.key === 'c' && e.ctrlKey) { e.preventDefault(); setLines(prev => [...prev, { type: 'input', text: inputValue + '^C' }]); setInputValue(''); }
    else if (e.key === 'Tab') { e.preventDefault(); handleTabComplete(); }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full sm:max-w-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 rounded-t-none sm:rounded-t-2xl border border-b-0 border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-gray-400 ml-2 font-mono">mael@{serverName} ~</span>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors sm:hidden">
            <X size={16} />
          </button>
        </div>

        <div
          ref={terminalRef}
          onClick={focusInput}
          className="bg-slate-950/98 backdrop-blur-xl border border-t-0 border-slate-700/50 
            rounded-b-none sm:rounded-b-2xl p-4 sm:p-5 
            h-[70vh] sm:h-[55vh] overflow-y-auto
            font-mono text-xs sm:text-sm leading-relaxed
            cursor-text select-text"
        >
          {lines.map((line, i) => (
            <div key={i} className="min-h-[1.4em]">
              {line.type === 'input' && (
                <div className="flex flex-wrap">
                  <span className="text-green-400 mr-1">mael@{serverName}</span>
                  <span className="text-blue-400 mr-1">~</span>
                  <span className="text-white mr-1">$</span>
                  <span className="text-gray-100">{line.text}</span>
                </div>
              )}
              {line.type === 'output' && <span className="text-gray-400 whitespace-pre">{line.text}</span>}
              {line.type === 'info' && <span className="text-yellow-400">{line.text}</span>}
              {line.type === 'success' && <span className="text-green-400">{line.text}</span>}
              {line.type === 'error' && <span className="text-red-400">{line.text}</span>}
              {line.type === 'file' && <span className="text-cyan-300">{line.text}</span>}
              {line.type === 'blank' && <br />}
            </div>
          ))}

          {phase === 'intro' && (
            <div className="flex flex-wrap items-center">
              <span className="text-green-400 mr-1">mael@{serverName}</span>
              <span className="text-blue-400 mr-1">~</span>
              <span className="text-white mr-1">$</span>
              <span className="text-green-400 animate-pulse">▊</span>
            </div>
          )}

          {phase === 'interactive' && (
            <div className="flex flex-wrap items-center">
              <span className="text-green-400 mr-1">mael@{serverName}</span>
              <span className="text-blue-400 mr-1">~</span>
              <span className="text-white mr-1">$</span>
              <div className="relative flex-1 min-w-[80px]">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-gray-100 outline-none border-none font-mono text-xs sm:text-sm caret-green-400"
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
