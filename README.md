# CD IELTS course landing page

Website-only flow: visitors fill the form on the page; leads are saved to Supabase and sent to Facebook for lead ads. No bot redirect.

## 1. Config

Configuration lives in `script.js` (object `LANDING_CONFIG`). Set:

- **SUPABASE_URL** — Supabase project URL (e.g. `https://xxxx.supabase.co`)
- **SUPABASE_ANON_KEY** — Supabase anon (public) key
- **SUPABASE_TABLE_LEADS** — table name for leads (default `course_leads`)
- **FACEBOOK_PIXEL_ID** — Meta Pixel ID for lead ads (optional; leave `''` to skip Pixel)

(.env is not available in the browser for this static site; use a build step if you need env-based config.)

## 2. Supabase

1. In Supabase: **SQL Editor** → run the script `supabase_course_leads.sql`.
2. This creates the `course_leads` table and RLS (anonymous insert allowed, no public read).

## 3. Facebook

- **Pixel**: If `FACEBOOK_PIXEL_ID` is set, the page loads the Meta Pixel and sends `PageView` on load and `Lead` on successful form submit.
- **Lead ads**: Use your **landing page URL** as the destination in Facebook Ads (e.g. `https://your-domain.com/` or with UTM: `https://your-domain.com/?utm_source=facebook&utm_campaign=...`). Leads from the form are stored in Supabase with attribution (utm_*, fbclid, fbp, fbc).

## 4. Check that data is saved

1. Open the site, fill and submit the form (“Kursga yozilish”).
2. In Supabase: **Table Editor** → `course_leads`. You should see a new row with `full_name`, `phone`, `created_at`, and attribution columns.

If the form shows “Supabase not configured”, set valid `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `LANDING_CONFIG` in `script.js`.
