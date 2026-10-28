// No pinned version: app.js swaps these for the latest release's direct asset links at runtime.
// If the GitHub API is unreachable, the buttons open the latest release page instead.
const latest = 'https://github.com/iibekaia/droney-releases/releases/latest';
window.DRONEY_DOWNLOADS = {
  version: '',
  windowsSetup: latest,
  windowsPortable: latest,
  mac: latest,
  linux: latest
};
