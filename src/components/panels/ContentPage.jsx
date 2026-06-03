import React, { useState } from 'react';

const flashcardsData = [
  { id: 1, q: 'Tồn tại xã hội', a: 'Toàn bộ sinh hoạt vật chất và điều kiện sinh hoạt vật chất của xã hội — gồm phương thức sản xuất, điều kiện tự nhiên, dân số.', red: true },
  { id: 2, q: 'Ý thức xã hội', a: 'Mặt tinh thần của đời sống xã hội — phản ánh tồn tại xã hội trong những giai đoạt lịch sử nhất định.' },
  { id: 3, q: 'Phương thức sản xuất', a: 'Yếu tố cốt lõi nhất của tồn tại xã hội. Khi nó thay đổi, toàn bộ kiến trúc thượng tầng cũng thay đổi theo.', red: true },
  { id: 4, q: 'Tâm lý xã hội', a: 'Cấp độ thấp của ý thức xã hội — tình cảm, tâm trạng, thói quen hình thành tự phát từ đời sống hằng ngày.' },
  { id: 5, q: 'Hệ tư tưởng', a: 'Cấp độ cao của ý thức xã hội — hệ thống quan điểm, lý luận được xây dựng có hệ thống, phản ánh lợi ích giai cấp.', red: true },
  { id: 6, q: 'Tính lạc hậu', a: 'Ý thức xã hội thường tồn tại dai dẳng sau khi tồn tại xã hội đã thay đổi — do thói quen, truyền thống, lợi ích nhóm.' },
  { id: 7, q: 'Tính vượt trước', a: 'Tư tưởng tiên tiến có thể dự báo, đi trước thực tiễn, soi đường cho hành động cải tạo xã hội.', red: true },
  { id: 8, q: 'Tác động trở lại', a: 'Ý thức xã hội không thụ động — nó tác động ngược lên tồn tại xã hội theo hai hướng: thúc đẩy hoặc kìm hãm.' },
];

function Flashcard({ card, index }) {
  const [flipped, setFlipped] = useState(false);
  const delayClass = `rd${(index % 4) + 1}`;
  return (
    <div className={`reveal ${delayClass}`}>
      <div
        className={`flash-wrap ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flash">
          <div className="flash-face flash-front">
            <div className="flash-meta"><span>THẺ {String(index + 1).padStart(2, '0')}/08</span><span>★</span></div>
            <div className="flash-q">{card.q}</div>
            <div className="flash-hint">Nhấp để lật →</div>
          </div>
          <div className={`flash-face flash-back ${card.red ? 'red-back' : ''}`}>
            <div className="flash-meta"><span>ĐỊNH NGHĨA</span><span>★</span></div>
            <div className="flash-a">{card.a}</div>
            <div className="flash-hint">← Lật lại</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContentPage() {
  return (
    <div className="tab-panel">

      {/* ── SECTION 01: Lý thuyết ── */}
      <div className="content-section">
        <div className="ghost-num" aria-hidden="true">01</div>
        <div className="section-label reveal">Phần 01 — Khái niệm nền tảng</div>
        <h2 className="section-title reveal rd1">Hai phạm trù đối lập</h2>
        <div className="dual-grid">
          <div className="concept-card red-card reveal rd1">
            <span className="card-label">Cái quyết định</span>
            <h3 className="card-title">Tồn tại xã hội</h3>
            <p className="card-desc">Toàn bộ sinh hoạt vật chất và điều kiện sinh hoạt vật chất của xã hội. Tồn tại khách quan, độc lập với ý thức con người.</p>
            <ul className="card-list">
              <li>Phương thức sản xuất vật chất (yếu tố cốt lõi)</li>
              <li>Điều kiện tự nhiên, hoàn cảnh địa lý</li>
              <li>Dân số và mật độ dân cư</li>
            </ul>
          </div>
          <div className="concept-card reveal rd2">
            <span className="card-label">Cái bị quyết định</span>
            <h3 className="card-title">Ý thức xã hội</h3>
            <p className="card-desc">Toàn bộ đời sống tinh thần của xã hội — phản ánh tồn tại xã hội trong một giai đoạn lịch sử nhất định.</p>
            <ul className="card-list">
              <li>Tâm lý xã hội &amp; hệ tư tưởng</li>
              <li>Chính trị, pháp quyền, đạo đức, tôn giáo</li>
              <li>Khoa học, nghệ thuật, triết học</li>
            </ul>
          </div>
        </div>

        <div className="section-label reveal" style={{ marginTop: '32px' }}>Ba tính chất của ý thức xã hội</div>
        <div className="principle-grid">
          <div className="principle-box reveal rd1">
            <div className="principle-num">01</div>
            <div className="principle-text"><strong>Tính lạc hậu</strong> — ý thức cũ thường tồn tại lâu hơn tồn tại xã hội đã sinh ra nó.</div>
          </div>
          <div className="principle-box reveal rd2">
            <div className="principle-num">02</div>
            <div className="principle-text"><strong>Tính vượt trước</strong> — tư tưởng tiên tiến có thể đi trước, dự báo xu hướng phát triển.</div>
          </div>
          <div className="principle-box reveal rd3">
            <div className="principle-num">03</div>
            <div className="principle-text"><strong>Tính tác động trở lại</strong> — ý thức xã hội tác động ngược lên tồn tại xã hội, theo hai hướng.</div>
          </div>
        </div>
      </div>

      {/* ── SECTION 02: Quy luật ── */}
      <div className="content-section">
        <div className="ghost-num" aria-hidden="true">02</div>
        <div className="section-label reveal">Phần 02 — Quy luật vận động</div>
        <h2 className="section-title reveal rd1">Cơ chế quyết định</h2>
        <div className="flow-diagram reveal rd2">
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
          <div className="concept-card reveal rd3">
            <span className="card-label">Trục chính · vai trò quyết định</span>
            <h3 className="card-title">Tồn tại → Ý thức</h3>
            <p className="card-desc">Khi phương thức sản xuất thay đổi (từ phong kiến → tư bản → công nghiệp 4.0), thì hệ tư tưởng, đạo đức, pháp luật cũng thay đổi theo. Đời sống vật chất là gốc rễ.</p>
          </div>
          <div className="concept-card red-card reveal rd4">
            <span className="card-label">Trục phụ · không tuyệt đối hóa</span>
            <h3 className="card-title">Ý thức ⤺ Tồn tại</h3>
            <p className="card-desc">Ý thức tiên tiến thúc đẩy phát triển; ý thức lạc hậu kìm hãm. Nhưng tác động này luôn nằm trong giới hạn do tồn tại xã hội quy định.</p>
          </div>
        </div>
      </div>

      {/* ── SECTION 03: Dẫn chứng ── */}
      <div className="content-section">
        <div className="ghost-num" aria-hidden="true">03</div>
        <div className="section-label reveal">Phần 03 — Liên hệ thực tiễn đương đại</div>
        <h2 className="section-title reveal rd1">Dẫn chứng sống động</h2>
        <div className="evidence-stack">
          <div className="evidence-item reveal rd1">
            <div className="evidence-num">01</div>
            <span className="evidence-tag">Cách mạng 4.0</span>
            <h4 className="evidence-title">AI sinh ra hệ giá trị mới</h4>
            <div className="evidence-body">Khi ChatGPT, AI tạo sinh trở thành lực lượng sản xuất mới (tồn tại xã hội), quan niệm "việc làm", "sáng tạo", "trí tuệ" — tức ý thức xã hội — đã biến đổi sâu sắc. Sinh viên hôm nay nhìn việc viết tiểu luận hoàn toàn khác với 5 năm trước.</div>
          </div>
          <div className="evidence-item reveal rd2">
            <div className="evidence-num">02</div>
            <span className="evidence-tag">Kinh tế số Việt Nam</span>
            <h4 className="evidence-title">Shopee, Grab thay đổi tâm lý xã hội</h4>
            <div className="evidence-body">Khi nền kinh tế chia sẻ (sharing economy) lan rộng, quan niệm "sở hữu" thay đổi — người trẻ chuộng thuê hơn mua, ưu tiên trải nghiệm hơn tài sản. Cái mới về tồn tại đẻ ra cái mới về ý thức.</div>
          </div>
          <div className="evidence-item reveal rd3">
            <div className="evidence-num">03</div>
            <span className="evidence-tag">Tính lạc hậu của ý thức</span>
            <h4 className="evidence-title">Tư tưởng "trọng nam khinh nữ"</h4>
            <div className="evidence-body">Việt Nam đã chuyển sang nền kinh tế hiện đại, phụ nữ tham gia bình đẳng vào sản xuất. Nhưng tư tưởng phong kiến vẫn tồn tại trong một bộ phận dân cư — chính là minh chứng cho tính lạc hậu của ý thức so với tồn tại.</div>
          </div>
          <div className="evidence-item reveal rd4">
            <div className="evidence-num">04</div>
            <span className="evidence-tag">Tính vượt trước</span>
            <h4 className="evidence-title">Tư tưởng Hồ Chí Minh</h4>
            <div className="evidence-body">Khi Việt Nam còn là thuộc địa nửa phong kiến, Bác đã tiếp thu chủ nghĩa Mác-Lênin — hệ tư tưởng tiên tiến — để dẫn đường cách mạng. Ý thức tiên tiến đi trước, soi sáng con đường biến đổi tồn tại xã hội.</div>
          </div>
          <div className="evidence-item reveal rd5">
            <div className="evidence-num">05</div>
            <span className="evidence-tag">Biến đổi khí hậu</span>
            <h4 className="evidence-title">Lối sống xanh — green lifestyle</h4>
            <div className="evidence-body">Khi tồn tại vật chất bị đe dọa (môi trường suy thoái, nguồn lực cạn kiệt), một hệ ý thức mới về tiêu dùng bền vững, sống tối giản, bảo vệ môi trường ra đời và lan rộng trong giới trẻ.</div>
          </div>
        </div>
      </div>

      {/* ── SECTION 04: Flashcard ── */}
      <div className="content-section">
        <div className="ghost-num" aria-hidden="true">04</div>
        <div className="section-label reveal">Phần 04 — Ôn tập tương tác</div>
        <h2 className="section-title reveal rd1">Lật để ghi nhớ</h2>
        <p className="reveal rd2" style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', marginBottom: '20px', color: 'var(--ink)' }}>
          Nhấp vào từng thẻ để xem đáp án. 8 thẻ tổng cộng.
        </p>
        <div className="flashcard-deck">
          {flashcardsData.map((card, idx) => (
            <Flashcard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>

    </div>
  );
}
