# SERAPHIC — A Universe of Her Own

A cinematic birthday gift website built with Next.js 15, React, TypeScript, and Framer Motion. The design uses a midnight-blue, violet, and crimson palette with layered cosmic effects and interactive scenes.

## Features

- Animated cinematic intro with a universe-entry interaction
- Layered stars, shooting stars, auroras, cosmic dust, celestial rings, and a smooth scroll-progress line
- Floating portrait collage in the hero
- Expandable interest constellations for Formula 1, mechanical engineering, books, and writing
- Animated engineering blueprint scene
- Interactive character archive featuring Jinx, Vi, Caitlyn, Mel, Ambessa, Sevika, Atom Eve, Hermione Granger, SZA, and Pam Beesly
- Vinyl-inspired music player with play/pause controls and a local audio source
- Animated letter modal
- Final constellation scene with a hidden birthday message
- Responsive layouts and reduced-motion support

## Run locally

Install Node.js and npm if needed (Arch Linux):

```bash
sudo pacman -S nodejs npm
```

From the project directory:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add the song

The player expects a legally obtained audio file at:

`public/music/to-build-a-home.mp3`

Place the MP3 at that exact path. Playback starts after the visitor clicks the entrance button, because browsers generally block autoplay before user interaction. If the file is missing or playback fails, the site displays a hint instead of pretending the music is playing. Do not redistribute copyrighted audio unless you have permission.

## Character artwork

Character portrait backgrounds currently use external image URLs, so the browser needs an internet connection and the source hosts must allow image embedding. For the most reliable deployment, replace those URLs with locally supplied images in `public/images/` and update the `characters` array in `app/page.tsx`. Suggested filenames:

- `jinx.jpg`
- `vi.jpg`
- `caitlyn.jpg`
- `mel.jpg`
- `ambessa.jpg`
- `sevika.jpg`
- `atom-eve.jpg`
- `hermione.jpg`
- `sza.jpg`
- `pam-beesly.jpg`

Use images you have permission to use. If a host blocks an image, replace that character's `image` value with the path to a local image, for example `/images/jinx.jpg`.

## Customize the letter

Open `app/page.tsx` and find the `letter-body` section in the letter modal. Replace the sample message with your own words. The current note is written to feel warm and subtle for a close friend without inventing personal memories.

## Production build

```bash
npm run build
npm run start
```

The project uses the Next.js App Router. The `npm run lint` script may need adjustment for your installed Next.js version; use `npx tsc --noEmit` for a direct TypeScript check.

## Deploy to Vercel

Push the project to GitHub, import it at https://vercel.com/new, and keep the default Next.js build settings. You can also use:

```bash
npx vercel
```
