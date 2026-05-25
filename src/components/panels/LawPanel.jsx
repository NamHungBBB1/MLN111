import React from 'react';

export default function LawPanel() {
  return (
    <div className="tab-panel active">
      <div className="section-label">Phần 02 — Quy luật vận động</div>
      <h2 className="section-title">Cơ chế quyết định</h2>
      <div className="flow-diagram">
        <div className="flow-row">
          <div className="flow-box dominant">
            <div className="flow-box-num">01 — NGUỒN GỐC</div>
            <div className="flow-box-title">Tồn tại xã hội</div>
            <div className="flow-box-desc">Phương thức sản xuất thay đổi</div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-box">
            <div className="flow-box-num">02 — PHẢN ÁNH</div>
            <div className="flow-box-title">Ý thức biến đổi</div>
            <div className="flow-box-desc">Tư tưởng, giá trị, niềm tin</div>
          </div>
          <div className="flow-arrow">⤺</div>
          <div className="flow-box">
            <div className="flow-box-num">03 — TÁC ĐỘNG</div>
            <div className="flow-box-title">Quay trở lại</div>
            <div className="flow-box-desc">Thúc đẩy hoặc kìm hãm</div>
          </div>
        </div>
      </div>
      <div className="dual-grid">
        <div className="concept-card">
          <span className="card-label">Trục chính · vai trò quyết định</span>
          <h3 className="card-title">Tồn tại → Ý thức</h3>
          <p className="card-desc">Khi phương thức sản xuất thay đổi (từ phong kiến → tư bản → công nghiệp 4.0), thì hệ tư tưởng, đạo đức, pháp luật cũng thay đổi theo. Đời sống vật chất là gốc rễ.</p>
        </div>
        <div className="concept-card red-card">
          <span className="card-label">Trục phụ · không tuyệt đối hóa</span>
          <h3 className="card-title">Ý thức ⤺ Tồn tại</h3>
          <p className="card-desc">Ý thức tiên tiến thúc đẩy phát triển; ý thức lạc hậu kìm hãm. Nhưng tác động này luôn nằm trong giới hạn do tồn tại xã hội quy định.</p>
        </div>
      </div>
    </div>
  );
}
