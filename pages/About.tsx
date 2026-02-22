import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
        <h2 className="text-4xl font-extrabold text-white mb-6">About Algebra Practice</h2>
        
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p>
            Welcome to <span className="text-indigo-400 font-bold">Algebra Practice</span>, your premier destination for high-quality browser-based entertainment and skill-building games.
          </p>
          
          <p>
            Our mission is to provide a clean, fast, and accessible platform for students and gamers alike. Whether you're looking to test your reflexes in <span className="italic">Tunnel Rush</span>, master the art of the climb in <span className="italic">Getting Over It</span>, or just relax with some <span className="italic">Tiny Fishing</span>, we've got you covered.
          </p>
          
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mt-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <i className="fas fa-star text-yellow-500 mr-2"></i> Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-indigo-500 mt-1 mr-3"></i>
                <span>Curated library of top-tier web games</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-indigo-500 mt-1 mr-3"></i>
                <span>Custom game support via URL or Embed code</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-indigo-500 mt-1 mr-3"></i>
                <span>Local backup and restore functionality</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-indigo-500 mt-1 mr-3"></i>
                <span>Optimized for performance and stealth</span>
              </li>
            </ul>
          </div>
          
          <p className="pt-4">
            We are constantly updating our library with the latest and greatest titles. If you have a suggestion or a game you'd like to see added, feel free to use the "Add Game" feature to customize your own experience!
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500">
            &copy; 2026 Algebra Practice. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
