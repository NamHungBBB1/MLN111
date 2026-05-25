import React, { useState } from 'react';

const flashcardsData = [
  { id: 1, q: 'Tồn tại xã hội', a: 'Toàn bộ sinh hoạt vật chất và điều kiện sinh hoạt vật chất của xã hội — gồm phương thức sản xuất, điều kiện tự nhiên, dân số.', red: true },
  { id: 2, q: 'Ý thức xã hội', a: 'Mặt tinh thần của đời sống xã hội — phản ánh tồn tại xã hội trong những giai đoạn lịch sử nhất định.' },
  { id: 3, q: 'Phương thức sản xuất', a: 'Yếu tố cốt lõi nhất của tồn tại xã hội. Khi nó thay đổi, toàn bộ kiến trúc thượng tầng cũng thay đổi theo.', red: true },
  { id: 4, q: 'Tâm lý xã hội', a: 'Cấp độ thấp của ý thức xã hội — tình cảm, tâm trạng, thói quen hình thành tự phát từ đời sống hằng ngày.' },
  { id: 5, q: 'Hệ tư tưởng', a: 'Cấp độ cao của ý thức xã hội — hệ thống quan điểm, lý luận được xây dựng có hệ thống, phản ánh lợi ích giai cấp.', red: true },
  { id: 6, q: 'Tính lạc hậu', a: 'Ý thức xã hội thường tồn tại dai dẳng sau khi tồn tại xã hội đã thay đổi — do thói quen, truyền thống, lợi ích nhóm.' },
  { id: 7, q: 'Tính vượt trước', a: 'Tư tưởng tiên tiến có thể dự báo, đi trước thực tiễn, soi đường cho hành động cải tạo xã hội.', red: true },
  { id: 8, q: 'Tác động trở lại', a: 'Ý thức xã hội không thụ động — nó tác động ngược lên tồn tại xã hội theo hai hướng: thúc đẩy hoặc kìm hãm.' }
];

function Flashcard({ card, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flash-wrap ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
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
  );
}

export default function FlashcardsPanel() {
  return (
    <div className="tab-panel active">
      <div className="section-label">Phần 04 — Ôn tập tương tác</div>
      <h2 className="section-title">Lật để ghi nhớ</h2>
      <p style={{ fontFamily: "'Old Standard TT', serif", fontStyle: 'italic', marginBottom: '20px', color: 'var(--ink)' }}>
        Nhấp vào từng thẻ để xem đáp án. 8 thẻ tổng cộng.
      </p>
      <div className="flashcard-deck">
        {flashcardsData.map((card, idx) => (
          <Flashcard key={card.id} card={card} index={idx} />
        ))}
      </div>
    </div>
  );
}
