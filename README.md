# DRONEY landing

Independent, local-first Georgian landing page. No installation or build required.

## Run

```sh
npm start
```

Open http://localhost:4300. Set PORT to change the port. For static hosting, publish index.html, style.css, app.js, downloads.js and assets/. Do not publish server.cjs or README.md.

## Downloads

Download links follow the latest published release of https://github.com/iibekaia/droney-releases/releases automatically: app.js asks the GitHub API on page load and uses the assets named `droney-<version>-<platform file>`. downloads.js pins no version: if the API is unreachable or the latest release lacks any of the four assets, the buttons open https://github.com/iibekaia/droney-releases/releases/latest. Empty URLs render disabled buttons, never fake downloads. Installers are not bundled into this repository.

## Demo

Canvas illustration, not the DRONEY physics engine. Angle returns to level at neutral input; Acro keeps rotating while input is applied. Sliders or arrow keys when the canvas has focus; R resets. Slider release returns roll/pitch to neutral. Throttle changes the illustrative horizon and grid speed; it does not model real altitude. Offscreen animation pauses. Respects reduced-motion preference for decorative animation and automatic scenery movement.

## Project content

Support claims are based on ../droney/README.md, settings presets and electron-builder.json. DJI RC-N1 / RC231 uses serial DUML; no blanket compatibility claim for other DJI remotes. Branding and FiraGO font copied from the source project; font license included in assets/.

## Hero 3D viewer

model-viewer.js uses locally vendored Three.js (license in assets/vendor/THREE-LICENSE.txt) to show a 10" long-X FPV quad built procedurally in fpv-model.js, ported from the simulator's buildFpvModel (no model files to download). Props spin unless reduced motion is on. It keeps the simulator's colors; the carbon weave, battery wrap and battery label are canvas textures drawn at load, and a soft gradient environment map lights the metal parts. Drag to orbit, scroll/pinch to zoom, use arrow keys with the viewer focused, or reset the view. Reduced motion also disables automatic rotation. WebGL is required. Static deployments must also include model-viewer.js, fpv-model.js and the assets/vendor files.
