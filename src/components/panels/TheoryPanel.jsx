import React from 'react';

export default function TheoryPanel() {
  return (
    <div className="tab-panel active">
      <div className="section-label">Phần 01 — Khái niệm nền tảng</div>
      <h2 className="section-title">Hai phạm trù đối lập</h2>
      <div className="dual-grid">
        <div className="concept-card red-card">
          <span className="card-label">Cái quyết định</span>
          <h3 className="card-title">Tồn tại xã hội</h3>
          <p className="card-desc">Toàn bộ sinh hoạt vật chất và điều kiện sinh hoạt vật chất của xã hội. Tồn tại khách quan, độc lập với ý thức con người.</p>
          <ul className="card-list">
            <li>Phương thức sản xuất vật chất (yếu tố cốt lõi)</li>
            <li>Điều kiện tự nhiên, hoàn cảnh địa lý</li>
            <li>Dân số và mật độ dân cư</li>
          </ul>
        </div>
        <div className="concept-card">
          <span className="card-label">Cái bị quyết định</span>
          <h3 className="card-title">Ý thức xã hội</h3>
          <p className="card-desc">Toàn bộ đời sống tinh thần của xã hội — phản ánh tồn tại xã hội trong một giai đoạn lịch sử nhất định.</p>
          <ul className="card-list">
            <li>Tâm lý xã hội & hệ tư tưởng</li>
            <li>Chính trị, pháp quyền, đạo đức, tôn giáo</li>
            <li>Khoa học, nghệ thuật, triết học</li>
          </ul>
        </div>
      </div>

      <div className="section-label" style={{ marginTop: '32px' }}>Ba tính chất của ý thức xã hội</div>
      <div className="principle-grid">
        <div className="principle-box">
          <div className="principle-num">01</div>
          <div className="principle-text"><strong>Tính lạc hậu</strong> — ý thức cũ thường tồn tại lâu hơn tồn tại xã hội đã sinh ra nó.</div>
        </div>
        <div className="principle-box">
          <div className="principle-num">02</div>
          <div className="principle-text"><strong>Tính vượt trước</strong> — tư tưởng tiên tiến có thể đi trước, dự báo xu hướng phát triển.</div>
        </div>
        <div className="principle-box">
          <div className="principle-num">03</div>
          <div className="principle-text"><strong>Tính tác động trở lại</strong> — ý thức xã hội tác động ngược lên tồn tại xã hội, theo hai hướng.</div>
        </div>
      </div>
    </div>
  );
}
