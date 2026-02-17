
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { Game } from './types';

const App: React.FC = () => {
  const [customGames, setCustomGames] = useState<Game[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('algebra_practice_custom_games');
    if (saved) {
      try {
        setCustomGames(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved games", e);
      }
    }
  }, []);

  const saveGames = (games: Game[]) => {
    setCustomGames(games);
    localStorage.setItem('algebra_practice_custom_games', JSON.stringify(games));
  };

  const addGame = (game: Game) => {
    saveGames([...customGames, game]);
  };

  const deleteGame = (id: string) => {
    saveGames(customGames.filter(g => g.id !== id));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                <i className="fas fa-calculator text-white"></i>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Algebra <span className="text-indigo-400">Practice</span>
              </h1>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-slate-300 hover:text-white transition-colors">Library</Link>
              <Link to="/about" className="text-slate-300 hover:text-white transition-colors">Info</Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  customGames={customGames} 
                  onAddGame={addGame} 
                  onDeleteGame={deleteGame} 
                  onRestore={(games) => saveGames(games)}
                />
              } 
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-6 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2025 Algebra Practice</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
