import * as THREE from './assets/vendor/three.module.js';
import { RoundedBoxGeometry } from './assets/vendor/RoundedBoxGeometry.js';

// Procedural 10" long-X FPV quad, ported from the simulator's buildFpvModel (droney/src/app/sim/drone-models.ts).
// Meters, +Y up, nose toward -Z. Returns the group and the prop groups (userData.dir = spin direction).
// Textures are drawn on canvases at load, so the page downloads no image files for the model.
function canvasTexture(width, height, draw) {
 const canvas=document.createElement('canvas'); canvas.width=width; canvas.height=height;
 draw(canvas.getContext('2d'),width,height);
 const texture=new THREE.CanvasTexture(canvas);
 texture.colorSpace=THREE.SRGBColorSpace; texture.anisotropy=8;
 return texture;
}
// 2x2 twill weave: each tow is a strip shaded across its width so the weave catches the light.
function carbonTexture() {
 const texture=canvasTexture(64,64,(c)=>{
  const cell=8;
  for(let i=0;i<8;i++)for(let j=0;j<8;j++){
   const across=(i+j)%4<2, x=i*cell, y=j*cell;
   const g=across?c.createLinearGradient(x,y,x,y+cell):c.createLinearGradient(x,y,x+cell,y);
   g.addColorStop(0,'#0c0d0f'); g.addColorStop(.5,'#34373d'); g.addColorStop(1,'#0c0d0f');
   c.fillStyle=g; c.fillRect(x,y,cell,cell);
  }
 });
 texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
 return texture;
}
function labelTexture() {
 return canvasTexture(256,160,(c,w,h)=>{
  c.fillStyle='#1d1f22'; c.fillRect(0,0,w,h);
  c.fillStyle='#c3f276'; c.fillRect(0,0,w,34);
  c.fillStyle='#101712'; c.font='bold 24px Arial'; c.textAlign='center'; c.fillText('DRONEY',w/2,26);
  c.fillStyle='#edf1e8'; c.font='bold 44px Arial'; c.fillText('6S 1800',w/2,92);
  c.font='22px Arial'; c.fillStyle='#a9b4a3'; c.fillText('mAh  ·  120C  ·  22.2V',w/2,130);
 });
}
// Shrink wrap on the cells: a few faint seams and a printed stripe.
function cellTexture() {
 return canvasTexture(128,256,(c,w,h)=>{
  c.fillStyle='#2a7de1'; c.fillRect(0,0,w,h);
  c.fillStyle='#1f63b8'; c.fillRect(0,h*.62,w,h*.1);
  c.fillStyle='#ffffff22';
  for(let y=10;y<h;y+=46)c.fillRect(0,y,w,2);
 });
}

// Box UVs span 0..1 on every face; rescale them to meters/TILE so the weave keeps one size on any part.
const TILE=.03;
function tiled(geometry,w,h,d) {
 const uv=geometry.attributes.uv, spans=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]];
 for(let i=0;i<uv.count;i++){const [u,v]=spans[Math.floor(i/4)];uv.setXY(i,uv.getX(i)*u/TILE,uv.getY(i)*v/TILE);}
 return geometry;
}
const boxGeometry=(w,h,d,mat)=>{const g=new THREE.BoxGeometry(w,h,d);return mat.userData.tiled?tiled(g,w,h,d):g;};
const beam=(from,to,width,height,mat)=>{
 const m=new THREE.Mesh(boxGeometry(width,height,from.distanceTo(to),mat),mat);
 m.position.copy(from).add(to).multiplyScalar(.5);
 m.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),to.clone().sub(from).normalize());
 return m;
};
const rod=(from,to,r,mat)=>{
 const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,from.distanceTo(to),10),mat);
 m.position.copy(from).add(to).multiplyScalar(.5);
 m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),to.clone().sub(from).normalize());
 return m;
};
const cyl=(r,h,mat,x,y,z,segments=24)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,segments),mat);m.position.set(x,y,z);return m;};
const box=(w,h,d,mat,x,y,z)=>{const m=new THREE.Mesh(boxGeometry(w,h,d,mat),mat);m.position.set(x,y,z);return m;};
// Long, narrow, pitched blade tapering toward the tip; pitch follows the spin direction.
function blade(dir) {
 const g=new THREE.SphereGeometry(1,24,8).scale(.058,.0015,.012);
 const pos=g.attributes.position;
 for(let i=0;i<pos.count;i++)pos.setZ(i,pos.getZ(i)*(1-.45*Math.max(0,pos.getX(i)/.058)));
 g.computeVertexNormals();
 return g.rotateX(dir*THREE.MathUtils.degToRad(14)).translate(.066,0,0);
}

export function buildFpvModel() {
 const group=new THREE.Group(), props=[];
 const carbon=new THREE.MeshStandardMaterial({ map: carbonTexture(), color: 0xffffff, roughness: .32, metalness: .25 });
 carbon.userData.tiled=true;
 const plastic=new THREE.MeshStandardMaterial({ color: 0x1a1a1c, roughness: .55 });
 const motorMat=new THREE.MeshStandardMaterial({ color: 0x26262a, metalness: .8, roughness: .35 });
 const stator=new THREE.MeshStandardMaterial({ color: 0xb8864a, metalness: 1, roughness: .4 });
 const alu=new THREE.MeshStandardMaterial({ color: 0xc8c8cc, metalness: 1, roughness: .25 });
 const propMat=new THREE.MeshStandardMaterial({ color: 0x2a2c30, roughness: .25, transparent: true, opacity: .8, side: THREE.DoubleSide });
 const pcb=new THREE.MeshStandardMaterial({ color: 0x0f7a35, roughness: .4 });
 const battery=new THREE.MeshStandardMaterial({ map: cellTexture(), roughness: .3 });
 const label=new THREE.MeshStandardMaterial({ map: labelTexture(), roughness: .8 });
 const strap=new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: .8 });
 const can=new THREE.MeshStandardMaterial({ color: 0x8a7a50, metalness: .9, roughness: .3 });
 const glass=new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 1, roughness: .05 });
 const tapeFront=new THREE.MeshStandardMaterial({ color: 0x2f8fdc, roughness: .5 });
 const tapeRear=new THREE.MeshStandardMaterial({ color: 0xe8c22a, roughness: .5 });
 const wireRed=new THREE.MeshStandardMaterial({ color: 0xcc1111, roughness: .4 });

 // Stack: bottom plate, standoffs, top plate, boards.
 const topY=.032;
 group.add(box(.07,.004,.17,carbon,0,0,0),box(.058,.003,.13,carbon,0,topY,.005));
 for(const [x,z] of [[.024,.06],[-.024,.06],[.024,-.06],[-.024,-.06]])group.add(cyl(.0028,topY,alu,x,topY/2,z,6));
 group.add(box(.04,.005,.04,pcb,0,.006,.01),box(.036,.004,.036,pcb,0,.012,.01),box(.03,.006,.03,pcb,0,.02,.055));
 // Arms, ")(" braces, blue (front) and yellow (rear) tape, motors and three-blade props.
 [[.17,-.19],[-.17,-.19],[.17,.19],[-.17,.19]].forEach(([mx,mz],i)=>{
  const sx=Math.sign(mx), sz=Math.sign(mz);
  const root=new THREE.Vector3(sx*.025,0,sz*.045), motorAt=new THREE.Vector3(mx,0,mz), elbow=new THREE.Vector3(sx*.115,0,sz*.06);
  group.add(beam(root,motorAt,.022,.005,carbon),beam(motorAt,elbow,.009,.004,carbon),beam(elbow,new THREE.Vector3(sx*.034,0,sz*.004),.009,.004,carbon),cyl(.02,.005,carbon,mx,0,mz,32));
  const along=motorAt.clone().sub(root).normalize().multiplyScalar(.004), tapeAt=root.clone().lerp(motorAt,.35);
  group.add(beam(tapeAt.clone().sub(along),tapeAt.clone().add(along),.025,.008,sz<0?tapeFront:tapeRear));
  group.add(cyl(.016,.006,motorMat,mx,.0055,mz),cyl(.0155,.004,stator,mx,.0105,mz),cyl(.0165,.012,motorMat,mx,.018,mz),cyl(.003,.012,alu,mx,.028,mz,12));
  const dir=sx*sz>0?1:-1, p=new THREE.Group(), geometry=blade(dir);
  p.position.set(mx,.033,mz); p.userData.dir=dir;
  p.add(cyl(.008,.008,propMat,0,-.001,0),cyl(.005,.006,alu,0,.005,0,6));
  for(let k=0;k<3;k++){const b=new THREE.Mesh(geometry,propMat);b.rotation.y=k*2*Math.PI/3+i*.44;p.add(b);}
  props.push(p); group.add(p);
 });
 // Nose camera between two cage plates, lens tilted up.
 for(const s of [-1,1])group.add(box(.003,.03,.03,carbon,s*.013,.017,-.085));
 const lens=cyl(.0075,.014,plastic,0,.017,-.1), lensGlass=cyl(.005,.001,glass,0,.0185,-.107);
 lens.rotation.x=lensGlass.rotation.x=THREE.MathUtils.degToRad(-78);
 group.add(box(.02,.02,.02,plastic,0,.017,-.085),lens,lensGlass);
 // Battery: two rounded cells, end labels, strap with a buckle.
 const batY=topY+.031;
 for(const s of [-1,1]){const cell=new THREE.Mesh(new RoundedBoxGeometry(.036,.056,.135,4,.012),battery);cell.position.set(s*.0185,batY,.005);group.add(cell);}
 const front=box(.06,.038,.002,label,0,batY,-.0635); front.rotation.y=Math.PI;
 group.add(box(.06,.038,.002,label,0,batY,.0735),front);
 group.add(box(.078,.002,.022,strap,0,batY+.029,.005),box(.002,.062,.022,strap,.039,batY-.002,.005),box(.002,.062,.022,strap,-.039,batY-.002,.005),box(.02,.004,.026,alu,0,batY+.031,.005));
 // Power lead from the back of the battery down to the ESC.
 for(const [s,mat] of [[1,wireRed],[-1,plastic]]){
  const a=new THREE.Vector3(s*.008,batY+.015,.074), b=new THREE.Vector3(s*.01,topY+.01,.08);
  group.add(rod(a,b,.0018,mat),rod(b,new THREE.Vector3(s*.006,.012,.03),.0018,mat));
 }
 // VTX antenna, raked back from the rear of the frame.
 const antA=new THREE.Vector3(0,topY,.08), antB=new THREE.Vector3(0,.2,.13), antAxis=antB.clone().sub(antA).normalize();
 group.add(rod(new THREE.Vector3(0,.004,.075),antA,.003,plastic),rod(antA,antB,.0018,plastic),rod(antB.clone().addScaledVector(antAxis,-.006),antB.clone().addScaledVector(antAxis,.006),.007,plastic));
 // Cargo canister under the frame: metal tube, dark rear cap, glass dome in front, zip ties.
 const canY=-.042, canR=.034;
 const tube=(r,len,mat,z)=>{const m=cyl(r,len,mat,0,canY,z,40);m.rotation.x=Math.PI/2;return m;};
 group.add(tube(canR,.13,can,0),tube(canR*.98,.03,plastic,.075),tube(canR*1.02,.006,alu,-.064));
 const dome=new THREE.Mesh(new THREE.SphereGeometry(canR*.9,32,16),glass);
 dome.position.set(0,canY,-.066); dome.scale.z=.35; group.add(dome);
 for(const z of [-.035,.035]){
  const tie=new THREE.Mesh(new THREE.TorusGeometry(canR+.0015,.0018,6,40),strap);
  tie.position.set(0,canY,z); group.add(tie,box(.012,.012,.006,plastic,0,-.008,z));
 }
 return { group, props };
}
