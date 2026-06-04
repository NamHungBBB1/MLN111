const BASE = 'https://raw.githubusercontent.com/citedy/game-sounds/main/sounds';

const URLS = {
  bg:          '/maestro.mp3',
  stageResult: `${BASE}/zelda/task-complete/secret-discovered.mp3`,
  goodEnding:  `${BASE}/final-fantasy/task-acknowledge/finale.mp3`,
  badEnding:   `${BASE}/game-of-thrones/task-complete/rains-of-castamere.mp3`,
};

class SoundManager {
  constructor() {
    this.muted = false;
    this._ctx  = null;
    this.bg    = new Audio(URLS.bg);
    this.bg.loop   = true;
    this.bg.volume = 0.45;
    this.bg.preload = 'auto';
  }

  _getCtx() {
    if (!this._ctx) this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    return this._ctx;
  }

  playClick() {
    if (this.muted) return;
    try {
      const ctx  = this._getCtx();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.13, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.07);
    } catch (_) {}
  }

  play(name) {
    if (this.muted || !URLS[name]) return;
    try {
      const a = new Audio(URLS[name]);
      a.volume = name === 'stageResult' ? 0.3 : 0.6;
      a.play().catch(() => {});
    } catch (_) {}
  }

  startBg() {
    if (this.muted) return;
    this.bg.currentTime = 0;
    this.bg.play().catch(() => {});
  }

  stopBg() {
    try { this.bg.pause(); this.bg.currentTime = 0; } catch (_) {}
  }

  toggle() {
    this.muted = !this.muted;
    if (this.muted) this.bg.pause();
    else this.bg.play().catch(() => {});
    return this.muted;
  }
}

export const soundManager = new SoundManager();
