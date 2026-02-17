
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <div className="inline-block p-4 rounded-full bg-indigo-600/10 text-indigo-400 mb-8">
        <i className="fas fa-info-circle text-4xl"></i>
      </div>
      <h2 className="text-5xl font-black text-white mb-6">About</h2>
      <div className="space-y-8 text-slate-300 text-lg leading-relaxed">
        <div className="p-8 bg-slate-800/50 rounded-3xl border border-slate-700 shadow-xl">
          <p className="font-medium text-white text-2xl mb-2">created by hazza 2026</p>
          <div className="h-px bg-slate-700 w-full my-4"></div>
          <p className="text-indigo-400 font-bold tracking-widest uppercase text-sm">Algebra Practice &copy;</p>
        </div>
        
        <p className="text-slate-400 italic">
          "i dont even know how to make this stuff ai did it for me hope it works at school"
        </p>

        <div className="pt-12 text-left bg-slate-900 p-8 rounded-3xl border border-indigo-500/20">
          <h3 className="text-white font-bold text-xl mb-4">Features Overview:</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
              <span><strong>Stealth Mode:</strong> Open games in an about:blank tab with a decoy title to keep your browsing private.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
              <span><strong>Custom Library:</strong> Embed any game from the web using URLs or iFrame code.</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-3 mt-1"><i className="fas fa-check-circle"></i></span>
              <span><strong>Backup System:</strong> Download your custom library as a JSON file and restore it on any device.</span>
            </li>
          </ul>
        </div>

        {/* New deployment help section */}
        <div className="pt-12 text-left bg-indigo-900/20 p-8 rounded-3xl border border-indigo-500/30">
          <h3 className="text-white font-bold text-xl mb-2">Deployment Guide</h3>
          <p className="text-sm text-slate-400 mb-4">If you see a blank screen on GitHub, it's not an API key problem! It's just a hosting setting.</p>
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-xl">
              <p className="text-indigo-400 font-bold text-sm uppercase mb-1">The Simple Way (Recommended)</p>
              <p className="text-sm">Use <strong>Vercel.com</strong> or <strong>Netlify.com</strong>. Connect your GitHub and click "Deploy". They handle the complicated build stuff automatically.</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl">
              <p className="text-indigo-400 font-bold text-sm uppercase mb-1">The "API Key" Mystery</p>
              <p className="text-sm">You don't need one! This site uses standard web tools (iframes) to show games. You only need a Gemini key if you were making an AI chatbot.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
