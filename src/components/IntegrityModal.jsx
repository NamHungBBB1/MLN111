import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Cam kết (trích nguyên văn tài liệu) ───────────────────
const commitGroups = [
  {
    lead: 'Không sử dụng AI để thay thế hoàn toàn quá trình học tập, nghiên cứu và xây dựng nội dung.',
  },
  {
    lead: 'AI chỉ được sử dụng như một công cụ hỗ trợ trong việc:',
    items: [
      'Gợi ý ý tưởng sản phẩm.',
      'Xây dựng câu hỏi trắc nghiệm.',
      'Thiết kế kịch bản trò chơi tương tác.',
      'Hỗ trợ trình bày và trực quan hóa nội dung.',
    ],
  },
  {
    lead: 'Mọi nội dung cuối cùng đều được nhóm:',
    items: [
      'Kiểm tra lại.',
      'Chỉnh sửa.',
      'Bổ sung dẫn chứng.',
      'Chịu trách nhiệm hoàn toàn về tính chính xác.',
    ],
  },
  {
    lead: 'Các nội dung học thuật được đối chiếu với:',
    items: [
      'Giáo trình Triết học Mác – Lênin.',
      'Tài liệu học tập do giảng viên cung cấp.',
      'Các văn bản và nguồn chính thống liên quan.',
    ],
  },
];

// ── Vai trò của AI trong dự án ─────────────────────────────
// Dòng "Claude (Claude Code)" được bổ sung cho đúng phần việc đã thực hiện.
const aiRoles = [
  {
    tool: 'ChatGPT',
    purpose: 'Gợi ý ý tưởng sản phẩm',
    output: 'Đề xuất trò chơi “Choose Your Life”.',
    edit: 'Điều chỉnh gameplay theo nội dung môn học.',
  },
  {
    tool: 'NotebookLM',
    purpose: 'Kiểm chứng về nguồn',
    output: 'Nội dung đã được kiểm chứng để nhóm sử dụng.',
    edit: 'Loại bỏ những phần nội dung bị sai lệch hoặc thiếu.',
  },
  {
    tool: 'Claude (Claude Code)',
    purpose: 'Hỗ trợ thiết kế giao diện & lập trình website và trò chơi.',
    output: 'Mã nguồn giao diện website (Hero, phần nội dung, hoạt ảnh cuộn trang), trợ lý hỏi–đáp COMRADE.AI và trò chơi mô phỏng quy luật “tồn tại xã hội quyết định ý thức xã hội”.',
    edit: 'Kiểm tra lại tính chính xác của nội dung triết học, tinh chỉnh bố cục — màu sắc — typography, hiệu đính câu chữ tiếng Việt và chịu trách nhiệm hoàn toàn về nội dung cuối cùng.',
    highlight: true,
  },
];

const roleFields = [
  ['Mục đích sử dụng', 'purpose'],
  ['Kết quả AI tạo ra', 'output'],
  ['Chỉnh sửa của nhóm', 'edit'],
];

export default function IntegrityModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* ── Trigger ở cuối trang ── */}
      <div className="integrity-bar">
        <button className="integrity-trigger" onClick={() => setOpen(true)}>
          <span className="integrity-trigger-seal">✦</span>
          <span className="integrity-trigger-text">Cam kết AI &amp; Liêm chính học thuật</span>
          <span className="integrity-trigger-arrow">→</span>
        </button>
      </div>

      {/* ── Popup ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="integrity-overlay"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="integrity-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="integrity-title"
            >
              {/* Header */}
              <div className="integrity-header">
                <div>
                  <div className="integrity-kicker">★ Nhóm 7 · Triết học Mác–Lênin ★</div>
                  <h2 className="integrity-title" id="integrity-title">Cam kết Liêm chính Học thuật</h2>
                </div>
                <button className="integrity-close" onClick={() => setOpen(false)} aria-label="Đóng">✕</button>
              </div>

              {/* Body */}
              <div className="integrity-body">
                <p className="integrity-lead">
                  Trong quá trình thực hiện sản phẩm, nhóm cam kết:
                </p>

                <ul className="integrity-commit">
                  {commitGroups.map((g, i) => (
                    <li key={i}>
                      <span className="integrity-commit-lead">{g.lead}</span>
                      {g.items && (
                        <ul className="integrity-sub">
                          {g.items.map((it, j) => <li key={j}>{it}</li>)}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="integrity-declare">
                  <div className="integrity-declare-label">Tuyên bố</div>
                  <p>
                    Chúng tôi cam kết sản phẩm là kết quả của quá trình nghiên cứu, sáng tạo
                    và biên soạn của nhóm; AI chỉ đóng vai trò hỗ trợ, không thay thế hoạt động
                    học thuật của sinh viên.
                  </p>
                </div>

                <div className="integrity-section-label">Vai trò của AI trong dự án</div>
                <div className="integrity-roles">
                  {aiRoles.map((r) => (
                    <div
                      key={r.tool}
                      className={`integrity-role ${r.highlight ? 'is-highlight' : ''}`}
                    >
                      <div className="integrity-role-tool">
                        {r.tool}
                        {r.highlight && <span className="integrity-role-badge">Trang web này</span>}
                      </div>
                      <dl className="integrity-role-grid">
                        {roleFields.map(([label, key]) => (
                          <div className="integrity-role-row" key={key}>
                            <dt>{label}</dt>
                            <dd>{r[key]}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer / seal */}
              <div className="integrity-foot">
                <span>Sản phẩm Nhóm 7 — 2026</span>
                <button className="integrity-ok" onClick={() => setOpen(false)}>Đã hiểu →</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
