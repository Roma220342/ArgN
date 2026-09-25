# Argn — Today screen prototype

Clickable browser prototype of the three Today states from the Figma file
(`Trial` → `Design` page). Built to the frame size of iPhone 17 — 402 × 874.

## States

| URL | Figma frame |
| --- | --- |
| `/` | `Today Scroll` — full content from `Today Full`, scrolling inside the 402 × 874 window |
| `/no-upcoming` | `Today Scroll No Upcoming` |
| `/empty` | `Today Empty` |

A switcher above the phone moves between them. On a phone-sized screen the
device fills the viewport and the switcher becomes a thin bar at the top.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

Import the folder as a Vite project, or:

```bash
npm i -g vercel
vercel
```

`vercel.json` rewrites every path to `index.html` so the state URLs work on
a direct hit or refresh.

## Notes on fidelity

- Type, colour, radii, padding and gaps are taken from the Figma nodes, not
  eyeballed. Key element positions were measured against the frame and match
  within 1 px.
- The scroll mask reproduces the `Scroll Effect` gradient from Figma (a 35 px
  fade leaving 44 px clear at the edge) and mirrors it at the top against the
  status bar, so content fades the same way going up as going down.
- The status bar is the exported Figma SVG, used as-is (`public/statusbar.svg`).
- Every icon is the SVG exported from Figma, path data verbatim, in
  `src/icons.jsx`. Only the fill is swapped so a tab can switch between the
  active and inactive colour. `chevron.right` is the one exception — no
  artwork was supplied for it, so it is drawn.
- The tab bar follows Apple's HIG description: it floats above content and its
  items rest on a translucent Liquid Glass background that lets content peek
  through. In CSS that is `backdrop-filter` (blur + saturation + brightness)
  over a 55%-opaque fill, a 1 px specular rim that brightens at opposite
  edges, and a soft ambient shadow. The gold record button is the tab bar's
  *accessory* in Apple's terms and carries the same rim.
- Not implemented from the HIG: the tab bar does not minimize on scroll
  (`TabBarMinimizeBehavior`), because the prototype has no scroll-driven
  chrome behaviour.
- Nothing is interactive except scrolling and the state switcher, as agreed.
