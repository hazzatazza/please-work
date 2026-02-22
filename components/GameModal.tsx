
import React, { useEffect, useRef } from 'react';
import { Game } from '../types';

interface GameModalProps {
  game: Game;
  onClose: () => void;
}

const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const openInNewTab = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert("Popup blocked! Please allow popups to open games in a stealth tab.");
      return;
    }

    const content = game.embedCode || `<iframe src="${game.url}" style="width:100%; height:100%; border:none;"></iframe>`;
    
    win.document.title = 'Home | Compass';
    win.document.body.style.margin = '0';
    win.document.body.style.padding = '0';
    win.document.body.style.height = '100vh';
    win.document.body.style.backgroundColor = '#000';
    win.document.body.innerHTML = `
      <div style="width:100%; height:100%; display:flex; flex-direction:column;">
        ${content}
      </div>
    `;
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 w-full max-w-6xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-800">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-white">{game.title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={openInNewTab}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              title="Open in Stealth Tab"
            >
              <i className="fas fa-external-link-alt"></i>
            </button>
            <button 
              onClick={handleFullscreen}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              title="Fullscreen"
            >
              <i className="fas fa-expand"></i>
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-800 rounded-lg transition-all"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div ref={containerRef} className="flex-grow bg-black relative">
          {game.embedCode ? (
            <div 
              className="w-full h-full flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: game.embedCode }}
            />
          ) : game.noSandbox ? (
            <iframe 
              src={game.url} 
              className="w-full h-full border-none"
            ></iframe>
          ) : (
            <iframe 
              src={game.url} 
              className="w-full h-full border-none"
              title={game.title}
              allow="fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
            ></iframe>
          )}
        </div>

        {/* Info Area */}
        <div className="p-6 bg-slate-900/80">
          <h3 className="text-slate-200 font-semibold mb-2">Description</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
            {game.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
