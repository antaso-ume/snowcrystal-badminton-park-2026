const INK='#06205f',NAVY='#0a2f8f',BLUE='#1263e0',LBLUE='#3f8cff',OR='#f47216',LOR='#ff8c33',PALE='#e9f0fb',DOR='#c85d0f';
let uid=0;
const rr=(x,y,w,h,r)=>`M${x+r},${y} h${w-2*r} a${r},${r} 0 0 1 ${r},${r} v${h-2*r} a${r},${r} 0 0 1 ${-r},${r} h${-(w-2*r)} a${r},${r} 0 0 1 ${-r},${-r} v${-(h-2*r)} a${r},${r} 0 0 1 ${r},${-r} Z`;
const circ=(cx,cy,r)=>`M${cx-r},${cy} a${r},${r} 0 1 0 ${2*r},0 a${r},${r} 0 1 0 ${-2*r},0 Z`;
function sh(d,light,dark,inner='',dx=-12,dy=-9,sw=9){const id='cp'+(uid++);
 return `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="${dark}"/><g clip-path="url(#${id})"><path d="${d}" fill="${light}" transform="translate(${dx},${dy})"/>${inner}</g><path d="${d}" fill="none" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"/>`;}
const ln=(d,c,w,o=1)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${o}"/>`;
const star=(n,r0,r1)=>{let p=[];for(let i=0;i<n*2;i++){const a=i*Math.PI/n-Math.PI/2,r=i%2?r0:r1;p.push((r*Math.cos(a)).toFixed(1)+','+(r*Math.sin(a)).toFixed(1));}return p.join(' ');};
const spark=(x,y,r,c='#fff')=>`<path d="M0,${-r} L${r*.26},${-r*.26} L${r},0 L${r*.26},${r*.26} L0,${r} L${-r*.26},${r*.26} L${-r},0 L${-r*.26},${-r*.26} Z" fill="${c}" transform="translate(${x},${y})"/>`;
function rays(n,c,o){let s='';for(let i=0;i<n;i++){const a0=i*2*Math.PI/n,a1=a0+Math.PI/n,R=2600;s+=`<polygon points="0,0 ${R*Math.cos(a0)},${R*Math.sin(a0)} ${R*Math.cos(a1)},${R*Math.sin(a1)}" fill="${c}" opacity="${o}"/>`;}return s;}
function dotsPat(id,c,o,sp=46,r=6){return `<pattern id="${id}" width="${sp}" height="${sp}" patternUnits="userSpaceOnUse"><circle cx="${sp/2}" cy="${sp/2}" r="${r}" fill="${c}" opacity="${o}"/></pattern>`;}
// ---- items (origin = centre unless noted)
function shamoji(){   // 白いプラスチックのしゃもじ（表面にお米がつきにくい粒々）
 const head="M0,-320 C95,-320 135,-235 130,-140 C125,-50 70,45 30,72 L-30,72 C-70,45 -125,-50 -130,-140 C-135,-235 -95,-320 0,-320 Z";
 const inner="M0,-292 C78,-292 108,-222 104,-142 C100,-64 58,6 0,6 C-58,6 -100,-64 -104,-142 C-108,-222 -78,-292 0,-292 Z";
 const handle="M-28,60 L28,60 C30,150 32,230 40,290 L-40,290 C-32,230 -30,150 -28,60 Z";
 let dots='';for(let r=0;r<9;r++)for(let c=-4;c<=4;c++){const x=c*24+(r%2?12:0),y=-262+r*30;dots+=`<circle cx="${x}" cy="${y}" r="4.2" fill="#D3DCE8"/>`;}
 let rim='';for(let i=0;i<40;i++){const t=i/40*Math.PI*2;rim+=`<circle cx="${(118*Math.sin(t)).toFixed(1)}" cy="${(-150-160*Math.cos(t)*(Math.cos(t)>0?1:.95)).toFixed(1)}" r="5" fill="#E2E8F0"/>`;}
 return sh(handle,'#FFFFFF','#D8E0EA',`<path d="M14,80 C16,160 18,230 26,290 L40,290 C32,230 30,150 28,80 Z" fill="#C9D3E0" opacity=".6"/>`)
  +sh(rr(-46,282,92,40,14),'#FFFFFF','#D8E0EA','',-5,-4,8)
  +sh(head,'#FFFFFF','#DCE3EC',`<clipPath id="shi"><path d="${inner}"/></clipPath><g clip-path="url(#shi)">${dots}</g>${rim}<path d="${inner}" fill="none" stroke="#C9D3E0" stroke-width="4"/>`
   +ln("M-86,-180 C-84,-240 -58,-276 -20,-286","#fff",13,.95))
  +ln("M-6,90 Q-10,180 -4,270","#fff",8,.9);}
function broom(){
 const stick=rr(-15,-440,30,610,15);
 let nodes='';[-330,-200,-70,60].forEach(y=>nodes+=ln(`M-15,${y} h30`,'#8E6B2E',5));
 const br="M-50,150 L50,150 C80,250 150,340 172,425 L142,442 L112,424 L82,444 L52,426 L22,446 L-8,426 L-38,444 L-68,424 L-100,442 L-135,424 L-172,425 C-150,340 -80,250 -50,150 Z";
 let st='';for(let k=-3;k<=3;k++)st+=ln(`M${k*11},205 Q${k*24},300 ${k*44},412`,'#C48F1B',4,.9);
 const bind=rr(-64,128,128,58,14);
 const wraps=ln("M-36,132 v50","#8E2A12",4,.7)+ln("M0,132 v50","#8E2A12",4,.7)+ln("M36,132 v50","#8E2A12",4,.7);
 return sh(stick,'#D8B56B','#A9823F',nodes)+sh(br,'#F8D560','#DDAE2F',st)+ln("M-92,262 Q0,290 92,262",INK,17)+ln("M-92,262 Q0,290 92,262",'#E4572E',9)+sh(bind,'#EE6A45','#B93A1C',wraps);}
function ladle(){
 const handle=rr(-13,-380,26,520,13), bowl=circ(0,225,118);
 return sh(handle,'#F2F5F8','#AEB9C4',ln("M-3,-330 v420","#fff",5,.9),-7,-4)+`<circle cx="0" cy="-352" r="5" fill="${INK}"/>`
  +sh(bowl,'#E6EBF0','#9FABB7',ln("M-88,262 Q-62,318 -8,333","#fff",11,.9))
  +`<ellipse cx="0" cy="186" rx="100" ry="60" fill="#6F7C89" stroke="${INK}" stroke-width="8"/><ellipse cx="6" cy="202" rx="78" ry="40" fill="#93A0AC"/>`+ln("M-70,172 Q-30,140 30,140","#fff",8,.55);}
function pingpong(){
 const handle="M-28,118 L28,118 L37,300 C37,326 -37,326 -37,300 Z", blade=circ(0,-40,172);
 const rubber="M-123,62 A160,160 0 1,1 123,62 L96,100 L-96,100 Z", neck="M-66,92 L66,92 L28,150 L-28,150 Z";
 return sh(handle,'#D9A766','#A8733D',`<rect x="-8" y="140" width="16" height="190" fill="#7A4E24" opacity=".55"/>`)
  +sh(blade,'#E8C48A','#C89B5A')+sh(neck,'#E8C48A','#C89B5A','',-6,-4)
  +sh(rubber,'#F2503E','#BE2D20',ln("M-112,-88 A132,132 0 0,1 -34,-166","#fff",14,.6)+`<circle cx="-118" cy="-52" r="7" fill="#fff" opacity=".6"/>`);}
function shuttle(){
 const skirt="M-30,35 L-80,-84 Q-66,-103 -53,-88 Q-40,-105 -27,-90 Q-13,-107 0,-91 Q13,-107 27,-90 Q40,-105 53,-88 Q66,-103 80,-84 L30,35 Z";
 let f='';for(let k=-2;k<=2;k++)f+=ln(`M${k*10},32 L${k*27},-86`,'#A9B4C2',3.5);
 f+=ln("M-45,-2 Q0,13 45,-2","#6F7C8F",4)+ln("M-60,-38 Q0,-22 60,-38","#6F7C8F",4);
 const cork="M-32,35 L32,35 L32,56 C32,106 -32,106 -32,56 Z";
 return sh(skirt,'#FFFFFF','#D5DCE6',f,-9,-6,7)+sh(cork,'#FFFFFF','#DAD6CB',`<rect x="-40" y="35" width="80" height="17" fill="${OR}"/>`,-8,-5,7);}
function spoon(){
 const d="M0,-400 C75,-400 105,-320 100,-250 C95,-170 50,-110 22,-95 L16,360 C16,396 -16,396 -16,360 L-22,-95 C-50,-110 -95,-170 -100,-250 C-105,-320 -75,-400 0,-400 Z";
 return `<path d="${d}" fill="${NAVY}" stroke="#9fb6de" stroke-width="6" stroke-dasharray="18 16" stroke-linecap="round"/><text x="0" y="-250" font-size="150" fill="#9fb6de">?</text>`;}
function giant(){
 let s='';for(let k=-6;k<=6;k++)s+=`<line x1="${k*105}" y1="-900" x2="${k*105}" y2="900"/>`;for(let k=-8;k<=8;k++)s+=`<line x1="-720" y1="${k*105}" x2="720" y2="${k*105}"/>`;
 return `<clipPath id="gcl"><ellipse rx="700" ry="880"/></clipPath><g clip-path="url(#gcl)" stroke="#0f57cc" stroke-width="9">${s}</g><ellipse rx="700" ry="880" fill="none" stroke="#0e52c2" stroke-width="80"/><rect x="-45" y="900" width="90" height="900" fill="#0e52c2"/>`;}
// racket: origin = hand on grip, head points up
function racket(){const id='cp'+(uid++);let s='';for(let k=-4;k<=4;k++)s+=`<line x1="${k*18}" y1="-400" x2="${k*18}" y2="-180"/>`;for(let k=0;k<=11;k++)s+=`<line x1="-90" y1="${-395+k*18}" x2="90" y2="${-395+k*18}"/>`;
 return `<rect x="-6" y="-200" width="12" height="150" fill="#dfe7f3" stroke="${INK}" stroke-width="6"/><path d="M-22,-196 L0,-160 L22,-196 Z" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
 <clipPath id="${id}"><ellipse cx="0" cy="-292" rx="74" ry="96"/></clipPath><ellipse cx="0" cy="-292" rx="74" ry="96" fill="#fff" opacity=".35"/><g clip-path="url(#${id})" stroke="#fff" stroke-width="3" opacity=".9">${s}</g>
 <ellipse cx="0" cy="-292" rx="74" ry="96" fill="none" stroke="${INK}" stroke-width="22"/><ellipse cx="0" cy="-292" rx="74" ry="96" fill="none" stroke="#fff" stroke-width="9"/>
 ${sh(rr(-13,-58,26,92,10),LOR,DOR,ln("M-13,-35 l26,-10 M-13,-12 l26,-10 M-13,11 l26,-10",'#8c3b00',4,.6),-6,-3,7)}`;}
// trophy: origin = bottom centre of base
function trophy(){
 const cup="M-112,-430 L112,-430 C112,-290 62,-215 0,-215 C-62,-215 -112,-290 -112,-430 Z";
 const hL="M-108,-400 C-200,-400 -200,-285 -92,-280",hR="M108,-400 C200,-400 200,-285 92,-280";
 return ln(hL,INK,40)+ln(hL,'#FFC93C',22)+ln(hR,INK,40)+ln(hR,'#E09A12',22)
  +sh(rr(-20,-222,40,82,8),'#FFC93C','#E09A12')+sh(rr(-52,-232,104,26,13),'#FFD866','#E09A12','',-6,-4)
  +sh(cup,'#FFD654','#E8A21A',ln("M-78,-405 C-76,-330 -56,-275 -22,-248","#fff",14,.75)+`<polygon points="${star(5,20,46)}" fill="#fff" opacity=".9" transform="translate(8,-335)"/>`)
  +`<ellipse cx="0" cy="-430" rx="112" ry="20" fill="#B97A0C" stroke="${INK}" stroke-width="9"/><ellipse cx="0" cy="-427" rx="92" ry="12" fill="#8E5C06"/>`
  +sh(rr(-84,-150,168,44,12),'#FFD654','#E09A12','',-8,-5)+sh(rr(-118,-112,236,112,14),'#1a4bc4',NAVY,`<rect x="-62" y="-76" width="124" height="42" rx="6" fill="#FFD654" stroke="${INK}" stroke-width="5"/><rect x="-40" y="-60" width="80" height="6" rx="3" fill="#B97A0C"/><rect x="-28" y="-48" width="56" height="5" rx="2.5" fill="#B97A0C"/>`);}
// medal: origin = disc centre
function medal(l,d,e){
 return `<polygon points="-92,-262 -40,-262 12,-66 -40,-66" fill="${BLUE}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><polygon points="-74,-262 -58,-262 -6,-66 -22,-66" fill="#fff"/>
 <polygon points="92,-262 40,-262 -12,-66 40,-66" fill="${OR}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><polygon points="74,-262 58,-262 6,-66 22,-66" fill="#fff"/>
 <circle cx="0" cy="-74" r="17" fill="${l}" stroke="${INK}" stroke-width="8"/>`
 +sh(circ(0,14,84),l,d,`<circle cx="0" cy="14" r="62" fill="none" stroke="${e}" stroke-width="6"/><polygon points="${star(5,18,42)}" fill="${e}" transform="translate(0,16)"/>`+ln("M-58,-20 A70,70 0 0,1 -14,-52","#fff",11,.8));}
const GOLD=['#FFD654','#E8A21A','#B97A0C'],SILVER=['#EEF2F6','#B4BEC9','#7F8B98'],BRONZE=['#F0B078','#C97B3C','#8E4E1C'];
// character head: origin = head centre, r≈78
const SKIN=['#FAD3B0','#F3C19A','#FBE0C4','#F6CBA6'],HAIR=['#1f2440','#5a3a22','#2b2b3d','#7a4a2a','#3a2a1c'];
function head(i){const sk=SKIN[i%4],hc=HAIR[(i*3)%5],st=i%6;let back='',front='',extra='';
 const fr1=`<path d="M-80,-4 C-86,-100 86,-100 80,-4 C52,-44 -8,-56 -80,-4 Z" fill="${hc}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`;
 const fr2=`<path d="M-80,2 C-88,-104 88,-104 80,2 C60,-30 30,-42 0,-40 C-30,-42 -60,-30 -80,2 Z" fill="${hc}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`;
 if(st==0)front=fr1;
 if(st==1){back=`<path d="${rr(-92,-88,184,168,74)}" fill="${hc}" stroke="${INK}" stroke-width="8"/>`;front=fr2;}
 if(st==2){back=`<ellipse cx="88" cy="-6" rx="30" ry="64" transform="rotate(-22 88 -6)" fill="${hc}" stroke="${INK}" stroke-width="8"/><circle cx="70" cy="-58" r="13" fill="${OR}" stroke="${INK}" stroke-width="6"/>`;front=fr2;}
 if(st==3)front=`<path d="M-80,-6 L-84,-62 L-52,-48 L-40,-98 L-10,-62 L12,-104 L34,-60 L66,-88 L62,-40 L84,-52 L80,-6 C52,-40 -30,-44 -80,-6 Z" fill="${hc}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`;
 if(st==4){front=fr1;extra=`<path d="M-76,-30 Q0,-58 76,-30 L78,-8 Q0,-36 -78,-8 Z" fill="${i%2?LOR:LBLUE}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;}
 if(st==5){back=`<circle cx="0" cy="-98" r="34" fill="${hc}" stroke="${INK}" stroke-width="8"/>`;front=fr2;}
 return back+`<circle cx="-78" cy="6" r="13" fill="${sk}" stroke="${INK}" stroke-width="7"/><circle cx="78" cy="6" r="13" fill="${sk}" stroke="${INK}" stroke-width="7"/>`
  +sh(circ(0,0,78),sk,'#E2A67C','',-9,-7,8)+front+extra
  +`<circle cx="-27" cy="12" r="8" fill="${INK}"/><circle cx="27" cy="12" r="8" fill="${INK}"/><circle cx="-24" cy="9" r="2.6" fill="#fff"/><circle cx="30" cy="9" r="2.6" fill="#fff"/><ellipse cx="-48" cy="34" rx="13" ry="8" fill="#ff8a80" opacity=".55"/><ellipse cx="48" cy="34" rx="13" ry="8" fill="#ff8a80" opacity=".55"/>`
  +(i%3==0?`<path d="M-17,34 Q0,58 17,34 Z" fill="#8c2f1a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`:ln("M-17,36 Q0,52 17,36",INK,6));}
// bust avatar: origin = head centre; shirt fill settable via id
function avatar(i,sid,col='#fff'){
 return `<path id="${sid}" d="M-88,190 C-88,104 -52,84 0,84 C52,84 88,104 88,190 Z" fill="${col}"/><path d="M30,84 C60,90 88,110 88,190 L52,190 C52,130 44,100 30,84 Z" fill="${INK}" opacity=".16"/><path d="M-88,190 C-88,104 -52,84 0,84 C52,84 88,104 88,190 Z" fill="none" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M-24,86 Q0,112 24,86" fill="none" stroke="${INK}" stroke-width="6"/>`+head(i);}
// full figure: origin = feet centre, faces right. opts: racketId (group id for swinging arm), armUp
function figure(i,col,o={}){
 const arm=o.armUp?`<g>${ln("M40,-272 L92,-500",INK,46)}${ln("M40,-272 L92,-500",SKIN[i%4],30)}<circle cx="94" cy="-512" r="24" fill="${SKIN[i%4]}" stroke="${INK}" stroke-width="8"/></g>`
  :`<g id="${o.armId||''}" transform="translate(40,-272)">${o.noRacket?'':`<g transform="translate(72,-40)">${racket()}</g>`}${ln("M0,0 L72,-40",INK,46)}${ln("M0,0 L72,-40",SKIN[i%4],30)}<circle cx="74" cy="-41" r="21" fill="${SKIN[i%4]}" stroke="${INK}" stroke-width="8"/></g>`;
 return `<ellipse cx="-30" cy="-6" rx="36" ry="17" fill="#fff" stroke="${INK}" stroke-width="8"/><ellipse cx="38" cy="-6" rx="36" ry="17" fill="#fff" stroke="${INK}" stroke-width="8"/>
 <rect x="-44" y="-100" width="28" height="88" fill="${SKIN[i%4]}" stroke="${INK}" stroke-width="8"/><rect x="18" y="-100" width="28" height="88" fill="${SKIN[i%4]}" stroke="${INK}" stroke-width="8"/>`
 +sh(rr(-58,-170,116,84,20),'#1a4bc4',NAVY,'',-8,-5,8)+ln("M-52,-210 L-74,-130",INK,44)+ln("M-52,-210 L-74,-130",SKIN[i%4],28)
 +sh(rr(-64,-312,128,166,44),col,col,`<path d="M20,-312 h60 v170 h-60 Z" fill="${INK}" opacity=".16"/><path d="M-64,-250 h128 v20 h-128 Z" fill="#fff" opacity=".85"/>`,0,0,8)
 +arm+`<g transform="translate(0,-388) scale(.92)">${head(i)}</g>`;}
// text
function T(id,x,y,str,size,fill,stroke,sw,shadow=INK){
 return `<g id="${id}" class="txt" data-x="${x}" data-y="${y}">${shadow?`<text font-size="${size}" fill="${shadow}" stroke="${shadow}" stroke-width="${sw}" transform="translate(0,${Math.round(size*0.085)})">${str}</text>`:''}<text font-size="${size}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}">${str}</text></g>`;}
function pill(id,x,y,str,size,bg,fg,stk=INK,w=0){w=w||str.length*size*1.04+size*1.3;const hh=size*.86;
 return `<g id="${id}" class="txt" data-x="${x}" data-y="${y}"><rect x="${-w/2}" y="${-hh}" width="${w}" height="${hh*2}" rx="${hh}" fill="${bg}" stroke="${stk}" stroke-width="8"/><text font-size="${size}" fill="${fg}" y="${-size*.04}">${str}</text></g>`;}
function bubble(id,x,y,str,tail=0,size=50){const w=str.length*size*1.04+90,hh=64;
 return `<g id="${id}" class="txt" data-x="${x}" data-y="${y}"><path d="M${tail-26},${hh-6} L${tail*1.6},${hh+56} L${tail+26},${hh-6} Z" fill="#fff" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><rect x="${-w/2}" y="${-hh}" width="${w}" height="${hh*2}" rx="46" fill="#fff" stroke="${INK}" stroke-width="8"/><path d="M${tail-22},${hh-12} L${tail+22},${hh-12} L${tail+18},${hh+2} L${tail-18},${hh+2} Z" fill="#fff"/><text font-size="${size}" fill="${INK}" y="-3">${str}</text></g>`;}
const DEFS=()=>`<g id="shamoji">${shamoji()}</g><g id="broom">${broom()}</g><g id="ladle">${ladle()}</g><g id="pingpong">${pingpong()}</g><g id="shuttle">${shuttle()}</g><g id="spoon">${spoon()}</g><g id="giant">${giant()}</g><g id="trophy">${trophy()}</g>
<g id="mgold">${medal(...GOLD)}</g><g id="msilver">${medal(...SILVER)}</g><g id="mbronze">${medal(...BRONZE)}</g>
${dotsPat('dA','#fff',.16)}${dotsPat('dB','#fff',.09,54,5)}${dotsPat('dC',BLUE,.10,50,5)}
<radialGradient id="v1" cx=".5" cy=".45" r=".75"><stop offset=".45" stop-color="#c85d0f" stop-opacity="0"/><stop offset="1" stop-color="#c85d0f" stop-opacity=".55"/></radialGradient>
<linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a78ee"/><stop offset="1" stop-color="#0f55cf"/></linearGradient>
<radialGradient id="v3" cx=".5" cy=".6" r=".8"><stop offset="0" stop-color="#143a9e"/><stop offset=".6" stop-color="#06205f"/><stop offset="1" stop-color="#031340"/></radialGradient>
<linearGradient id="spot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity=".03"/></linearGradient>
<linearGradient id="g4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfeafc"/></linearGradient>`;
// おもちゃのバドミントンラケット（太いプラスチックの枠・目の粗いガット）: 原点 = 持ち手の下端
function toyRacket(){const id='cp'+(uid++);let g='';for(let k=-3;k<=3;k++)g+=`<line x1="${k*26}" y1="-420" x2="${k*26}" y2="-160"/>`;for(let k=0;k<=9;k++)g+=`<line x1="-100" y1="${-405+k*26}" x2="100" y2="${-405+k*26}"/>`;
 return `<clipPath id="${id}"><ellipse cx="0" cy="-290" rx="88" ry="112"/></clipPath><ellipse cx="0" cy="-290" rx="88" ry="112" fill="#fff" opacity=".5"/><g clip-path="url(#${id})" stroke="${LBLUE}" stroke-width="6">${g}</g>
 <ellipse cx="0" cy="-290" rx="88" ry="112" fill="none" stroke="${INK}" stroke-width="40"/><ellipse cx="0" cy="-290" rx="88" ry="112" fill="none" stroke="#FFD654" stroke-width="24"/>${ln("M-62,-360 A80,100 0 0,1 -10,-392","#fff",8,.8)}
 ${sh(rr(-14,-185,28,110,10),'#FFD654','#E8A21A','',-5,-3,8)}${sh(rr(-24,-88,48,92,18),'#FF6FA8','#E0457F',ln("M-24,-60 h48 M-24,-34 h48",'#fff',5,.5),-6,-4,8)}`;}
// shared end card
function endCard(n,decor){
 const fc=[OR,BLUE,LBLUE,LOR,NAVY];let flags='';for(let i=0;i<11;i++){const x=i*108,y=150+Math.sin(i/10*Math.PI)*70;flags+=`<polygon points="${x-40},${y} ${x+40},${y+6} ${x+2},${y+92}" fill="${fc[i%5]}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;}
 let conf='';for(let i=0;i<34;i++){conf+=`<rect class="cf" data-x="${(i*197)%1080}" data-y="${(i*331)%1500}" data-i="${i}" width="${i%3?22:14}" height="${i%3?10:14}" rx="3" fill="${fc[i%5]}"/>`;}
 const tree=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><rect x="-13" y="0" width="26" height="110" fill="#8c3b00" stroke="${INK}" stroke-width="6"/><circle cy="-40" r="78" fill="#fff" stroke="${INK}" stroke-width="7"/><circle cx="-20" cy="-58" r="30" fill="${PALE}"/></g>`;
 return `<g id="s${n}"><rect width="1080" height="1920" fill="url(#g4)"/><g id="rays4" transform="translate(540,960)">${rays(14,'#cfe0fb',.45)}</g><rect width="1080" height="1920" fill="url(#dC)"/>${conf}
 <path d="M-20,150 Q540,300 1100,150" fill="none" stroke="${INK}" stroke-width="6"/>${flags}
 <ellipse cx="820" cy="1900" rx="700" ry="330" fill="${LBLUE}"/><ellipse cx="200" cy="1960" rx="760" ry="360" fill="${BLUE}"/><g transform="translate(165,1650) rotate(-14) scale(.72)">${toyRacket()}</g><g transform="translate(925,1630) rotate(14) scale(.58)">${racket()}</g>
 <g id="mini">${decor}</g><g id="st4"><use href="#shuttle" transform="scale(1.25)"/></g>
 ${T('t4a',540,680,'バドミントンパーク',106,BLUE,'#fff',22,INK)}${T('t4b',540,880,'2026',250,OR,'#fff',26,INK)}
 <g id="t4c" class="txt" data-x="540" data-y="1105"><rect x="-330" y="-66" width="660" height="132" rx="66" fill="${INK}"/><text font-size="84" fill="#fff" y="-4">11.23<tspan font-size="54" dx="16" dy="6">月・祝</tspan></text></g>
 <g id="t4d" class="txt" data-x="540" data-y="1232"><text font-size="44" fill="${INK}">Snow Crystal × 法政大学バドミントン部</text></g></g>`;}
function renderEnd(u){
 $('rays4').setAttribute('transform',`translate(540,960) rotate(${u*10})`);
 document.querySelectorAll('.cf').forEach(c=>{const i=+c.dataset.i;c.setAttribute('transform',`translate(${+c.dataset.x+20*Math.sin(u*3+i)},${(+c.dataset.y+u*260+i*7)%1500-40}) rotate(${u*200+i*40})`);});
 const d=eo(u/.35);$('st4').setAttribute('transform',`translate(540,${440-260*(1-d)-14*Math.sin(u*5)}) rotate(${172+8*Math.sin(u*4)})`);
 $('mini').setAttribute('transform',`translate(0,${260*(1-back((u-.15)/.4))})`);
 pop('t4a',u,.08);pop('t4b',u,.2,.32);pop('t4c',u,.36);pop('t4d',u,.48);}
const WIPE=`<g id="wipe"><polygon points="300,0 2100,0 1800,1920 0,1920" fill="${LBLUE}"/><polygon points="520,0 2100,0 1800,1920 220,1920" fill="#fff"/><polygon points="700,0 2100,0 1800,1920 400,1920" fill="${INK}"/></g>`;
const $=id=>document.getElementById(id);
const cl=x=>Math.max(0,Math.min(1,x));
const eo=x=>1-Math.pow(1-cl(x),3);
const eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;};
const lerp=(a,b,p)=>a+(b-a)*p;
const back=x=>{x=cl(x);const c=2.2;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);};
function pop(id,u,t0,d=.28,t1=1e9){const g=$(id),p=(u-t0)/d,s=p<=0?0:back(p);const out=1-cl((u-t1)/.15);g.setAttribute('transform',`translate(${g.dataset.x},${g.dataset.y}) scale(${Math.max(s*out,0.001)})`);g.setAttribute('opacity',p<=0||out<=0?0:cl(p*4));}
const A=(id,k,v)=>$(id).setAttribute(k,v);
let SC=[];
function build(extraDefs,scenes,sc){document.getElementById('root').innerHTML=`<defs>${DEFS()}${extraDefs}</defs>`+scenes+WIPE;SC=sc;
 if(location.hash=='#notext'||new URLSearchParams(location.search).has('notext')){const s=document.createElement('style');s.textContent='.txt{visibility:hidden}';document.head.appendChild(s);}render(0);}
function render(t){let k=0;SC.forEach((s,i)=>{if(t>=s[0])k=i;});SC.forEach((s,i)=>A('s'+i,'display',i==k?'inline':'none'));
 let wv=false;SC.slice(1).forEach(s=>{const p=(t-s[0])/0.22;if(p>-1&&p<1){wv=true;A('wipe','transform',`translate(${-360-p*2300},0)`);}});A('wipe','display',wv?'inline':'none');
 SC[k][1](t-SC[k][0]);}
const PAGE_CSS=`html,body{margin:0;background:#000}svg{display:block}text{font-family:"M PLUS 1p","Hiragino Sans","Noto Sans CJK JP","Noto Sans JP",sans-serif;font-weight:900;text-anchor:middle;dominant-baseline:central;paint-order:stroke;stroke-linejoin:round}`;
document.head.insertAdjacentHTML('beforeend',`<style>${PAGE_CSS}</style>`);
