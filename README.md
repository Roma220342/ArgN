# Argn — Today screen prototype

Clickable browser prototype of the two Today states from the Figma file
(`Trial` → `Design` page). Built to the frame size of iPhone 17 — 402 × 874.

## States

| URL | Figma frame | |
| --- | --- | --- |
| `/` | `Today Scroll` / `Today Full` | a day with scheduled tours, scrolling inside the 402 × 874 window |
| `/empty` | `Today Empty` | a day with no scheduled tours |

The two states are what the brief asks for. The empty one drops the zone
boundary: with no history below it, a second ground would separate nothing and
the line would promise content it cannot deliver.

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
- The bottom edge uses the `Scroll Effect` gradient mask from Figma — a 35 px
  fade leaving 44 px clear. The top edge does not fade to transparent: content
  keeps its ground and is progressively blurred instead (four stacked
  `backdrop-filter` layers), so the clock stays legible without a plate of
  colour behind it.
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
