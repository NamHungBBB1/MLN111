# Marx React App

Ứng dụng web học tập về **Tồn tại xã hội và Ý thức xã hội** trong triết học Mác - Lênin. Được xây dựng bằng React 19 + Vite, tích hợp AI hỏi đáp qua Google Gemini.

---

## Giới thiệu

Đây là nền tảng học tập tương tác dành cho sinh viên và người học triết học Mác - Lênin tại Việt Nam. Ứng dụng bao gồm nội dung lý thuyết có cấu trúc, thẻ ôn tập (flashcard), ví dụ thực tiễn đương đại, và trợ lý AI COMRADE.AI để giải đáp câu hỏi.

---

## Tính năng

| Tab | Tên | Mô tả |
|-----|-----|-------|
| 01 | Lý thuyết | Giải thích hai phạm trù Tồn tại & Ý thức xã hội và 3 tính chất của Ý thức xã hội |
| 02 | Quy luật | Sơ đồ trực quan về cơ chế quyết định và tác động qua lại |
| 03 | Bằng chứng | 5 ví dụ thực tiễn đương đại (AI, kinh tế chia sẻ, biến đổi khí hậu...) |
| 04 | Flashcard | 8 thẻ ôn tập có hiệu ứng lật 3D |
| 05 | Chat AI | Trợ lý COMRADE.AI hỏi đáp theo nguyên lý duy vật lịch sử |

---

## Công nghệ sử dụng

- **React 19** — Thư viện UI
- **Vite 8** — Công cụ build và dev server
- **Google Generative AI (Gemini 2.5 Flash)** — Nền tảng AI cho tính năng chat
- **React Markdown** — Render Markdown trong phản hồi của AI
- **CSS3 thuần** — Styling thủ công, không dùng framework CSS

---

## Cài đặt và chạy

### Yêu cầu

- Node.js >= 18
- Tài khoản Google AI Studio để lấy API key Gemini

### Các bước

**1. Cài đặt thư viện**

```bash
npm install
```

**2. Cấu hình biến môi trường**

Sao chép file `.env.example` thành `.env` và điền API key:

```bash
cp .env.example .env
```

Nội dung file `.env`:

```
VITE_GEMINI_API_KEY="your_gemini_api_key_here"
```

Lấy API key tại: https://aistudio.google.com/app/apikey

**3. Khởi động server phát triển**

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## Lệnh npm

| Lệnh | Mô tả |
|------|-------|
| `npm run dev` | Khởi động dev server với hot reload |
| `npm run build` | Build production vào thư mục `/dist` |
| `npm run preview` | Xem trước bản build production |
| `npm run lint` | Kiểm tra lỗi code với ESLint |

---

## Cấu trúc thư mục

```
marx-react-app/
├── public/
│   ├── knowledge.md        # Kiến thức nền cho AI (system prompt)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.jsx            # Điểm vào của ứng dụng
│   ├── App.jsx             # Component gốc, quản lý tab
│   ├── index.css           # Toàn bộ styling
│   └── components/
│       ├── Hero.jsx        # Phần tiêu đề
│       ├── Tabs.jsx        # Thanh điều hướng tab
│       ├── QuoteBlock.jsx  # Trích dẫn Karl Marx
│       ├── Footer.jsx      # Chân trang
│       └── panels/
│           ├── TheoryPanel.jsx     # Tab 01: Lý thuyết
│           ├── LawPanel.jsx        # Tab 02: Quy luật
│           ├── EvidencePanel.jsx   # Tab 03: Bằng chứng
│           ├── FlashcardsPanel.jsx # Tab 04: Flashcard
│           └── ChatPanel.jsx       # Tab 05: Chat AI
├── .env.example            # Mẫu biến môi trường
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Cấu hình AI

Trợ lý **COMRADE.AI** sử dụng file `public/knowledge.md` làm system prompt. File này chứa:

- Định nghĩa Tồn tại xã hội và Ý thức xã hội
- Quy luật quyết định của Karl Marx (1859)
- 3 tính chất của Ý thức xã hội (lạc hậu, vượt trước, tác động trở lại)
- Các ví dụ liên hệ thực tiễn đương đại

Để mở rộng kiến thức của AI, chỉnh sửa file `public/knowledge.md`.

---

## Lưu ý bảo mật

- API key Gemini được lưu trong file `.env` — **không commit file này lên git**
- File `.gitignore` đã loại trừ `.env` theo mặc định
- Đây là ứng dụng SPA thuần client-side; API key sẽ hiển thị trong bundle nếu deploy công khai — chỉ dùng cho mục đích học tập hoặc cần proxy server khi deploy thực tế
