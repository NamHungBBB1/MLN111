import React from 'react';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-portrait" aria-hidden="true">
        <img
          src="/marx-portrait.jpg"
          alt=""
          loading="eager"
        />
      </div>
      <div className="hero-content">
        <div className="hero-meta">
          <span>★ NHÓM 7 ★ CHƯƠNG III ★ MỤC IV ★ TRIẾT HỌC MÁC-LÊNIN</span>
          <span>NO. 1859 — 2026</span>
        </div>
        <h1 className="hero-title">
          Tồn tại xã hội<br />quyết định <span className="accent">ý thức</span>
        </h1>
        <p className="hero-subtitle">
          Sản phẩm Nhóm 7 — phân tích nguyên lý duy vật lịch sử của Karl Marx qua dẫn chứng thực tiễn đương đại.
        </p>
      </div>
    </div>
  );
}
