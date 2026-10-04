/**
 * TIẾN VÀ CUỘC PHIÊU LƯU 3 CÕI - script.js
 * Pure Vanilla JS - No dependencies
 */

// =====================================================
// GAME STATE
// =====================================================
const GameState = {
  currentScreen: 'title',
  currentWorld: null,
  completedWorlds: { linh: false, ma: false, nhan: false },
  player: { hp: 100, maxHp: 100 },
  enemy: { hp: 100, maxHp: 100, name: '', damage: 10 },
  worldPhase: 'explore', // explore | dialogue | combat | complete
  playerX: 120,
  cameraX: 0,
  moveDir: 0,
  npcTriggered: false,
  questSolved: false,
  combatActive: false,
  playerAnimFrame: null,
  bgMoveInterval: null,
};

// =====================================================
// WORLD DATA
// =====================================================
const WorldData = {
  nhan: {
    name: 'NHÂN GIỚI',
    icon: '🏘️',
    npcTriggerX: 550,
    npc: {
      name: 'Ông Già',
      icon: '👴',
      greeting: 'Này Tiến! Ta có một câu hỏi dành cho ngươi...',
      question: 'Tiến thích ăn gì nhất?',
      answers: [
        { text: 'Phở',          correct: false, response: 'Thật thất vọng...', type: 'wrong' },
        { text: 'Cơm Sườn',    correct: false, response: 'Thật thất vọng...', type: 'wrong' },
        { text: 'Bò Beefsteak',correct: true,  response: '✓ CHÍNH XÁC!',      type: 'correct', followup: 'Ta biết ngay mà!' },
        { text: 'Ánh',         correct: false, response: 'Bạn còn liêm sĩ không???', type: 'funny' },
      ],
    },
    enemy: { name: '👹 Quỷ Làng', hp: 80, maxHp: 80, damage: 8, spriteClass: 'enemy-goblin' },
    completeMsg: 'NHÂN GIỚI ĐÃ HOÀN THÀNH!',
  },
  linh: {
    name: 'LINH GIỚI',
    icon: '🌿',
    npcTriggerX: 500,
    npc: {
      name: 'Thiên Thần',
      icon: '👼',
      greeting: 'Tiến, ta có một câu hỏi dành cho ngươi.',
      question: 'Tiến có đẹp trai không?',
      answers: [
        { text: 'Có',   correct: true,  response: '✓ CHÍNH XÁC!', type: 'correct', followup: 'Ta cũng nghĩ vậy.' },
        { text: 'Không',correct: false, response: 'Cô gái này thật thú dị', type: 'funny' },
      ],
    },
    enemy: { name: '💫 Linh Thú Ánh Sáng', hp: 90, maxHp: 90, damage: 10, spriteClass: 'enemy-light-orb-wrap' },
    completeMsg: 'LINH GIỚI ĐÃ HOÀN THÀNH!',
  },
  ma: {
    name: 'MA GIỚI',
    icon: '🔥',
    npcTriggerX: 520,
    npc: {
      name: 'Quỷ Vương',
      icon: '😈',
      greeting: 'HAHAHA! Tiến! Ta sẽ hỏi ngươi một câu...',
      question: 'Tiến thích thế nào nhất?',
      answers: [
        { text: 'Truyền thống', correct: false, response: 'Thất vọng quá...\nLàm cái cho biết câu trả lời đúng nhé.', type: 'wrong' },
        { text: 'Doggy',        correct: true,  response: '✓ CHÍNH XÁC!', type: 'correct', followup: 'Ta biết ngay mà!' },
        { text: 'Cưỡi ngựa',   correct: false, response: 'Thất vọng quá...\nLàm cái cho biết câu trả lời đúng nhé.', type: 'wrong' },
        { text: 'Bế Quan Âm',  correct: false, response: 'Thất vọng quá...\nLàm cái cho biết câu trả lời đúng nhé.', type: 'wrong' },
      ],
    },
    enemy: { name: '👿 Đại Ác Quỷ', hp: 100, maxHp: 100, damage: 12, spriteClass: 'enemy-demon-wrap' },
    completeMsg: 'MA GIỚI ĐÃ HOÀN THÀNH!',
  },
};

// =====================================================
// AUDIO (Web Audio API - synthetic sounds)
// =====================================================
const AudioCtx = (function () {
  let ctx = null;
  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    return ctx;
  }
  function playTone(freq, type, duration, gain = 0.3, delay = 0) {
    const c = getCtx(); if (!c) return;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.connect(g); g.connect(c.destination);
    osc.type = type; osc.frequency.value = freq;
    g.gain.setValueAtTime(0, c.currentTime + delay);
    g.gain.linearRampToValueAtTime(gain, c.currentTime + delay + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
    osc.start(c.currentTime + delay);
    osc.stop(c.currentTime + delay + duration);
  }
  return {
    click()   { playTone(600, 'sine', 0.08, 0.15); },
    correct() { [500,600,750].forEach((f,i)=> playTone(f,'sine',0.15,0.25,i*0.1)); },
    wrong()   { [300,250].forEach((f,i)=> playTone(f,'sawtooth',0.2,0.2,i*0.1)); },
    attack()  { playTone(200,'square',0.1,0.3); playTone(400,'sawtooth',0.08,0.2,0.05); },
    hit()     { playTone(150,'sawtooth',0.15,0.35); },
    victory() { [400,500,600,800].forEach((f,i)=> playTone(f,'sine',0.3,0.3,i*0.12)); },
    chest()   { [300,400,600,900,1200].forEach((f,i)=> playTone(f,'sine',0.4,0.35,i*0.15)); },
    step()    { playTone(100,'triangle',0.04,0.1); },
  };
})();

// =====================================================
// UTILITIES
// =====================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('id' in arguments ? id : `screen-${id}`);
  const target = document.getElementById(`screen-${id}`);
  if (target) target.classList.add('active');
  GameState.currentScreen = id;
}

function setClass(el, ...classes) { el.className = classes.join(' '); }

function createEl(tag, cls, html = '') {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html) el.innerHTML = html;
  return el;
}

function showElement(id) { document.getElementById(id).classList.remove('hidden'); }
function hideElement(id) { document.getElementById(id).classList.add('hidden'); }

// Typewriter effect
function typeWriter(el, text, speed = 30) {
  el.textContent = '';
  let i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    }
  }
  tick();
}

// Spawn damage number
function spawnDmgNum(value, isPlayer) {
  const container = document.getElementById('damage-numbers');
  const num = createEl('div', `dmg-num ${isPlayer ? 'player-dmg' : 'enemy-dmg'}`, `-${value}`);
  const x = isPlayer ? 60 : 60;
  const yBase = isPlayer ? 30 : 30;
  num.style.left = (isPlayer ? '30%' : '60%');
  num.style.top = '40%';
  container.appendChild(num);
  num.addEventListener('animationend', () => num.remove());
}

// =====================================================
// PARTICLES
// =====================================================
function initParticles() {
  const container = document.getElementById('particle-container');
  container.innerHTML = '';
  const colors = ['#f5c842','#8e44ad','#3498db','#27ae60','#e74c3c'];
  for (let i = 0; i < 25; i++) {
    const p = createEl('div', 'particle');
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      opacity:${Math.random()*0.5+0.3};
      animation-duration:${Math.random()*10+8}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
}

function initRewardStars() {
  const container = document.getElementById('reward-stars');
  container.innerHTML = '';
  for (let i = 0; i < 40; i++) {
    const s = createEl('div', 'reward-star', '✦');
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation-duration:${Math.random()*3+2}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(s);
  }
}

function initChestParticles() {
  const container = document.getElementById('chest-particles');
  container.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const p = createEl('div', 'cp');
    const angle = (i / 12) * Math.PI * 2;
    const dist = 60 + Math.random() * 40;
    p.style.cssText = `
      left:50%; top:50%;
      background:${['#f5c842','#ff9d00','#fff8a0'][i%3]};
      --tx:${Math.cos(angle)*dist}px; --ty:${Math.sin(angle)*dist}px;
      animation-duration:${1.5+Math.random()}s;
      animation-delay:${Math.random()*0.5}s;
    `;
    container.appendChild(p);
  }
}

// =====================================================
// SCREEN: TITLE
// =====================================================
function startGame() {
  AudioCtx.click();
  initParticles();
  showScreen('world-select');
  updateWorldSelectUI();
}

// =====================================================
// SCREEN: WORLD SELECT
// =====================================================
function updateWorldSelectUI() {
  const worlds = ['linh', 'ma', 'nhan'];
  worlds.forEach(w => {
    const done = GameState.completedWorlds[w];
    const progEl = document.getElementById(`prog-${w}`);
    const statusEl = document.getElementById(`status-${w}`);
    const cardEl = document.getElementById(`card-${w}`);
    if (done) {
      progEl.textContent = `☑ ${WorldData[w].name}`;
      progEl.classList.add('done');
      statusEl.textContent = '✓ ĐÃ HOÀN THÀNH';
      cardEl.classList.add('completed');
    } else {
      progEl.textContent = `☐ ${WorldData[w].name}`;
      progEl.classList.remove('done');
      statusEl.textContent = '';
      cardEl.classList.remove('completed');
    }
  });

  // Check all done
  if (worlds.every(w => GameState.completedWorlds[w])) {
    setTimeout(() => {
      initRewardStars();
      initChestParticles();
      showScreen('reward');
    }, 800);
  }
}

function selectWorld(world) {
  AudioCtx.click();
  GameState.currentWorld = world;
  startWorld(world);
}

// =====================================================
// SCREEN: GAME WORLD
// =====================================================
function startWorld(world) {
  const data = WorldData[world];

  // Reset state
  GameState.player.hp = GameState.player.maxHp;
  GameState.enemy = { ...data.enemy };
  GameState.worldPhase = 'explore';
  GameState.playerX = 120;
  GameState.cameraX = 0;
  GameState.npcTriggered = false;
  GameState.questSolved = false;
  GameState.combatActive = false;
  GameState.moveDir = 0;

  // Setup UI
  document.getElementById('hud-world-name').textContent = data.name;
  updatePlayerHPBar();

  // Reset overlays
  hideElement('dialogue-box');
  hideElement('combat-ui');
  hideElement('game-over');
  hideElement('world-complete');
  hideElement('npc-entity');
  hideElement('enemy-entity');

  // Apply world class to game-world
  const gameWorld = document.getElementById('game-world');
  gameWorld.className = `game-world ${world}`;

  // Build background and decorations
  buildWorldBackground(world);

  // Player position
  const playerEl = document.getElementById('player-entity');
  playerEl.style.left = GameState.playerX + 'px';

  // Update player sprite (facing direction reset)
  const sprite = document.getElementById('player-sprite');
  sprite.className = 'player-sprite idle';
  sprite.innerHTML = '<div class="sword"></div><div class="legs"><div class="leg left"></div><div class="leg right"></div></div>';

  showScreen('game');
  startGameLoop();
}

// =====================================================
// WORLD BACKGROUND BUILDER
// =====================================================
function buildWorldBackground(world) {
  const decoContainer = document.getElementById('world-decorations');
  decoContainer.innerHTML = '';
  const groundY = '25%';

  if (world === 'nhan') buildNhanWorld(decoContainer);
  else if (world === 'linh') buildLinhWorld(decoContainer);
  else if (world === 'ma') buildMaWorld(decoContainer);
}

function buildNhanWorld(container) {
  // Houses
  const housePositions = [200, 450, 750, 1000, 1300, 1600];
  housePositions.forEach((x, i) => {
    const house = createEl('div', 'house deco');
    house.style.left = x + 'px';
    house.innerHTML = `
      <div class="house-body">
        <div class="house-window" style="top:10px;left:8px"></div>
        <div class="house-window" style="top:10px;right:8px"></div>
        <div class="house-door"></div>
      </div>
      <div class="house-roof"></div>
    `;
    container.appendChild(house);
  });

  // Trees
  [150, 380, 620, 880, 1150, 1450, 1700].forEach(x => {
    const tree = createEl('div', 'tree deco');
    tree.style.left = x + 'px';
    tree.innerHTML = `<div class="tree-top"></div><div class="tree-trunk"></div>`;
    container.appendChild(tree);
  });

  // Lamps
  [300, 600, 900, 1200].forEach(x => {
    const lamp = createEl('div', 'lamp deco');
    lamp.style.left = x + 'px';
    lamp.innerHTML = `<div class="lamp-head"></div><div class="lamp-pole"></div>`;
    container.appendChild(lamp);
  });
}

function buildLinhWorld(container) {
  // Clouds
  const cloudData = [
    { x: 80,  y: '5%',  w: 120, h: 50, op: 0.9 },
    { x: 300, y: '12%', w: 180, h: 60, op: 0.8 },
    { x: 550, y: '8%',  w: 140, h: 55, op: 0.95 },
    { x: 800, y: '15%', w: 200, h: 65, op: 0.7 },
    { x: 1100,y: '6%',  w: 160, h: 50, op: 0.85 },
    { x: 1400,y: '10%', w: 130, h: 45, op: 0.9 },
  ];
  cloudData.forEach(cd => {
    const cloud = createEl('div', 'cloud deco');
    cloud.style.cssText = `left:${cd.x}px; top:${cd.y}; width:${cd.w}px; height:${cd.h}px;
      background:rgba(255,255,255,${cd.op}); box-shadow:0 0 20px rgba(200,230,255,0.5);
      animation: floatCloud ${5+Math.random()*4}s ease-in-out infinite alternate;`;
    container.appendChild(cloud);
  });

  // Floating islands
  const islandData = [
    { x: 200, y: '45%', w: 140, bh: 20 },
    { x: 600, y: '50%', w: 100, bh: 15 },
    { x: 1000,y: '42%', w: 160, bh: 25 },
    { x: 1400,y: '48%', w: 120, bh: 18 },
  ];
  islandData.forEach(isl => {
    const island = createEl('div', 'island-fly deco');
    island.style.cssText = `left:${isl.x}px; top:${isl.y}; animation: floatIsland 4s ease-in-out infinite alternate;`;
    island.innerHTML = `
      <div style="width:${isl.w}px;height:30px;background:#c8f0c8;border-radius:50%;box-shadow:0 0 15px rgba(100,200,100,0.4)"></div>
      <div style="width:${isl.w*0.7}px;height:${isl.bh}px;background:#8b5e3c;border-radius:0 0 50% 50%;margin:0 auto"></div>
    `;
    container.appendChild(island);
  });

  // Angel decorations
  ['🕊️','✨','🌟','💫'].forEach((emoji, i) => {
    const a = createEl('div', 'angel-deco deco');
    a.style.cssText = `left:${150+i*350}px; top:${20+i*5}%;font-size:1.8rem; animation-delay:${i*0.5}s`;
    a.textContent = emoji;
    container.appendChild(a);
  });

  // Sparkle style injection (if needed)
  if (!document.getElementById('float-island-style')) {
    const s = document.createElement('style');
    s.id = 'float-island-style';
    s.textContent = `
      @keyframes floatCloud { from { transform: translateY(0); } to { transform: translateY(10px); } }
      @keyframes floatIsland { from { transform: translateY(0); } to { transform: translateY(-15px); } }
    `;
    document.head.appendChild(s);
  }
}

function buildMaWorld(container) {
  // Volcanoes
  [180, 600, 1100, 1600].forEach((x, i) => {
    const vol = createEl('div', 'volcano deco');
    vol.style.left = x + 'px';
    vol.innerHTML = `<div class="volcano-body" style="width:${70+i*10}px;height:${70+i*10}px"></div>`;
    container.appendChild(vol);

    // Lava at top
    const lava = createEl('div', 'fire-deco deco');
    lava.style.cssText = `left:${x+20}px; bottom:calc(25% + ${70+i*10}px); font-size:${1.5+i*0.2}rem; animation-delay:${i*0.2}s`;
    lava.textContent = '🌋';
    container.appendChild(lava);
  });

  // Lava pools
  [300, 800, 1300].forEach(x => {
    const pool = createEl('div', 'lava-pool deco');
    pool.style.cssText = `left:${x}px; width:${80+Math.random()*60}px;`;
    container.appendChild(pool);
  });

  // Fire decorations
  [120, 400, 700, 950, 1200, 1500].forEach((x, i) => {
    const fire = createEl('div', 'fire-deco deco');
    fire.style.cssText = `left:${x}px; bottom:25%; font-size:1.3rem; animation-delay:${i*0.15}s`;
    fire.textContent = '🔥';
    container.appendChild(fire);
  });

  // Dead trees
  [250, 520, 900, 1350].forEach(x => {
    const dt = createEl('div', 'dead-tree deco');
    dt.style.left = x + 'px';
    dt.innerHTML = `<div class="dead-trunk"></div>`;
    container.appendChild(dt);
  });

  // Smoke effect
  if (!document.getElementById('smoke-style')) {
    const s = document.createElement('style');
    s.id = 'smoke-style';
    s.textContent = `
      .smoke { position: absolute; background: rgba(80,30,0,0.15); border-radius: 50%;
        animation: smokeRise 4s ease-out infinite; }
      @keyframes smokeRise {
        0% { transform: translateY(0) scale(0.5); opacity: 0.6; }
        100% { transform: translateY(-120px) scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(s);
  }
  [200, 650, 1150].forEach((x, i) => {
    for (let j = 0; j < 3; j++) {
      const smoke = createEl('div', 'smoke deco');
      smoke.style.cssText = `left:${x}px; bottom:30%; width:30px; height:30px; animation-delay:${j*1.3+i*0.5}s;`;
      container.appendChild(smoke);
    }
  });
}

// =====================================================
// GAME LOOP
// =====================================================
let lastTime = 0;
let gameLoopId = null;

function startGameLoop() {
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  function loop(ts) {
    if (GameState.currentScreen !== 'game') return;
    const dt = Math.min(ts - lastTime, 50);
    lastTime = ts;
    updateGame(dt);
    gameLoopId = requestAnimationFrame(loop);
  }
  gameLoopId = requestAnimationFrame(loop);
}

function updateGame(dt) {
  if (GameState.worldPhase !== 'explore') return;

  const speed = 3;
  if (GameState.moveDir !== 0) {
    GameState.playerX += GameState.moveDir * speed;
    GameState.playerX = Math.max(40, Math.min(GameState.playerX, 1700));

    const sprite = document.getElementById('player-sprite');
    sprite.classList.remove('idle');
    sprite.classList.add('walk');
    sprite.style.transform = GameState.moveDir < 0 ? 'scaleX(-1)' : 'scaleX(1)';

    // Camera follow
    if (GameState.playerX > 300) {
      GameState.cameraX = GameState.playerX - 300;
    } else {
      GameState.cameraX = 0;
    }

    updateCamera();

    // NPC trigger
    const wData = WorldData[GameState.currentWorld];
    if (!GameState.npcTriggered && GameState.playerX >= wData.npcTriggerX) {
      GameState.npcTriggered = true;
      GameState.moveDir = 0;
      triggerNPC();
    }
  } else {
    const sprite = document.getElementById('player-sprite');
    sprite.classList.remove('walk');
    sprite.classList.add('idle');
  }

  // Update player position
  document.getElementById('player-entity').style.left = (GameState.playerX - GameState.cameraX) + 'px';
}

function updateCamera() {
  const decoContainer = document.getElementById('world-decorations');
  const npcEl = document.getElementById('npc-entity');
  const enemyEl = document.getElementById('enemy-entity');

  decoContainer.style.transform = `translateX(-${GameState.cameraX}px)`;
  if (!npcEl.classList.contains('hidden')) {
    npcEl.style.transform = `translateX(-${GameState.cameraX}px)`;
  }
  if (!enemyEl.classList.contains('hidden')) {
    enemyEl.style.transform = `translateX(-${GameState.cameraX}px)`;
  }
}

// =====================================================
// NPC INTERACTION
// =====================================================
function triggerNPC() {
  const world = GameState.currentWorld;
  const wData = WorldData[world];
  GameState.worldPhase = 'dialogue';

  const npcEl = document.getElementById('npc-entity');
  const npcSprite = document.getElementById('npc-sprite');
  const npcNameTag = document.getElementById('npc-name-tag');

  // Set NPC position (slightly ahead)
  npcEl.style.left = (wData.npcTriggerX + 80) + 'px';
  npcEl.style.transform = `translateX(-${GameState.cameraX}px)`;
  npcNameTag.textContent = wData.npc.name;

  // Apply NPC sprite CSS class
  npcSprite.innerHTML = '';
  if (world === 'nhan') {
    npcSprite.className = 'npc-sprite npc-oldman';
    npcSprite.innerHTML = '<div class="beard"></div><div class="hat"></div>';
  } else if (world === 'linh') {
    npcSprite.className = 'npc-sprite npc-angel';
    npcSprite.innerHTML = '<div class="halo"></div><div class="wings"></div>';
  } else if (world === 'ma') {
    npcSprite.className = 'npc-sprite npc-devil';
    npcSprite.innerHTML = '<div class="horns"></div><div class="tail"></div>';
  }

  showElement('npc-entity');

  setTimeout(() => showDialogue('greeting'), 300);
}

// =====================================================
// DIALOGUE SYSTEM
// =====================================================
let dialogueState = 'greeting'; // greeting | question | answered

function showDialogue(phase) {
  const world = GameState.currentWorld;
  const npc = WorldData[world].npc;

  const box = document.getElementById('dialogue-box');
  const speakerIcon = document.getElementById('dialogue-speaker-icon');
  const speakerName = document.getElementById('dialogue-speaker');
  const textEl = document.getElementById('dialogue-text');
  const answersEl = document.getElementById('dialogue-answers');
  const feedbackEl = document.getElementById('dialogue-feedback');
  const nextBtn = document.getElementById('btn-dialogue-next');

  box.classList.remove('hidden');
  speakerIcon.textContent = npc.icon;
  speakerName.textContent = npc.name;
  feedbackEl.className = 'dialogue-feedback hidden';
  answersEl.classList.add('hidden');
  nextBtn.classList.add('hidden');

  dialogueState = phase;

  if (phase === 'greeting') {
    typeWriter(textEl, npc.greeting);
    setTimeout(() => {
      nextBtn.classList.remove('hidden');
      nextBtn.onclick = () => showDialogue('question');
    }, npc.greeting.length * 30 + 200);
  } else if (phase === 'question') {
    typeWriter(textEl, npc.question, 25);
    setTimeout(() => {
      answersEl.innerHTML = '';
      npc.answers.forEach((ans, idx) => {
        const btn = createEl('button', 'answer-btn', ans.text);
        btn.onclick = () => { AudioCtx.click(); checkAnswer(idx); };
        answersEl.appendChild(btn);
      });
      answersEl.classList.remove('hidden');
    }, npc.question.length * 25 + 200);
  }
}

function checkAnswer(idx) {
  const world = GameState.currentWorld;
  const npc = WorldData[world].npc;
  const answer = npc.answers[idx];
  const feedbackEl = document.getElementById('dialogue-feedback');
  const answersEl = document.getElementById('dialogue-answers');
  const textEl = document.getElementById('dialogue-text');
  const nextBtn = document.getElementById('btn-dialogue-next');

  feedbackEl.classList.remove('hidden', 'feedback-correct', 'feedback-wrong', 'feedback-funny');

  if (answer.correct) {
    AudioCtx.correct();
    feedbackEl.textContent = answer.response;
    feedbackEl.classList.add('feedback-correct');
    answersEl.classList.add('hidden');
    GameState.questSolved = true;

    // Followup line
    setTimeout(() => {
      typeWriter(textEl, answer.followup || '');
      nextBtn.textContent = 'Tiếp tục →';
      nextBtn.classList.remove('hidden');
      nextBtn.onclick = () => startCombat();
    }, 600);
  } else {
    AudioCtx.wrong();
    feedbackEl.classList.add(answer.type === 'funny' ? 'feedback-funny' : 'feedback-wrong');
    feedbackEl.textContent = answer.response.replace('\n', '\n');
    feedbackEl.style.whiteSpace = 'pre-line';

    // Allow retry
    setTimeout(() => {
      feedbackEl.classList.add('hidden');
    }, 2000);
  }
}

function dialogueNext() {
  // handled inline via onclick
}

// =====================================================
// COMBAT
// =====================================================
function startCombat() {
  const world = GameState.currentWorld;
  const wData = WorldData[world];

  hideElement('dialogue-box');
  hideElement('npc-entity');
  GameState.worldPhase = 'combat';
  GameState.combatActive = true;

  // Reset enemy HP
  GameState.enemy = { ...wData.enemy };

  // Show enemy entity
  const enemyEl = document.getElementById('enemy-entity');
  const enemySprite = document.getElementById('enemy-sprite');
  const enemyNameTag = document.getElementById('enemy-name-tag');
  const enemyHpBar = document.getElementById('enemy-hp-bar');
  const enemyHpText = document.getElementById('enemy-hp-text');

  enemyEl.style.right = '180px';
  enemyEl.style.left = 'auto';
  enemyEl.style.transform = '';
  enemyNameTag.textContent = wData.enemy.name;
  enemyHpBar.style.width = '100%';
  enemyHpText.textContent = `${wData.enemy.hp}/${wData.enemy.maxHp}`;

  // Build enemy sprite
  enemySprite.innerHTML = '';
  if (world === 'nhan') {
    enemySprite.className = 'enemy-sprite enemy-goblin';
    enemySprite.innerHTML = '<div class="eyes"><div class="eye"></div><div class="eye"></div></div><div class="teeth"></div>';
  } else if (world === 'linh') {
    enemySprite.className = 'enemy-sprite';
    enemySprite.innerHTML = '<div class="enemy-light-orb"></div>';
  } else if (world === 'ma') {
    enemySprite.className = 'enemy-sprite enemy-demon';
    enemySprite.innerHTML = '<div class="d-horns"></div><div class="d-eyes"><div class="d-eye"></div><div class="d-eye"></div></div>';
  }

  showElement('enemy-entity');

  // Combat UI
  const combatUI = document.getElementById('combat-ui');
  const combatPlayerSprite = document.getElementById('combat-player-sprite');
  const combatEnemySprite = document.getElementById('combat-enemy-sprite');
  const combatEnemyName = document.getElementById('combat-enemy-name');

  combatPlayerSprite.innerHTML = '<div style="font-size:2.5rem">⚔</div>';
  combatEnemySprite.innerHTML = `<div style="font-size:2.5rem">${getEnemyEmoji(world)}</div>`;
  combatEnemyName.textContent = wData.enemy.name;

  updateCombatHPBars();
  document.getElementById('combat-log').textContent = '⚔ Trận chiến bắt đầu!';
  document.getElementById('btn-attack').disabled = false;

  combatUI.classList.remove('hidden');
}

function getEnemyEmoji(world) {
  if (world === 'nhan') return '👹';
  if (world === 'linh') return '💫';
  return '👿';
}

function attackEnemy() {
  if (!GameState.combatActive) return;
  AudioCtx.attack();

  const btn = document.getElementById('btn-attack');
  btn.disabled = true;

  // Player attack animation
  const playerSprite = document.getElementById('player-sprite');
  playerSprite.classList.add('attack');
  setTimeout(() => playerSprite.classList.remove('attack'), 300);

  // Enemy takes damage
  const dmg = 20;
  GameState.enemy.hp = Math.max(0, GameState.enemy.hp - dmg);

  // Shake enemy
  const enemyEl = document.getElementById('enemy-entity');
  enemyEl.classList.add('enemy-shake');
  setTimeout(() => enemyEl.classList.remove('enemy-shake'), 350);

  spawnDmgNum(dmg, false);
  updateCombatHPBars();

  const log = document.getElementById('combat-log');
  log.textContent = `⚔ Tiến gây ${dmg} sát thương!`;

  if (GameState.enemy.hp <= 0) {
    // Enemy defeated
    setTimeout(() => defeatEnemy(), 400);
    return;
  }

  // Enemy counter attack
  setTimeout(() => enemyAttack(), 600);
}

function enemyAttack() {
  if (!GameState.combatActive) return;
  AudioCtx.hit();

  const dmg = GameState.enemy.damage;
  GameState.player.hp = Math.max(0, GameState.player.hp - dmg);

  spawnDmgNum(dmg, true);
  updatePlayerHPBar();
  updateCombatHPBars();

  const log = document.getElementById('combat-log');
  log.textContent = `💥 ${GameState.enemy.name} phản công ${dmg} sát thương!`;

  if (GameState.player.hp <= 0) {
    setTimeout(() => triggerGameOver(), 400);
    return;
  }

  // Re-enable attack button
  const btn = document.getElementById('btn-attack');
  btn.disabled = false;
}

function defeatEnemy() {
  GameState.combatActive = false;
  AudioCtx.victory();

  const enemyEl = document.getElementById('enemy-entity');
  enemyEl.classList.add('enemy-death');
  setTimeout(() => {
    enemyEl.classList.add('hidden');
    hideElement('combat-ui');
    completeWorld();
  }, 700);
}

function updateCombatHPBars() {
  const pct = (GameState.player.hp / GameState.player.maxHp) * 100;
  const ePct = (GameState.enemy.hp / GameState.enemy.maxHp) * 100;

  document.getElementById('combat-player-hp-bar').style.width = pct + '%';
  document.getElementById('combat-player-hp-text').textContent = `${GameState.player.hp}/${GameState.player.maxHp}`;
  document.getElementById('combat-enemy-hp-bar').style.width = ePct + '%';
  document.getElementById('combat-enemy-hp-text').textContent = `${GameState.enemy.hp}/${GameState.enemy.maxHp}`;
}

function updatePlayerHPBar() {
  const pct = (GameState.player.hp / GameState.player.maxHp) * 100;
  document.getElementById('player-hp-bar').style.width = pct + '%';
  document.getElementById('player-hp-text').textContent = `${GameState.player.hp}/${GameState.player.maxHp}`;
}

// =====================================================
// WORLD COMPLETE
// =====================================================
function completeWorld() {
  const world = GameState.currentWorld;
  GameState.completedWorlds[world] = true;
  GameState.worldPhase = 'complete';

  const completeEl = document.getElementById('world-complete');
  const titleEl = document.getElementById('world-complete-title');

  titleEl.textContent = WorldData[world].completeMsg;
  completeEl.classList.remove('hidden');
}

function returnToWorldSelect() {
  AudioCtx.click();
  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  showScreen('world-select');
  updateWorldSelectUI();
}

// =====================================================
// GAME OVER
// =====================================================
function triggerGameOver() {
  GameState.combatActive = false;
  GameState.worldPhase = 'gameover';
  hideElement('combat-ui');
  showElement('game-over');
}

function restartCurrentWorld() {
  AudioCtx.click();
  hideElement('game-over');
  startWorld(GameState.currentWorld);
}

// =====================================================
// REWARD SCREEN
// =====================================================
let chestOpened = false;

function openChest() {
  if (chestOpened) return;
  chestOpened = true;
  AudioCtx.chest();

  const chest = document.getElementById('chest');
  const openBtn = document.getElementById('btn-open-chest');
  chest.classList.add('open');
  openBtn.style.display = 'none';

  // Light burst + reveal
  setTimeout(() => {
    showElement('reward-reveal');
    // Trigger burst animation restart
    const burst = document.getElementById('light-burst');
    burst.style.animation = 'none';
    void burst.offsetWidth;
    burst.style.animation = 'burstExpand 1.5s ease-out forwards';
  }, 600);
}

function showReward() {
  chestOpened = false;
  initRewardStars();
  initChestParticles();
  // Reset chest
  const chest = document.getElementById('chest');
  chest.classList.remove('open');
  hideElement('reward-reveal');
  document.getElementById('btn-open-chest').style.display = '';
  showScreen('reward');
}

// =====================================================
// RESTART GAME
// =====================================================
function restartGame() {
  AudioCtx.click();
  chestOpened = false;
  GameState.completedWorlds = { linh: false, ma: false, nhan: false };
  GameState.player.hp = GameState.player.maxHp;
  GameState.currentWorld = null;

  // Reset chest UI
  const chest = document.getElementById('chest');
  chest.classList.remove('open');
  hideElement('reward-reveal');
  document.getElementById('btn-open-chest').style.display = '';

  // Reset progress UI
  ['linh','ma','nhan'].forEach(w => {
    document.getElementById(`prog-${w}`).classList.remove('done');
    document.getElementById(`status-${w}`).textContent = '';
    document.getElementById(`card-${w}`).classList.remove('completed');
  });

  showScreen('title');
}

// =====================================================
// KEYBOARD CONTROLS
// =====================================================
const keysHeld = {};

document.addEventListener('keydown', (e) => {
  if (keysHeld[e.code]) return;
  keysHeld[e.code] = true;

  if (GameState.worldPhase !== 'explore') return;

  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    GameState.moveDir = -1;
  } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    GameState.moveDir = 1;
  }
});

document.addEventListener('keyup', (e) => {
  delete keysHeld[e.code];

  if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
    if (!keysHeld['ArrowRight'] && !keysHeld['KeyD']) GameState.moveDir = 0;
  } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
    if (!keysHeld['ArrowLeft'] && !keysHeld['KeyA']) GameState.moveDir = 0;
  }
});

// =====================================================
// MOBILE CONTROLS
// =====================================================
function startMove(dir) {
  if (GameState.worldPhase !== 'explore') return;
  GameState.moveDir = dir === 'left' ? -1 : 1;
}

function stopMove() {
  GameState.moveDir = 0;
}

function mobileAttack() {
  if (GameState.combatActive) attackEnemy();
}

// =====================================================
// INIT
// =====================================================
window.addEventListener('load', () => {
  initParticles();
  showScreen('title');

  // Prevent context menu on long press (mobile)
  document.addEventListener('contextmenu', e => e.preventDefault());
});
