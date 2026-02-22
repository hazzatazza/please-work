
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import { Game } from './types';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-800 py-4 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 overflow-hidden rounded-lg bg-slate-800 flex items-center justify-center p-1 group-hover:scale-110 transition-transform">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/0/01/El_Sato_Tux_The_penguin_in_sonic_style.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
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
              element={<Home />} 
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800 py-8 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-4 md:mb-0">
              <p>&copy; 2026 Algebra Practice</p>
              <a 
                href="https://sites.google.com/view/unblocked-six-seven" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold flex items-center space-x-2 mt-2 md:mt-0"
              >
                <i className="fab fa-google"></i>
                <span>The OG Google Site</span>
              </a>
            </div>
            <div className="flex space-x-6">
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