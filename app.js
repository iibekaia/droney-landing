const config = window.DRONEY_DOWNLOADS || {};
const platforms = [
 ['windowsSetup','⊞','Windows','x64 · ინსტალერი','Setup-win-x64.exe'],
 ['windowsPortable','⊞','Windows','x64 · ინსტალაციის გარეშე','Portable-win-x64.exe'],
 ['mac','⌘','macOS','Intel + Apple Silicon','mac-universal.dmg'],
 ['linux','◈','Linux','x64 · AppImage','linux-x86_64.AppImage']
];
const downloads = document.querySelector('#downloads');
for (const [key,icon,title,description,file] of platforms) {
 const card = document.createElement('article'); card.className='download-card';
 for (const [tag,content,className] of [['div',icon,'os-icon'],['h3',title,''],['p',description,'']]) {const el=document.createElement(tag);el.textContent=content;el.className=className;card.append(el);}
 let valid=false;try {valid=new URL(config[key]).protocol==='https:';}catch {}
 const action=document.createElement(valid?'a':'button');action.textContent=valid?'გადმოწერა ↓':'მალე დაემატება';
 if(valid){action.href=config[key];action.rel='noopener';}else{action.disabled=true;}
 card.append(action);const filename=document.createElement('small');filename.textContent=`droney-${config.version || 'VERSION'}-${file}`;card.append(filename);downloads.append(card);
}
document.querySelector('#releaseNote').textContent=platforms.some(([key])=>config[key])?`ვერსია ${config.version} · აირჩიე ხელმისაწვდომი პაკეტი.`:'ჩამოტვირთვები მომზადების პროცესშია. საჯარო რელიზის ფაილები ჯერ არ არის მიბმული.';
document.querySelector('#year').textContent=new Date().getFullYear();
const canvas=document.querySelector('#flight'),ctx=canvas.getContext('2d');canvas.tabIndex=0;
const roll=document.querySelector('#roll'),pitch=document.querySelector('#pitch'),throttle=document.querySelector('#throttle');
let mode='angle',angle=0,tilt=0,last=0,time=0,animation;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function draw(timestamp){
 const dt=Math.min((timestamp-last)/1000||0,.05);last=timestamp;time+=dt;
 const width=canvas.clientWidth,height=canvas.clientHeight,dpr=Math.min(devicePixelRatio||1,2);
 if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}
 ctx.setTransform(dpr,0,0,dpr,0,0);
 if(mode==='angle'){angle+=(Number(roll.value)*.006-angle)*Math.min(dt*5,1);tilt+=(Number(pitch.value)*.7-tilt)*Math.min(dt*5,1);}else{angle+=Number(roll.value)*dt*.015;tilt=Math.max(-120,Math.min(120,tilt+Number(pitch.value)*dt));}
 const sky=ctx.createLinearGradient(0,0,0,height);sky.addColorStop(0,'#233c39');sky.addColorStop(.55,'#93a88a');sky.addColorStop(1,'#283a24');ctx.fillStyle=sky;ctx.fillRect(0,0,width,height);
 ctx.save();ctx.translate(width/2,height*.48+tilt+(35-Number(throttle.value))*.8);ctx.rotate(-angle);
 const span=Math.max(width,height)*3;ctx.fillStyle='#5b7250';ctx.beginPath();ctx.moveTo(-span,100);for(let x=-span;x<=span;x+=50)ctx.lineTo(x,35+Math.sin(x*.007)*26+Math.cos(x*.02)*13);ctx.lineTo(span,span);ctx.lineTo(-span,span);ctx.fill();
 ctx.fillStyle='#263b28';ctx.fillRect(-span,85,span*2,span);ctx.strokeStyle='#a1c87933';ctx.lineWidth=1;
 const offset=reduced?0:(time*(Number(throttle.value)*.2+3))%38;
 for(let i=0;i<18;i++){const y=90+Math.pow((i+offset/38)/18,2)*height*2;ctx.beginPath();ctx.moveTo(-span,y);ctx.lineTo(span,y);ctx.stroke();}
 for(let i=-12;i<=12;i++){ctx.beginPath();ctx.moveTo(i*24,85);ctx.lineTo(i*width*.3,height*2);ctx.stroke();}
 for(let i=3;i>=0;i--){const scale=1/(1+i*.7),x=Math.sin(i*.8)*70,y=100+(1-scale)*-50;ctx.strokeStyle=i===0?'#c3f276':'#c7ddb080';ctx.lineWidth=4*scale;ctx.strokeRect(x-75*scale,y-100*scale,150*scale,100*scale);}
 ctx.restore();document.querySelector('#rollValue').textContent=`${Math.round(angle*180/Math.PI)%360}°`;document.querySelector('#pitchValue').textContent=`${Math.round(tilt)}°`;document.querySelector('#throttleValue').textContent=`${throttle.value}%`;
 animation=requestAnimationFrame(draw);
}
function reset(){roll.value=0;pitch.value=0;throttle.value=35;angle=tilt=0;}
document.querySelector('#reset').addEventListener('click',reset);
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.mode;reset();document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelector('#modeLabel').textContent=mode.toUpperCase()+' MODE';document.querySelector('#modeDescription').textContent=mode==='angle'?'სტიკის გაშვებისას დრონი თანდათან სწორდება.':'სტიკი ბრუნვის სიჩქარეს ცვლის; ნულზე დახრა რჩება.';}));
for(const input of [roll,pitch]){input.addEventListener('pointerup',()=>{input.value=0;});input.addEventListener('pointercancel',()=>{input.value=0;});}
canvas.addEventListener('keydown',event=>{const keys={ArrowLeft:[roll,-65],ArrowRight:[roll,65],ArrowUp:[pitch,-65],ArrowDown:[pitch,65]};if(keys[event.key]){event.preventDefault();keys[event.key][0].value=keys[event.key][1];}if(event.key.toLowerCase()==='r')reset();});
canvas.addEventListener('keyup',event=>{if(event.key.startsWith('Arrow')){roll.value=pitch.value=0;}});canvas.addEventListener('blur',()=>{roll.value=pitch.value=0;});
const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){if(!animation){last=performance.now();animation=requestAnimationFrame(draw);}}else{cancelAnimationFrame(animation);animation=undefined;}},{threshold:.01});observer.observe(canvas);
