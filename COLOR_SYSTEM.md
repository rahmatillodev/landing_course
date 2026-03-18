# Color system (IELTSCORE landing)

## CSS variables (`:root` in `styles.css`)

| Token | Role |
|-------|------|
| `--color-primary` / `--color-primary-hover` | Primary blue: links, labels, bullets, secondary buttons |
| `--color-secondary` | Soft blue section bands |
| `--cta` / `--cta-hover` / `--cta-text` | Orange CTA (conversion) |
| `--bg-main` | Page background (`#F8FAFC`) |
| `--text-primary` / `--text-muted` | Body copy |
| `--text-on-dark` / `--text-on-dark-muted` | Copy on navy/hero |
| `--navy` | Footer + dark sections (flat, no gradient) |
| `--hero-1` … `--hero-5` | Hero gradient stops only |

## Tailwind (`index.html` inline config)

- `bg-primary`, `text-primary`, `bg-secondary`, `bg-cta`, `text-cta`, `from-navy`, etc.
- Legacy `brand.*` kept for compatibility.

## Example usage

**Hero (gradient only here)**

```html
<section id="hero" class="hero-section">…</section>
```

Background is set in CSS: `linear-gradient(135deg, var(--hero-1) … var(--hero-5))`.

**Soft blue band + white card**

```html
<section class="section-bg-soft-blue">…</section>
```

**Navy band (mentor, urgency, form, results)**

```html
<section class="section-bg-navy">…</section>
```

**Primary CTA**

```html
<a href="#form" class="btn-brand btn-brand--xl">Joyni band qilish</a>
```

**Secondary action (outline blue, not orange)**

```html
<a class="btn-pill btn-pill--primary">…</a>
```
