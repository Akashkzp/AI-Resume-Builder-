# AI Resume Builder — Build Track (Project 3)

KodNest Premium Build System — route rail and gating only (no resume features yet).

## Routes

- `/rb/01-problem` … `/rb/08-ship` — 8 steps with gating and artifact storage
- `/rb/proof` — Proof & submission (8 step statuses, Lovable/GitHub/Deploy links, Copy Final Submission)

## Layout

- Top bar, context header, main workspace (70%), secondary build panel (30%), proof footer
- Off-white background `#F7F6F3`, serif headings, accent `#8B0000`, max text width 720px

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); root redirects to `/rb/01-problem`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com), **Add New Project** and import the repo.
3. Framework: **Next.js** (auto-detected). Root directory: `.`
4. Deploy. Your **Deploy link** will be `https://<project>.vercel.app`.

## Deploy (Netlify)

1. Push this repo to GitHub.
2. In [Netlify](https://netlify.com), **Add new site** → **Import from Git** and select the repo.
3. Build command: `npm run build`. Use the Netlify Next.js runtime (auto-detected when using Next.js).
4. Deploy. Use the generated site URL as your **Deploy link**.

## Verification

- Visit each route; all should render (no 404).
- Open `/rb/04-hld` without completing steps 1–3: step content should be locked.
- Upload an artifact for Step 1 in the build panel; Step 2’s “Next” should unlock.
- Refresh: artifact should still be stored (localStorage keys `rb_step_X_artifact`).
- On `/rb/proof`: check 8 step statuses, Lovable/GitHub/Deploy inputs, and **Copy Final Submission**.
