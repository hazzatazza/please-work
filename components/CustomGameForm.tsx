
import React, { useState } from 'react';
import { Game } from '../types';

interface CustomGameFormProps {
  onAdd: (game: Game) => void;
  onClose: () => void;
}

const CustomGameForm: React.FC<CustomGameFormProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [type, setType] = useState<'url' | 'embed'>('url');
  const [source, setSource] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !source) return;

    const newGame: Game = {
      id: Date.now().toString(),
      title,
      description,
      thumbnail: thumbnail || `https://picsum.photos/seed/${Date.now()}/400/225`,
      url: type === 'url' ? source : undefined,
      embedCode: type === 'embed' ? source : undefined,
      isCustom: true
    };

    onAdd(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Add Custom Game</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-slate-400 text-sm font-medium mb-1">Game Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Epic Game Name"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-1">Thumbnail Image URL</label>
            <input 
              type="url" 
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-1">Game Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none h-20"
              placeholder="What is this game about?"
            />
          </div>

          <div className="flex space-x-4">
            <button 
              type="button"
              onClick={() => setType('url')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'url' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              Use URL
            </button>
            <button 
              type="button"
              onClick={() => setType('embed')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'embed' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              Use Embed Code
            </button>
          </div>

          <div>
            <label className="block text-slate-400 text-sm font-medium mb-1">
              {type === 'url' ? 'Game URL' : 'Embed HTML'}
            </label>
            <textarea 
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none h-24 font-mono text-xs"
              placeholder={type === 'url' ? 'https://poki.com/game/xyz' : '<iframe src="..."></iframe>'}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-500/20 mt-2"
          >
            Add Game to Library
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomGameForm;
