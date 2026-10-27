import * as THREE from './assets/vendor/three.module.js';
import { STLLoader } from './assets/vendor/STLLoader.js';
import { OrbitControls } from './assets/vendor/OrbitControls.js';

const host = document.querySelector('#model-viewer');
const status = document.querySelector('#model-status');
const buttons = [...document.querySelectorAll('[data-model]')];
try {
 const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
 renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
 renderer.setClearColor(0x101712, 0);
 renderer.outputColorSpace = THREE.SRGBColorSpace;
 renderer.toneMapping = THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure = 1.4;
 renderer.domElement.setAttribute('aria-label', 'DJI Mini 3 — გადაათრიე მოდელის შესაბრუნებლად; ისრები — შემობრუნება');
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
 const rim = new THREE.DirectionalLight(0xc3f276, 3); rim.position.set(-4, 2, -3); scene.add(rim);
 const fill = new THREE.DirectionalLight(0xa9c6d2, 2); fill.position.set(0, 1, -5); scene.add(fill);
 const ringMaterial = new THREE.LineBasicMaterial({ color: 0x718b51, transparent: true, opacity: .25 });
 for (const radius of [1.5, 1.95, 2.4]) {
  const points = Array.from({length:129},(_,i)=>new THREE.Vector3(Math.cos(i/128*Math.PI*2)*radius,-.8,Math.sin(i/128*Math.PI*2)*radius));
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),ringMaterial));
 }
 const material = new THREE.MeshStandardMaterial({ color: 0xc8ccbf, metalness: .18, roughness: .55 });
 const cache = new Map();
 const loader = new STLLoader();
 let mesh, selection = 0;
 async function select(name) {
  const request = ++selection;
  buttons.forEach(button=>{const active=button.dataset.model===name;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  status.hidden = false; status.textContent = '3D მოდელი იტვირთება…'; host.setAttribute('aria-busy','true');
  try {
   if (!cache.has(name)) cache.set(name, loader.loadAsync(`./assets/models/mini-3-${name}.stl`).then(geometry=>{
    geometry.center(); geometry.computeBoundingBox();
    const size = geometry.boundingBox.getSize(new THREE.Vector3());
    const scale = 3 / Math.max(size.x,size.y,size.z);
    geometry.scale(scale,scale,scale); geometry.computeVertexNormals();
    return geometry;
   }).catch(error=>{cache.delete(name);throw error;}));
   const geometry = await cache.get(name);
   if(request!==selection)return;
   if(mesh)scene.remove(mesh);
   mesh = new THREE.Mesh(geometry,material); scene.add(mesh);
   status.hidden=true;
  } catch(error) {
   if(request!==selection)return;
   status.textContent='მოდელი ვერ ჩაიტვირთა. სცადე მდგომარეობის ხელახლა არჩევა.';
   console.error('DRONEY model loading failed',error);
  } finally {if(request===selection)host.setAttribute('aria-busy','false');}
 }
 buttons.forEach(button=>button.addEventListener('click',()=>select(button.dataset.model)));
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
 renderer.setAnimationLoop(()=>{if(!visible||document.hidden)return;controls.update();renderer.render(scene,camera);});
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();status.hidden=false;status.textContent='3D ხედი შეჩერდა. განაახლე გვერდი.';});
 select('unfolded');
} catch(error) {
 status.textContent='3D ხედისთვის საჭიროა WebGL-ის მხარდაჭერა. სცადე თანამედროვე ბრაუზერი.';
 buttons.forEach(button=>button.disabled=true);
 document.querySelector('#model-reset').disabled=true;
 console.error('DRONEY viewer unavailable',error);
}
