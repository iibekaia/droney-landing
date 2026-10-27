# DRONEY landing

Independent, local-first Georgian landing page. No installation or build required.

## Run

```sh
npm start
```

Open http://localhost:4300. Set PORT to change the port. For static hosting, publish index.html, style.css, app.js, downloads.js and assets/. Do not publish server.cjs or README.md.

## Downloads

Edit downloads.js: version plus four public direct HTTPS asset URLs. Empty URLs render disabled buttons, never fake downloads. Source project version at creation: 0.0.3. The source GitHub repository is private; authenticated release links are unsuitable for public visitors. Publish installers to a public distribution location first. Update version and all URLs together. Installers are not bundled into this repository.

## Demo

Canvas illustration, not the DRONEY physics engine. Angle returns to level at neutral input; Acro keeps rotating while input is applied. Sliders or arrow keys when the canvas has focus; R resets. Slider release returns roll/pitch to neutral. Throttle changes the illustrative horizon and grid speed; it does not model real altitude. Offscreen animation pauses. Respects reduced-motion preference for decorative animation and automatic scenery movement.

## Project content

Support claims are based on ../droney/README.md, settings presets and electron-builder.json. DJI RC-N1 / RC231 uses serial DUML; no blanket compatibility claim for other DJI remotes. Branding and FiraGO font copied from the source project; font license included in assets/.
