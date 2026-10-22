# Persistent public comments patch for Seraphic's birthday site

This patch adds a public cosmic-style comments section backed by Supabase. It uses the existing Next.js App Router and existing Framer Motion / lucide-react dependencies.

## Files
- `components/BirthdayComments.tsx` — client UI and public comments list.
- `app/api/comments/route.ts` — server-side GET/POST endpoint; keeps the Supabase service key out of the browser.
- `supabase/birthday_comments.sql` — database table setup.
- `globals.additions.css` — styles to append to your existing global stylesheet.
- `page-insertion.tsx.txt` — exact import and JSX insertion instructions.

## Setup
1. Create a Supabase project.
2. In Supabase Dashboard -> SQL Editor, run `supabase/birthday_comments.sql`.
3. Add these variables to `.env.local` and to Vercel Project Settings -> Environment Variables:
   ```env
   SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
   ```
   Find them in Supabase Project Settings -> API. The service-role key is secret: never prefix it with `NEXT_PUBLIC_`, never put it in client-side code, and never commit it.
4. Copy `components/BirthdayComments.tsx` into your project at `components/BirthdayComments.tsx`.
5. Copy `app/api/comments/route.ts` into your project at `app/api/comments/route.ts` (merge carefully if that route already exists).
6. Append `globals.additions.css` to your existing `app/globals.css` (remove the first explanatory comment if desired).
7. Follow `page-insertion.tsx.txt` to import and render the section inside the existing `{entered && <> ... </>}` content, after the birthday letter section and before the finale.
8. Restart the dev server after setting environment variables. Deploy to Vercel after adding the same variables there.

## Notes
- The page displays the newest 50 comments, newest first. Messages persist across refreshes and visitors.
- Name and message are length-validated on the server; React renders text safely rather than interpreting it as HTML.
- A hidden honeypot is included as basic bot friction, not a complete anti-spam system. For a public production site, add a serverless-compatible rate limiter and consider moderation/deletion controls if spam becomes an issue.
- The service-role key bypasses Supabase RLS, so it must remain server-only. The SQL intentionally enables RLS and does not grant public table access.
