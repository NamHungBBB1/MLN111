# Skills & Repos sử dụng trong dự án

## Claude Skills

### `ui-ux-pro-max`
- **Nguồn:** [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- **Mô tả:** UI/UX design intelligence cho web và mobile. Bao gồm 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, và 25 chart types trên 10 tech stack.
- **Dùng để:** Định hướng thiết kế tổng thể cho giao diện — tone Soviet Agitprop Broadside × Modern Editorial, lựa chọn typography (Oswald, Lora, JetBrains Mono, Playfair Display), hệ màu (đỏ cờ, cream, ink).

---

## Color

> Tham khảo: [Claude Cookbook — Coding & Prompting for Frontend Aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)

### Nguyên tắc áp dụng trong dự án

- **Commit to a cohesive aesthetic** — Toàn bộ UI dùng một bộ CSS variables duy nhất, không pha trộn màu tuỳ tiện.
- **Dominant colors with sharp accents** — Màu nền cream/ink chiếm phần lớn, đỏ (`#C8102E`) chỉ xuất hiện tại điểm nhấn (border, badge, accent) để tạo tương phản mạnh.
- **Lấy cảm hứng từ cultural aesthetics** — Hệ màu mô phỏng tờ báo tuyên truyền Liên Xô (Soviet Agitprop Broadside): giấy cũ, mực in, đỏ cờ.
- **Tránh palette phân bổ đều** — Không dùng màu gradient tím trên nền trắng; thay vào đó là contrast cao, in ấn, editorial.

### CSS Variables (hệ màu thực tế)

```css
--red:        #C8102E   /* Đỏ cờ — accent chính */
--red-dark:   #8B0A1F   /* Đỏ sậm — hover, border */
--red-faint:  rgba(200,16,46,0.07)
--cream:      #F2E8CE   /* Giấy cũ — nền card */
--cream-dark: #E2D3AE
--ink:        #160E08   /* Mực in — text, border */
--ink-mid:    rgba(22,14,8,0.5)
--ink-faint:  rgba(22,14,8,0.07)
--paper:      #EAE0C4   /* Giấy — nền section */
--paper-dark: #D8CAA4
--gold:       #A87810   /* Vàng — chi tiết phụ */
```

---

## Repositories

### `Citedy/game-sounds`
- **URL:** [github.com/Citedy/game-sounds](https://github.com/Citedy/game-sounds)
- **CDN base:** `https://raw.githubusercontent.com/citedy/game-sounds/main/sounds/`
- **Mô tả:** Bộ sưu tập âm thanh game/phim được phân loại theo sự kiện (session-start, task-complete, error, permission...) cho 70+ tựa game.
- **Dùng để:** Âm thanh kết thúc trong mini game:

| Sự kiện | File |
|---|---|
| Good ending (A/B/C) | `final-fantasy/task-acknowledge/finale.mp3` |
| Bad ending (D) | `game-of-thrones/task-complete/rains-of-castamere.mp3` |
