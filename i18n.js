// Georgian/English copy. Elements opt in with data-i18n (inner HTML) or data-i18n-aria (aria-label).
(() => {
 const dict = {
  ka: {
   'meta.title': 'DRONEY — შენი პირველი ფრენა აქ იწყება',
   'meta.description': 'DRONEY — დრონის ფრენის სიმულატორი. FPV რბოლა, თავისუფალი ფრენა და პულტით ვარჯიში Windows, macOS და Linux-ზე.',
   'lang.group': 'ენა',
   'nav.label': 'მთავარი ნავიგაცია',
   'nav.try': 'გამოცადე',
   'nav.support': 'მხარდაჭერა',
   'nav.download': 'გადმოწერა ↗',
   'hero.eyebrow': 'ფრენის სიმულატორი / DESKTOP',
   'hero.title': 'ჯერ აქ იფრინე.<br><em>მერე — ყველგან.</em>',
   'hero.intro': 'პირველი აფრენიდან ზუსტ მანევრებამდე. გაიცანი დრონის მართვა, გაიარე რბოლის ტრასა და იპოვე შენი ფრენის სტილი DRONEY-ში.',
   'hero.cta': 'გადმოწერე DRONEY <span>↓</span>',
   'hero.demo': 'სცადე ინტერაქტიული დემო ↗',
   'hero.input': 'კლავიატურა ან პულტი',
   'model.region': 'DJI Mini 3-ის ინტერაქტიული 3D მოდელი',
   'model.canvas': 'DJI Mini 3 — გადაათრიე მოდელის შესაბრუნებლად; ისრები — შემობრუნება',
   'model.loading': '3D მოდელი იტვირთება…',
   'model.failed': 'მოდელი ვერ ჩაიტვირთა. სცადე მდგომარეობის ხელახლა არჩევა.',
   'model.contextLost': '3D ხედი შეჩერდა. განაახლე გვერდი.',
   'model.noWebgl': '3D ხედისთვის საჭიროა WebGL-ის მხარდაჭერა. სცადე თანამედროვე ბრაუზერი.',
   'model.state': 'მოდელის მდგომარეობა',
   'model.unfolded': 'გაშლილი',
   'model.folded': 'დაკეცილი',
   'model.reset': '3D ხედის აღდგენა',
   'model.hint': 'გადაათრიე — შემობრუნება · სქროლი — მოახლოება',
   'spec.physics': 'ფიზიკის ბიჯი',
   'spec.styles': 'ორი ფრენის სტილი',
   'spec.views': '3 ხედვა',
   'spec.controller': 'შენი პულტი',
   'spec.memory': 'შენი კუნთის მეხსიერება',
   'demo.title': 'შეიგრძენი მართვა.',
   'demo.lead': 'ამოძრავე სტიკები და ნახე დრონის რეაქცია.<br>ეს გამარტივებული ვებდემოა; სრული სიმულატორი აპშია.',
   'demo.canvas': 'გამარტივებული დრონის დემო',
   'demo.maneuver': 'შენი შემდეგი მანევრი.',
   'demo.modeGroup': 'დემოს რეჟიმი',
   'demo.angle': 'სტიკის გაშვებისას დრონი თანდათან სწორდება.',
   'demo.acro': 'სტიკი ბრუნვის სიჩქარეს ცვლის; ნულზე დახრა რჩება.',
   'demo.reset': '↺ საწყის პოზიციაზე',
   'demo.hint': 'მართე სლაიდერებით ან ისრებით, როცა დემო ფოკუსშია.',
   'worlds.title': 'ერთი სიმულატორი. სხვადასხვა მიზანი.',
   'worlds.fpv.title': 'FPV და თავისუფალი ფრენა',
   'worlds.fpv.text': 'ივარჯიშე Acro და Angle რეჟიმებში. მოარგე Betaflight rates შენს სტილს და გადართე FPV, Chase ან LOS კამერაზე.',
   'worlds.race.title': 'ტრასა და საუკეთესო წრე',
   'worlds.race.text': 'გაიარე რკალები სწორი თანმიმდევრობით. გაზომე წრის დრო, შეადარე საუკეთესოს და გააუმჯობესე შენი შედეგი.',
   'worlds.stable.title': 'სტაბილიზებული ფრენა',
   'worlds.stable.text': 'აირჩიე DJI ტიპის დრონი Normal ან Sport რეჟიმით. ივარჯიშე პოზიციისა და სიმაღლის შენარჩუნებით და კამერის მართვით.',
   'worlds.env.title': 'სამი სამყარო',
   'worlds.env.text': 'მდელო სოფლის სახლებით, კანიონი ნაკადულით და ზამთრის ხეობა საბაგიროთი და გაყინული ტბით. შეფრინდი სახლებში, ხეების ქვეშ და საბაგიროს გვარლებს შორის — წყალთან შეხება კი ფრენას ამთავრებს.',
   'worlds.levels.title': 'დონეები და გამოცდა',
   'worlds.levels.text': 'ყოველ ტრასას ექვსი დონე აქვს, მათ შორის ტრიუკები (power loop, split-S, Matty flip, dive) და მოძრავი დაბრკოლებები. გამოცდის რეჟიმში დონეები თანმიმდევრობით იხსნება.',
   'worlds.updates.title': 'ავტომატური განახლება',
   'worlds.updates.text': 'Windows-ის ინსტალერი და Linux AppImage ახალ ვერსიას თავად ჩამოტვირთავს და დახურვისას დააყენებს; macOS-ზე აპი ახალ DMG-ს შემოგთავაზებს. Portable ვერსია არ ახლდება.',
   'support.title': 'უკვე გაქვს პულტი?<br><em>დაიწყე მისით.</em>',
   'support.lead': 'Setup-ში დააკალიბრე არხები, შეამოწმე მიმართულებები და მოირგე მართვა.',
   'support.edgetx': 'USB Joystick რეჟიმი, არხების ამოცნობა და Arm switch-ის მიბმა.',
   'support.dji': 'ქვედა USB-C პორტით, DUML სერიული კავშირი desktop აპში. სხვა DJI პულტებთან თავსებადობა დადასტურებული არ არის.',
   'support.gamepad.title': 'Gamepad და კლავიატურა',
   'support.gamepad.text': 'Xbox / PlayStation სტანდარტული mapping ან კლავიატურა. W/S — throttle, A/D — yaw, ისრები — pitch/roll.',
   'download.title': 'მზად ხარ ასაფრენად?',
   'download.lead': 'აირჩიე შენი პლატფორმა და დაიწყე ვარჯიში.',
   'download.installer': 'x64 · ინსტალერი',
   'download.portable': 'x64 · ინსტალაციის გარეშე',
   'download.action': 'გადმოწერა ↓',
   'download.soon': 'მალე დაემატება',
   'download.version': 'ვერსია {version} · აირჩიე ხელმისაწვდომი პაკეტი.',
   'download.latest': 'ბოლო ვერსია · აირჩიე ხელმისაწვდომი პაკეტი.',
   'download.pending': 'ჩამოტვირთვები მომზადების პროცესშია. საჯარო რელიზის ფაილები ჯერ არ არის მიბმული.',
   'download.signing.title': 'პირველი გაშვება და ხელმოწერა',
   'download.signing.text': 'მიმდინარე პაკეტებისთვის code signing და macOS notarization კონფიგურირებული არ არის. ჩამოტვირთე მხოლოდ სანდო წყაროდან და გადაამოწმე რელიზის SHA256SUMS. Windows-ის installer ინსტალაციის ადგილს არჩევინებს; Portable ვერსიას ინსტალაცია არ სჭირდება. Linux AppImage-ს შეიძლება შესრულების უფლება დასჭირდეს.',
   'download.first.title': 'როგორ დავიწყო პირველი ფრენა?',
   'download.first.text': 'შეარჩიე დრონის ტიპი, შეამოწმე Setup და კალიბრაცია. Space — Arm/Disarm, R — Reset, C — კამერა, M — ფრენის რეჟიმი, Esc — Setup. დაიწყე მცირე throttle-ით.',
   'footer.made': 'შექმნილია ფრენის შესასწავლად.',
   'footer.download': 'გადმოწერა ↑'
  },
  en: {
   'meta.title': 'DRONEY — Your first flight starts here',
   'meta.description': 'DRONEY — a drone flight simulator. FPV racing, free flight and controller training on Windows, macOS and Linux.',
   'lang.group': 'Language',
   'nav.label': 'Main navigation',
   'nav.try': 'Try it',
   'nav.support': 'Support',
   'nav.download': 'Download ↗',
   'hero.eyebrow': 'FLIGHT SIMULATOR / DESKTOP',
   'hero.title': 'Fly here first.<br><em>Then — everywhere.</em>',
   'hero.intro': 'From your first takeoff to precise maneuvers. Learn to control a drone, run the race track and find your flying style in DRONEY.',
   'hero.cta': 'Download DRONEY <span>↓</span>',
   'hero.demo': 'Try the interactive demo ↗',
   'hero.input': 'KEYBOARD OR CONTROLLER',
   'model.region': 'Interactive 3D model of the DJI Mini 3',
   'model.canvas': 'DJI Mini 3 — drag to rotate the model; arrow keys rotate it',
   'model.loading': 'Loading 3D model…',
   'model.failed': 'The model failed to load. Try selecting the state again.',
   'model.contextLost': 'The 3D view stopped. Reload the page.',
   'model.noWebgl': 'The 3D view needs WebGL support. Try a modern browser.',
   'model.state': 'Model state',
   'model.unfolded': 'Unfolded',
   'model.folded': 'Folded',
   'model.reset': 'Reset 3D view',
   'model.hint': 'Drag — rotate · Scroll — zoom',
   'spec.physics': 'physics step',
   'spec.styles': 'two flight styles',
   'spec.views': '3 views',
   'spec.controller': 'Your controller',
   'spec.memory': 'your muscle memory',
   'demo.title': 'Take the sticks.',
   'demo.lead': 'Move the sticks and watch the drone respond.<br>This is a simplified web demo; the full simulator is in the app.',
   'demo.canvas': 'Simplified drone demo',
   'demo.maneuver': 'Your next maneuver.',
   'demo.modeGroup': 'Demo mode',
   'demo.angle': 'Release the stick and the drone gradually levels out.',
   'demo.acro': 'The stick sets the rotation rate; at center the tilt stays.',
   'demo.reset': '↺ Reset position',
   'demo.hint': 'Use the sliders, or the arrow keys while the demo is focused.',
   'worlds.title': 'One simulator. Different goals.',
   'worlds.fpv.title': 'FPV and free flight',
   'worlds.fpv.text': 'Practice in Acro and Angle modes. Tune Betaflight rates to your style and switch between FPV, Chase and LOS cameras.',
   'worlds.race.title': 'Track and best lap',
   'worlds.race.text': 'Fly through the gates in the right order. Time your laps, compare them with your best and improve your result.',
   'worlds.stable.title': 'Stabilized flight',
   'worlds.stable.text': 'Pick a DJI-style drone in Normal or Sport mode. Practice holding position and altitude while controlling the camera.',
   'worlds.env.title': 'Three worlds',
   'worlds.env.text': 'A meadow with village houses, a canyon with a creek and a winter valley with a gondola lift and a frozen lake. Fly into houses, under trees and between the lift cables — but touching water ends the flight.',
   'worlds.levels.title': 'Levels and exam',
   'worlds.levels.text': 'Every circuit has six levels, including tricks (power loop, split-S, Matty flip, dive) and moving obstacles. Exam mode unlocks the levels one after another.',
   'worlds.updates.title': 'Automatic updates',
   'worlds.updates.text': 'The Windows installer and Linux AppImage download new versions on their own and install them when you quit; on macOS the app offers the new DMG. The Portable version does not update.',
   'support.title': 'Already have a controller?<br><em>Start with it.</em>',
   'support.lead': 'Calibrate the channels in Setup, check the directions and tune the controls to you.',
   'support.edgetx': 'USB Joystick mode, channel detection and Arm switch binding.',
   'support.dji': 'Through the bottom USB-C port, using a DUML serial connection in the desktop app. Compatibility with other DJI controllers is not confirmed.',
   'support.gamepad.title': 'Gamepad and keyboard',
   'support.gamepad.text': 'Standard Xbox / PlayStation mapping or keyboard. W/S — throttle, A/D — yaw, arrow keys — pitch/roll.',
   'download.title': 'Ready for takeoff?',
   'download.lead': 'Choose your platform and start training.',
   'download.installer': 'x64 · installer',
   'download.portable': 'x64 · no installation',
   'download.action': 'Download ↓',
   'download.soon': 'Coming soon',
   'download.version': 'Version {version} · choose an available package.',
   'download.latest': 'Latest version · choose an available package.',
   'download.pending': 'Downloads are being prepared. Public release files are not linked yet.',
   'download.signing.title': 'First launch and code signing',
   'download.signing.text': 'Code signing and macOS notarization are not set up for the current packages. Download only from a trusted source and check the release SHA256SUMS. The Windows installer lets you choose the install location; the Portable version needs no installation. The Linux AppImage may need execute permission.',
   'download.first.title': 'How do I start my first flight?',
   'download.first.text': 'Choose a drone type, then check Setup and calibration. Space — Arm/Disarm, R — Reset, C — camera, M — flight mode, Esc — Setup. Start with low throttle.',
   'footer.made': 'Made for learning to fly.',
   'footer.download': 'Download ↑'
  }
 };
 const listeners = [];
 let lang;
 try { lang = localStorage.getItem('droney-lang'); } catch {}
 const requested = new URLSearchParams(location.search).get('lang');
 if (dict[requested]) lang = requested;
 if (!dict[lang]) lang = 'ka';
 const t = (key, values = {}) => (dict[lang][key] ?? dict.ka[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
 function apply() {
  document.documentElement.lang = lang;
  document.title = t('meta.title');
  document.querySelector('meta[name="description"]').content = t('meta.description');
  // Each language has its own indexable URL (hreflang in index.html), so the canonical follows it.
  document.querySelector('link[rel="canonical"]').href = lang === 'ka' ? 'https://droney.ge/' : 'https://droney.ge/?lang=' + lang;
  for (const el of document.querySelectorAll('[data-i18n]')) el.innerHTML = t(el.dataset.i18n);
  for (const el of document.querySelectorAll('[data-i18n-aria]')) el.setAttribute('aria-label', t(el.dataset.i18nAria));
  for (const button of document.querySelectorAll('[data-lang]')) {
   const active = button.dataset.lang === lang;
   button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active));
  }
  listeners.forEach(listener => listener(lang));
 }
 window.DRONEY_I18N = {
  t,
  get lang() { return lang; },
  onChange(listener) { listeners.push(listener); },
  set(next) {
   if (!dict[next] || next === lang) return;
   lang = next;
   try { localStorage.setItem('droney-lang', lang); } catch {}
   apply();
  }
 };
 document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => window.DRONEY_I18N.set(button.dataset.lang)));
 apply();
})();
