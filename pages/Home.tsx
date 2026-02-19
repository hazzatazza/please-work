import React, { useState, useMemo } from 'react';
import GameCard from '../components/GameCard';
import GameModal from '../components/GameModal';
import CustomGameForm from '../components/CustomGameForm';
import { Game } from '../types';

// Updated library with the latest requested games and thumbnails
const INITIAL_LIBRARY: Game[] = [
  {
    id: 'om-nom-run',
    title: 'Om Nom Run',
    description: 'Join Om Nom in a fast-paced running adventure! Dodge obstacles, collect coins, and unlock new characters in this colorful endless runner.',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/youtube-playables/main/om-nom-run/index.html',
    isCustom: false
  },
  {
    id: 'amaze',
    title: 'Amaze',
    description: 'A satisfying and colorful puzzle game. Slide the paint ball to fill every corner of the maze with vibrant colors!',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/youtube-playables/main/amaze/index.html',
    isCustom: false
  },
  {
    id: 'going-balls',
    title: 'Going Balls',
    description: 'A fast-paced rolling ball platformer! Navigate through treacherous tracks, collect coins, and reach the finish line in this addictive skill game.',
    thumbnail: 'https://images.unsplash.com/photo-1580234811497-9bd7fd0f56ef?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/youtube-playables/main/going-balls/index.html',
    isCustom: false
  },
  {
    id: 'happy-wheels',
    title: 'Happy Wheels',
    description: 'The ultimate physics-based vehicle game! Navigate through lethal obstacle courses with a variety of unique characters and vehicles. Expect the unexpected!',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/ugs-singlefile/main/UGS-Files/clhappywheels.html',
    isCustom: false
  },
  {
    id: 'paper-io-2-skinless',
    title: 'Paper.io 2 (skinless)',
    description: 'A clean, high-performance version of the territory-capturing classic. Pure gameplay without any extra overhead.',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/chocobananakun/paperio2/main/index.html',
    isCustom: false
  },
  {
    id: 'getting-over-it',
    title: 'Getting Over It (Scratch)',
    description: 'A challenging climb up a mountain of trash in a cauldron. Based on the viral hit, this Scratch version will test your patience and precision to the absolute limit.',
    thumbnail: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/TriangularDev/Getting-Over-It/main/index.html',
    isCustom: false
  },
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    description: 'Fast-paced 3D multiplayer kart battle! Collect power-ups, blast your opponents, and dominate the arena in this action-packed racing game.',
    thumbnail: 'https://images.unsplash.com/photo-1590333746438-d81ff15516b3?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/TheGreatMaximus98/smash-karts/main/index.html',
    isCustom: false
  },
  {
    id: 'paper-io-2',
    title: 'Paper.io 2',
    description: 'Capture as much territory as possible and become the king of the arena! Avoid hitting your own tail and outsmart your opponents.',
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/ubg17/PaperIO2/gh-pages/index.html',
    isCustom: false
  },
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile! A legendary addictive puzzle game where you slide tiles on a 4x4 grid to merge matching values.',
    thumbnail: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/ovolve/2048-AI/master/index.html',
    isCustom: false
  },
  {
    id: 'bowmasters',
    title: 'Bowmasters',
    description: 'A world-famous multiplayer game with bows and arrows. Aim, shoot, and defeat your opponents in this colorful physics-based action game!',
    thumbnail: 'https://images.unsplash.com/photo-1580041065738-e72023758de1?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/THEUNBLOCKMAN/bowmasters/main/index.html',
    isCustom: false
  },
  {
    id: 'soccer-random',
    title: 'Soccer Random',
    description: 'Chaotic physics-based soccer! Score goals with unpredictable players and wacky conditions in this fun two-button game.',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/Unblocked-Games-786/Soccer-Random/gh-pages/index.html',
    isCustom: false
  },
  {
    id: 'fruit-ninja',
    title: 'Fruit Ninja',
    description: 'Slice and dice your way to glory! Test your reflexes in this juicy arcade classic. Just watch out for the bombs!',
    thumbnail: 'https://images.unsplash.com/photo-1550258114-68bb098a514d?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/genizy/UGS-Assets/main/fruit%20ninja/index.html',
    isCustom: false
  },
  {
    id: 'sling-drift',
    title: 'Sling Drift',
    description: 'Master the art of drifting in this minimalist high-score chaser. Hook onto points and swing through turns!',
    thumbnail: 'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/ovo-gamez-unblocked/sling-drift/main/index.html',
    isCustom: false
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    description: 'Dash as fast as you can! Dodge the oncoming trains and help Jake escape the grumpy Inspector.',
    thumbnail: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/3kh0-assets/fixy/subway-surfers/index.html',
    isCustom: false
  },
  {
    id: '3dash',
    title: '3Dash',
    description: 'A unique 3D rhythm-based platformer. Jump and fly through geometry in a three-dimensional world.',
    thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/ugs-singlefile/main/UGS-Files/cl3dasheditor.html',
    isCustom: false
  },
  {
    id: 'eaglercraft',
    title: 'Eaglercraft (Minecraft)',
    description: 'Classic block-building sandbox experience. Explore, build, and survive in Minecraft 1.12.2.',
    thumbnail: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/XxFluffyAsherxX/Eaglercraft-1.12.2/main/Web/index.html',
    isCustom: false
  },
  {
    id: 'bitlife',
    title: 'BitLife',
    description: 'How will you live your BitLife? Will you make all the right choices in an attempt to become a model citizen?',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvzPoDAVibpJoEiTm1oiu2WBPXbMwcDaXLlw&s',
    url: 'https://raw.githack.com/hazzatazza/bitlife/main/index.html',
    isCustom: false
  },
  {
    id: 'tap-road',
    title: 'Tap Road',
    description: 'Keep the ball on the road by tapping at the right moments in this high-speed skill game.',
    thumbnail: 'https://images.unsplash.com/photo-1469033011854-39415efe22bd?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/faralong/all/main/taproad/index.html',
    isCustom: false
  },
  {
    id: 'level-devil',
    title: 'Level Devil',
    description: 'A platformer that tries to trick you at every turn. Expect the unexpected!',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHbBLx9jLLpJS0RkLK5SdMHS7xtHH9jxOLw&s',
    url: 'https://raw.githack.com/hazzatazza/level-devil/master/index.html',
    isCustom: false
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    description: 'Navigate through the pipes and try to beat your high score in this addictive classic.',
    thumbnail: 'https://archive.org/download/com.dotgears.flappybird/icon.jpg',
    url: 'https://s3-eu-west-1.amazonaws.com/apps.playcanvas.com/a15aec72/index.html',
    isCustom: false
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    description: 'Bake endless cookies and upgrade your production in the ultimate clicking game.',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEvJAum3u_ifqBOYoS0wgYwZYiA9nsBhI9Q&s',
    url: 'https://cookieclickeralgebra.pages.dev',
    isCustom: false
  },
  {
    id: 'geometry-dash-lite',
    title: 'Geometry Dash Lite',
    description: 'Jump, fly and flip your way through dangerous passages and spiky obstacles.',
    thumbnail: 'https://cdn.aptoide.com/imgs/e/6/c/e6cff1f59365aeec06a96b943f9eb3c1_fgraphic.png',
    url: 'https://raw.githack.com/threekho/gdl/main/index.html',
    isCustom: false
  },
  {
    id: 'tunnel-rush',
    title: 'Tunnel Rush',
    description: 'Test your reflexes in this fast-paced 3D tunnel runner. Speed through obstacles and stay focused!',
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13q6aHn1f3Dd4U3w_mjs8NOot8U2bV0M8ZA&s',
    url: 'https://raw.githack.com/hazzatazza/3kh0-assets/fixy/tunnel-rush/index.html',
    isCustom: false
  },
  {
    id: 'tiny-fishing',
    title: 'Tiny Fishing',
    description: 'Catch rare fish and upgrade your equipment in this relaxing fishing simulator. How deep can you go?',
    thumbnail: 'https://www.coolmathgames.com/sites/default/files/TinyFishing_OG-logo.jpg',
    url: 'https://raw.githack.com/hazzatazza/3kh0-assets/fixy/tiny-fishing/index.html',
    isCustom: false
  },
  {
    id: 'snow-rider-3d',
    title: 'Snow Rider 3D',
    description: 'Race down snowy mountains and collect gifts in this exhilarating 3D sledding game.',
    thumbnail: 'https://images.unsplash.com/photo-1517176118179-65244ad0e59a?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/Snow-Rider3D/main/index.html',
    isCustom: false
  },
  {
    id: 'tap-tap-shots',
    title: 'Tap Tap Shots',
    description: 'Keep the ball moving and score as many baskets as you can in this addictive basketball game.',
    thumbnail: 'https://images.unsplash.com/photo-1519861531473-9200362349c4?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://taptapshots.pages.dev/',
    isCustom: false
  },
  {
    id: 'stickman-hook',
    title: 'Stickman Hook',
    description: 'Swing, jump, and fly through levels as a ninja stickman in this physics-based arcade game.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252728f?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/google-class/main/stickman-hook/index.html',
    isCustom: false
  },
  {
    id: 'drift-boss',
    title: 'Drift Boss',
    description: 'Master the art of drifting on tricky tracks. Stay on the road and timing is everything!',
    thumbnail: 'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/ubg98/DriftBoss/gh-pages/index.html',
    isCustom: false
  },
  {
    id: 'dadish',
    title: 'Dadish',
    description: 'He’s a dad, and a radish. Rescue your kids from the kitchen in this charming platformer.',
    thumbnail: 'https://images.unsplash.com/photo-1590233065611-3965942f7902?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/Graysinl/dadish/main/index.html',
    isCustom: false
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    description: 'Perform insane stunts and race through dangerous obstacles in this ultimate bike racing game.',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/gameshaxor/MotoX3M/master/index.html',
    isCustom: false
  },
  {
    id: 'wordle',
    title: 'Wordle',
    description: 'Guess the hidden word in 6 tries. A daily logic and vocabulary challenge with infinite play mode.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/3kh0-assets/fixy/wordle/index.html#infinite',
    isCustom: false
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    description: 'Funny and chaotic physics-based basketball. Score points with unpredictable movements and wacky players!',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/gjhacked/basket-random/main/index.html',
    isCustom: false
  },
  {
    id: 'powerline-io',
    title: 'Powerline.io',
    description: 'Grow your neon snake by consuming energy and outmaneuvering rivals in this fast-paced multiplayer arena.',
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://powerline.coolmathgames.com/',
    isCustom: false
  },
  {
    id: 'rocketgoal-io',
    title: 'Rocketgoal.io',
    description: 'Intense vehicular soccer action! Drive, boost, and score against opponents in this high-energy sports game.',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/will-k16/rocketgoal/main/rocketgoal.io/index.html',
    isCustom: false
  },
  {
    id: 'short-life',
    title: 'Short Life',
    description: 'Survive a series of deadly obstacles in this unique physics-based platformer.',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://shortlife1.pages.dev/',
    isCustom: false
  },
  {
    id: 'poly-track',
    title: 'Poly Track',
    description: 'Race against the clock on low-poly tracks. Speed and precision are key.',
    thumbnail: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://polytrack-3.pages.dev/',
    isCustom: false
  },
  {
    id: 'crossy-road',
    title: 'Crossy Road',
    description: 'Why did the chicken cross the road? Find out in this endless arcade hopper.',
    thumbnail: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/youtube-playables/main/crossy-road/index.html',
    isCustom: false
  },
  {
    id: 'wheelie-bike',
    title: 'Wheelie Bike',
    description: 'Keep the front wheel off the ground for as long as possible in this challenging bike balance game.',
    thumbnail: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&h=225&auto=format&fit=crop',
    embedCode: '<iframe src="https://wheeliebike-9l9.pages.dev/" sandbox="allow-scripts allow-same-origin allow-forms" style="width:100%; height:100%; border:none;"></iframe>',
    isCustom: false
  },
  {
    id: 'bouncemasters',
    title: 'Bouncemasters',
    description: 'Bounce the penguin as far as you can in this fun and addictive action game.',
    thumbnail: 'https://images.unsplash.com/photo-1517030330234-94c4fa948ebc?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/youtube-playables/main/bouncemasters/index.html',
    isCustom: false
  },
  {
    id: 'jetpack-joyride',
    title: 'Jetpack Joyride',
    description: 'Bullet-powered jetpacks! Giant mechanical dragons! Birds that shoot money! Suit up with the coolest jetpacks ever made.',
    thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/genizy/ugs-files/main/cljetpackjoyride.html',
    isCustom: false
  },
  {
    id: 'escape-road',
    title: 'Escape Road',
    description: 'Outrun the police in this high-speed car chase survival game. Drive fast and don\'t get caught!',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/genizy/ugs-files/main/clescaperoad.html',
    isCustom: false
  },
  {
    id: 'tomb-of-mask',
    title: 'Tomb of the Mask',
    description: 'Enter a vertical labyrinth filled with traps and power-ups in this fast-paced action game.',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/water-logger/totm/main/index.html',
    isCustom: false
  },
  {
    id: 'run-3',
    title: 'Run 3',
    description: 'Run, jump, and skate through a series of challenging tunnels in deep space.',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://run3algebra.pages.dev/',
    isCustom: false
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'Control a ball as it speeds down a steep slope. Avoid obstacles and don\'t fall off!',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://sl0pe.pages.dev/',
    isCustom: false
  }
];

interface HomeProps {
  customGames: Game[];
  onAddGame: (game: Game) => void;
  onDeleteGame: (id: string) => void;
  onRestore: (games: Game[]) => void;
}

const Home: React.FC<HomeProps> = ({ customGames, onAddGame, onDeleteGame, onRestore }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allGames = useMemo(() => {
    return [...INITIAL_LIBRARY, ...customGames];
  }, [customGames]);

  const filteredGames = useMemo(() => {
    return allGames.filter(g => 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allGames, searchQuery]);

  const handleDownloadBackup = () => {
    const dataStr = JSON.stringify(customGames, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'algebra_practice_backup.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleUploadBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = event.target.files;
    if (!files || files.length === 0) return;

    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = (e) => {
      try {
        const content = e.target?.result;
        if (typeof content === 'string') {
          const games = JSON.parse(content);
          if (Array.isArray(games)) {
            onRestore(games);
            alert(`Successfully restored ${games.length} games!`);
          } else {
            alert("Invalid backup file format.");
          }
        }
      } catch (err) {
        alert("Error reading file. Make sure it is a valid JSON backup.");
      }
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero / Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-6 md:space-y-0">
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-2 flex items-center">
            Game Library
          </h2>
          <p className="text-slate-400">Your personal space for practice and entertainment.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center transition-all shadow-lg shadow-indigo-600/20"
          >
            <i className="fas fa-plus mr-2"></i> Add Game
          </button>
          
          <div className="relative group">
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-xl font-bold flex items-center transition-all">
              <i className="fas fa-save mr-2"></i> Backup
            </button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-slate-800 border border-slate-700 rounded-xl p-2 w-48 shadow-2xl z-10">
              <button 
                onClick={handleDownloadBackup}
                className="w-full text-left p-2 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors text-sm text-slate-300 mb-1"
              >
                <i className="fas fa-download mr-2"></i> Download JSON
              </button>
              <label className="w-full text-left p-2 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors text-sm text-slate-300 cursor-pointer block">
                <i className="fas fa-upload mr-2"></i> Upload Backup
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".json"
                  onChange={handleUploadBackup}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-12 relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
          <i className="fas fa-search"></i>
        </div>
        <input 
          type="text" 
          placeholder="Search for games..."
          className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all backdrop-blur-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              onClick={setSelectedGame}
              onDelete={game.isCustom ? onDeleteGame : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl">
          <div className="text-slate-600 text-6xl mb-6">
            <i className="fas fa-ghost"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-400 mb-2">No games found</h3>
          <p className="text-slate-500">Try adjusting your search or add a new game.</p>
        </div>
      )}

      {/* Modals */}
      {selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}

      {showAddForm && (
        <CustomGameForm 
          onAdd={onAddGame}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Home;