
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
  onDelete?: (id: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, onDelete }) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden group hover:ring-2 hover:ring-indigo-500 transition-all duration-300 shadow-lg cursor-pointer flex flex-col">
      <div 
        className="relative aspect-video overflow-hidden"
        onClick={() => onClick(game)}
      >
        <img 
          src={game.thumbnail || `https://picsum.photos/seed/${game.id}/400/225`} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-3 left-3 flex space-x-2">
           {game.isCustom && (
             <span className="px-2 py-0.5 bg-indigo-600 text-[10px] font-bold uppercase rounded text-white shadow">Custom</span>
           )}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-white mb-1 leading-tight group-hover:text-indigo-400 transition-colors">
            {game.title}
          </h3>
          {game.isCustom && onDelete && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(game.id);
              }}
              className="text-slate-500 hover:text-red-500 transition-colors p-1"
              title="Remove game"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          )}
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 mt-auto">
          {game.description || "Jump in and start playing this exciting game."}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
