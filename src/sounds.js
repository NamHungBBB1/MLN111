const BASE = 'https://raw.githubusercontent.com/citedy/game-sounds/main/sounds';

class SoundManager {
  constructor() {
    this.muted = false;
    this._ctx  = null;
    this.bg    = null;
    this._sfx  = {};
    this._init();
  }

  _getCtx() {
    if (!this._ctx) {
      this._ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this._ctx;
  }

  _load(path) {
    const a = new Audio(`${BASE}/${path}`);
    a.preload = 'auto';
    return a;
  }

  _init() {
    this.bg = this._load('castlevania/session-start/prologue.mp3');
    this.bg.loop   = true;
    this.bg.volume = 0.45;

    this._sfx = {
      stageResult: this._load('final-fantasy/permission/item-received.mp3'),
      goodEnding:  this._load('final-fantasy/task-acknowledge/finale.mp3'),
      badEnding:   this._load('game-of-thrones/error/shame-bell.mp3'),
    };
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
    if (this.muted || !this._sfx[name]) return;
    try {
      const audio = this._sfx[name];
      audio.pause();
      audio.currentTime = 0;
      audio.volume = name === 'stageResult' ? 0.3 : 0.6;
      audio.play().catch(() => {});
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
