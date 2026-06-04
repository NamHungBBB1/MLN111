# Skills & Repos sử dụng trong dự án

## Claude Skills

### `ui-ux-pro-max`
- **Nguồn:** [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- **Mô tả:** UI/UX design intelligence cho web và mobile. Bao gồm 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, và 25 chart types trên 10 tech stack.
- **Dùng để:** Định hướng thiết kế tổng thể — tone Soviet Agitprop Broadside × Modern Editorial, typography, hệ màu.

### `gsap-scrolltrigger` · `motion-framer` · `animejs`
- **Nguồn:** [freshtechbro/claudedesignskills](https://github.com/freshtechbro/claudedesignskills)
- **Cài đặt:** `/plugin marketplace add freshtechbro/claudedesignskills` → `/plugin install gsap-scrolltrigger` · `/plugin install motion-framer`
- **Mô tả:** Bộ 22 skills chuyên về animation và 3D cho web — GSAP, Framer Motion, Three.js, Anime.js, Vanta.js, Lottie...
- **Dùng để:** Implement GSAP ScrollTrigger (`ContentPage`, `ChatPanel`) và Framer Motion screen transitions (`GamePanel`).

### Claude Cookbook — Frontend Aesthetics (Color)
- **URL:** [platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)
- **Mô tả:** Hướng dẫn prompting cho thiết kế frontend — màu sắc, typography, aesthetic cohesion.
- **Dùng để:** Định hướng hệ màu dự án theo các nguyên tắc:
  - *Commit to a cohesive aesthetic* — dùng CSS variables thống nhất
  - *Dominant colors with sharp accents* — cream/ink chiếm phần lớn, đỏ `#C8102E` chỉ ở điểm nhấn
  - *Draw from cultural aesthetics* — lấy cảm hứng từ tờ báo tuyên truyền Liên Xô
  - *Avoid evenly-distributed palettes* — không dùng gradient tím trên nền trắng

---

## Repositories

### `Citedy/game-sounds`
- **URL:** [github.com/Citedy/game-sounds](https://github.com/Citedy/game-sounds)
- **CDN base:** `https://raw.githubusercontent.com/citedy/game-sounds/main/sounds/`
- **Mô tả:** Bộ sưu tập âm thanh game/phim (70+ tựa) phân loại theo sự kiện.
- **Dùng để:** Tham khảo và thử nghiệm trong quá trình phát triển; không còn dùng trực tiếp trong production.

### `incompetech.com` — Kevin MacLeod (CC-BY)
- **URL:** [incompetech.com](https://incompetech.com)
- **CDN base:** `https://incompetech.com/music/royalty-free/mp3-royaltyfree/`
- **Mô tả:** Thư viện nhạc royalty-free CC-BY của Kevin MacLeod.
- **Dùng để:** Ending music trong mini game:

| Ending | Track | Thời lượng |
|---|---|---|
| Good (A/B/C) | *Achaidh Cheide* | 2m14s |
| Bad (D) | *Long Road Ahead* | 2m26s |
