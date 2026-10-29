import * as THREE from './assets/vendor/three.module.js';
import { OrbitControls } from './assets/vendor/OrbitControls.js';
import { buildFpvModel } from './fpv-model.js';

const host = document.querySelector('#model-viewer');
const status = document.querySelector('#model-status');
const { t, onChange } = window.DRONEY_I18N;
// Keeps the status line translatable: remembers which message is showing.
let statusKey = 'model.loading';
function showStatus(key) { statusKey = key; status.hidden = false; status.textContent = t(key); }
onChange(() => { status.textContent = t(statusKey); });
// The quad's widest span, props included, is scaled to this many scene units.
const SPAN = 3;
const FLOOR = -.55;
try {
 const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
 renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
 renderer.setClearColor(0x101712, 0);
 renderer.outputColorSpace = THREE.SRGBColorSpace;
 renderer.toneMapping = THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure = 1.4;
 const label = () => renderer.domElement.setAttribute('aria-label', t('model.canvas'));
 label(); onChange(label);
 renderer.domElement.tabIndex = 0;
 host.append(renderer.domElement);
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(35, 1, .01, 100);
 const controls = new OrbitControls(camera, renderer.domElement);
 controls.enableDamping = true;
 controls.enablePan = false;
 controls.minDistance = 2.8;
 controls.maxDistance = 10;
 controls.autoRotateSpeed = .7;
 controls.maxPolarAngle = Math.PI * .92;
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 let touched = false;
 controls.addEventListener('start', () => { touched = true; controls.autoRotate = false; });
 function reset() {
  camera.position.set(3.8, 2.6, 4.8);
  controls.target.set(0, 0, 0);
  touched = false;
  controls.autoRotate = !motion.matches;
  controls.update();
 }
 motion.addEventListener('change', () => { controls.autoRotate = !motion.matches && !touched; });
 reset();
 scene.add(new THREE.HemisphereLight(0xf3ffe7, 0x354032, 3));
 const key = new THREE.DirectionalLight(0xffffff, 4); key.position.set(3, 5, 4); scene.add(key);
 const rim = new THREE.DirectionalLight(0xc3f276, 1.2); rim.position.set(-4, 2, -3); scene.add(rim);
 const fill = new THREE.DirectionalLight(0xa9c6d2, 2); fill.position.set(0, 1, -5); scene.add(fill);
 const ringMaterial = new THREE.LineBasicMaterial({ color: 0x718b51, transparent: true, opacity: .25 });
 for (const radius of [1.5, 1.95, 2.4]) {
  const points = Array.from({length:129},(_,i)=>new THREE.Vector3(Math.cos(i/128*Math.PI*2)*radius,FLOOR,Math.sin(i/128*Math.PI*2)*radius));
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),ringMaterial));
 }
 // Soft studio gradient for reflections, so the metal parts (motors, canister, standoffs) are not flat black.
 const sky = document.createElement('canvas'); sky.width = 256; sky.height = 128;
 const paint = sky.getContext('2d'), gradient = paint.createLinearGradient(0, 0, 0, 128);
 gradient.addColorStop(0, '#f4f4f4'); gradient.addColorStop(.45, '#80828a'); gradient.addColorStop(.55, '#2a2b2e'); gradient.addColorStop(1, '#0e0e10');
 paint.fillStyle = gradient; paint.fillRect(0, 0, 256, 128);
 const skyTexture = new THREE.CanvasTexture(sky); skyTexture.mapping = THREE.EquirectangularReflectionMapping; skyTexture.colorSpace = THREE.SRGBColorSpace;
 const pmrem = new THREE.PMREMGenerator(renderer);
 scene.environment = pmrem.fromEquirectangular(skyTexture).texture;
 scene.environmentIntensity = .7;
 skyTexture.dispose(); pmrem.dispose();
 const { group: model, props } = buildFpvModel();
 const size = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
 model.scale.setScalar(SPAN / Math.max(size.x, size.z));
 const box = new THREE.Box3().setFromObject(model), center = box.getCenter(new THREE.Vector3());
 model.position.set(-center.x, FLOOR-box.min.y, -center.z);
 scene.add(model);
 status.hidden = true;
 document.querySelector('#model-reset').addEventListener('click',reset);
 renderer.domElement.addEventListener('keydown',event=>{
  const direction={ArrowLeft:-1,ArrowRight:1,ArrowUp:-1,ArrowDown:1}[event.key];
  if(!direction)return;event.preventDefault();touched=true;controls.autoRotate=false;
  const offset=camera.position.clone().sub(controls.target);
  const spherical=new THREE.Spherical().setFromVector3(offset);
  if(event.key==='ArrowLeft'||event.key==='ArrowRight')spherical.theta+=direction*.12;
  else spherical.phi=THREE.MathUtils.clamp(spherical.phi+direction*.12,.1,Math.PI*.92);
  camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(spherical));controls.update();
 });
 new ResizeObserver(()=>{
  const width=host.clientWidth,height=host.clientHeight;
  renderer.setSize(width,height); camera.aspect=width/height;camera.updateProjectionMatrix();
 }).observe(host);
 let visible=true;
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}).observe(host);
 renderer.setAnimationLoop(()=>{if(!visible||document.hidden)return;if(!motion.matches)for(const p of props)p.rotation.y+=p.userData.dir*.06;controls.update();renderer.render(scene,camera);});
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();showStatus('model.contextLost');});
} catch(error) {
 showStatus('model.noWebgl');
 document.querySelector('#model-reset').disabled=true;
 console.error('DRONEY viewer unavailable',error);
}
