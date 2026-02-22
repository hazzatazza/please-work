import React, { useState, useMemo } from 'react';
import GameCard from '../components/GameCard';
import GameModal from '../components/GameModal';
import { Game } from '../types';

// Updated library with the latest requested games and thumbnails
const INITIAL_LIBRARY: Game[] = [
  {
    id: 'friday-night-funkin',
    title: 'Friday Night Funkin',
    description: 'A rhythm-based music game where you compete in freestyle music battles. Press the arrow keys in time with the music to out-sing your opponents!',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/genizy/ugs-files/main/clfridaynightfunkin.html',
    isCustom: false
  },
  {
    id: 'algebra-movies-tv',
    title: 'Algebra Movies and TV',
    description: 'An interactive algebra-themed experience. Explore mathematical concepts through a unique media-style interface.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/harrys-school-project/main/index.html',
    isCustom: false,
    noSandbox: true
  },
  {
    id: 'flappy-dunk',
    title: 'Flappy Dunk',
    description: 'A fun mashup of basketball and flapping! Tap to flap your basketball and guide it through as many hoops as possible. How high can you score?',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/youtube-playables/main/flappy%20dunk/index.html',
    isCustom: false
  },
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
    id: 'getting-over-it-full',
    title: 'Getting Over It with Bennett Foddy',
    description: 'The full web-port of the infamous climbing game. A game I made for a certain kind of person. To hurt them.',
    thumbnail: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/genizy/web-port/main/getting-over-it/index.html',
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
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/tunnelrush.html',
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
    id: 'short-ride',
    title: 'Short Ride',
    description: 'Avoid deadly traps and navigate through dangerous levels in this physics-based survival game. Can you make it to the end in one piece?',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/hazzatazza/short-ridegood/main/index.html',
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
    id: 'poly-track-52',
    title: 'Poly Track .5.2',
    description: 'Race against the clock on low-poly tracks. Speed and precision are key. Version .5.2 with new features.',
    thumbnail: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/polytrack.html',
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
  },
  {
    id: 'block-blast',
    title: 'Block Blast',
    description: 'A colorful and addictive block puzzle game. Match blocks to clear lines and reach high scores!',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252728f?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/reunbozdo/BlockBlast/main/index.html',
    isCustom: false
  },
  {
    id: 'boxing-random',
    title: 'Boxing Random',
    description: 'Wacky physics-based boxing! Fight with unpredictable movements and try to knock out your opponent.',
    thumbnail: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/Unblocked-Games-786/Boxing-Random/gh-pages/index.html',
    isCustom: false
  },
  {
    id: 'candy-crush',
    title: 'Candy Crush',
    description: 'The legendary match-3 puzzle game. Swap and match candies to progress through hundreds of levels!',
    thumbnail: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/candycrush.html',
    isCustom: false
  },
  {
    id: 'among-us',
    title: 'Among Us',
    description: 'Play Among Us directly in your browser! Find the impostor or complete your tasks to win.',
    thumbnail: 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/amongus.html',
    isCustom: false
  },
  {
    id: 'angry-birds',
    title: 'Angry Birds',
    description: 'The classic bird-slinging game. Use unique powers to destroy the greedy pigs\' defenses!',
    thumbnail: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/angrybirds.html',
    isCustom: false
  },
  {
    id: 'cut-the-rope',
    title: 'Cut the Rope',
    description: 'Feed Om Nom with candy! Cut the ropes and use physics to guide the treat into his mouth.',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/cuttherope.html',
    isCustom: false
  },
  {
    id: 'google-dino',
    title: 'Google Dinosaur Game',
    description: 'The famous "No Internet" dinosaur game. Jump over cacti and dodge pterodactyls!',
    thumbnail: 'https://images.unsplash.com/photo-1525824236856-8d0431def3ab?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/googledino.html',
    isCustom: false
  },
  {
    id: 'helix-jump',
    title: 'Helix Jump',
    description: 'Guide a bouncing ball through a rotating helix tower. Don\'t hit the wrong colored platforms!',
    thumbnail: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/helixjump.html',
    isCustom: false
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    description: 'The perfect game for the armchair quarterback. Manage your team and lead them to glory!',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/retrobowl.html',
    isCustom: false
  },
  {
    id: 'stickman-archers',
    title: 'Stickman Archers Battle',
    description: 'Engage in epic archery duels! Aim carefully and defeat your enemies in this stickman battle.',
    thumbnail: 'https://images.unsplash.com/photo-1580041065738-e72023758de1?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/stickarchersbattle.html',
    isCustom: false
  },
  {
    id: 'draw-climber',
    title: 'Draw Climber',
    description: 'Draw legs for your cube to help it climb through challenging obstacle courses.',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/drawclimber.html',
    isCustom: false
  },
  {
    id: 'fnaf',
    title: 'Five Nights at Freddy\'s',
    description: 'Can you survive five nights as a security guard at Freddy Fazbear\'s Pizza?',
    thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/shayderrr/Offline-HTML-Games-Pack/master/offline/fnaf.html',
    isCustom: false
  },
  {
    id: 'duck-life',
    title: 'Duck Life',
    description: 'Train your duck to become a world champion! Compete in running, swimming, and flying races in this classic training simulator.',
    thumbnail: 'https://images.unsplash.com/photo-1555854816-802f188090e4?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/MDtowerz/duck-life-1/main/unity/index.html',
    isCustom: false
  },
  {
    id: 'duck-life-2',
    title: 'Duck Life 2',
    description: 'The adventure continues! Train your duck in new skills like climbing and compete in even more challenging world championships.',
    thumbnail: 'https://images.unsplash.com/photo-1555854816-802f188090e4?q=80&w=400&h=225&auto=format&fit=crop',
    url: 'https://raw.githack.com/BonziWorld1/DuckLife2/main/index.html',
    isCustom: false
  }
];

interface HomeProps {
}

const Home: React.FC<HomeProps> = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = useMemo(() => {
    return INITIAL_LIBRARY.filter(g => 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

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
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-3xl">
          <div className="text-slate-600 text-6xl mb-6">
            <i className="fas fa-ghost"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-400 mb-2">No games found</h3>
          <p className="text-slate-500">Try adjusting your search.</p>
        </div>
      )}

      {/* Modals */}
      {selectedGame && (
        <GameModal 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
};

export default Home;