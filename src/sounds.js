const BASE = 'https://raw.githubusercontent.com/citedy/game-sounds/main/sounds';

const URLS = {
  bg:         '/maestro.mp3',
  goodEnding: 'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Achaidh%20Cheide.mp3',
  badEnding:  'https://incompetech.com/music/royalty-free/mp3-royaltyfree/Long%20Road%20Ahead.mp3',
};

class SoundManager {
  constructor() {
    this.muted    = false;
    this.bgActive = false;
    this._ctx     = null;
    this._sfx     = null;

    this.bg = new Audio(URLS.bg);
    this.bg.loop    = true;
    this.bg.volume  = 0.05;
    this.bg.preload = 'auto';

    // Preload ending tracks so they play instantly
    this._preloaded = {};
    for (const name of ['goodEnding', 'badEnding']) {
      const a = new Audio(URLS[name]);
      a.preload = 'auto';
      a.volume  = 0.2;
      this._preloaded[name] = a;
    }
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
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.07);
    } catch (_) {}
  }

  play(name) {
    if (this.muted || !URLS[name]) return;
    try {
      if (this._sfx) { this._sfx.pause(); this._sfx.currentTime = 0; }
      const a = this._preloaded[name] ?? new Audio(URLS[name]);
      a.volume = 0.2;
      a.currentTime = 0;
      a.play().catch(() => {});
      this._sfx = a;
    } catch (_) {}
  }

  stopSfx() {
    if (this._sfx) { this._sfx.pause(); this._sfx = null; }
  }

  stopAll() {
    this.stopBg();
    this.stopSfx();
  }

  startBg() {
    if (this.muted) return;
    this.bgActive = true;
    this.bg.currentTime = 0;
    this.bg.play().catch(() => {});
  }

  stopBg() {
    this.bgActive = false;
    try { this.bg.pause(); this.bg.currentTime = 0; } catch (_) {}
  }

  pauseBg() {
    if (this.bgActive) try { this.bg.pause(); } catch (_) {}
    if (this._sfx)     try { this._sfx.pause(); } catch (_) {}
  }

  resumeBg() {
    if (this.bgActive && !this.muted) this.bg.play().catch(() => {});
  }

  toggle() {
    this.muted = !this.muted;
    if (this.muted) this.bg.pause();
    else this.bg.play().catch(() => {});
    return this.muted;
  }
}

export const soundManager = new SoundManager();
