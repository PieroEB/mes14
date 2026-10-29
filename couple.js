// Caricaturas de nosotros dos, dibujadas en SVG para cada escena.
// Ella: pelo largo castaño cobrizo y lentes negros. Él: pelo oscuro despeinado.
(() => {
'use strict';
const C={herSkin:'#f8dccb',herShade:'#eec3ad',herHair:'#a6603a',herHairDark:'#8a4b2b',hisSkin:'#eec4a2',hisShade:'#e0ad89',hisHair:'#2a2026',glasses:'#241c27',cheek:'#f2a0a6'};
const n=v=>Math.round(v*10)/10;
const svg=(w,h,body,vb)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(vb||'0 0 '+w+' '+h)+'" width="'+w*3+'" height="'+h*3+'">'+body+'</svg>';
const at=(x,y,t,body)=>'<g transform="translate('+n(x)+' '+n(y)+') rotate('+t+' 0 40)">'+body+'</g>';
const heart=(x,y,s,color)=>'<path d="M'+x+','+(y+s*.9)+' C'+(x-s*1.4)+','+(y-s*.1)+' '+(x-s*.7)+','+(y-s*1.2)+' '+x+','+(y-s*.45)+' C'+(x+s*.7)+','+(y-s*1.2)+' '+(x+s*1.4)+','+(y-s*.1)+' '+x+','+(y+s*.9)+'Z" fill="'+color+'"/>';
function arm(sx,sy,a,len,sleeve,skin,long){return '<g transform="rotate('+n(a)+' '+sx+' '+sy+')"><rect x="'+(sx-6)+'" y="'+n(sy+len*.3)+'" width="12" height="'+n(len*.66)+'" rx="6" fill="'+(long?sleeve:skin)+'"/><rect x="'+(sx-7.5)+'" y="'+(sy-7)+'" width="15" height="'+n(len*.5)+'" rx="7.5" fill="'+sleeve+'"/><circle cx="'+sx+'" cy="'+n(sy+len)+'" r="7.2" fill="'+skin+'"/></g>';}
function armTo(sx,sy,tx,ty,sleeve,skin,long){return arm(sx,sy,-Math.atan2(tx-sx,ty-sy)*180/Math.PI,Math.hypot(tx-sx,ty-sy),sleeve,skin,long);}
const herArm=(o,sx,sy,a,len=58)=>arm(sx,sy,a,len,o.top,C.herSkin,o.long);
const herArmTo=(o,sx,sy,tx,ty)=>armTo(sx,sy,tx,ty,o.top,C.herSkin,o.long);
const hisArm=(o,sx,sy,a,len=66)=>arm(sx,sy,a,len,o.top,C.hisSkin,o.long);
const hisArmTo=(o,sx,sy,tx,ty)=>armTo(sx,sy,tx,ty,o.top,C.hisSkin,o.long);
// Cabezas de frente y de espaldas.
const herHairBack=(x,y,t=0)=>at(x,y,t,'<path d="M-48,-8 C-56,-62 56,-62 48,-8 C52,24 56,52 50,78 C30,88 -30,88 -50,78 C-56,52 -52,24 -48,-8Z" fill="'+C.herHair+'"/>');
const herHead=(x,y,t=0)=>at(x,y,t,'<ellipse cx="0" cy="2" rx="40" ry="43" fill="'+C.herSkin+'"/>'
 +'<path d="M-43,0 C-48,-48 22,-64 44,-18 C46,-6 44,4 42,10 C36,-12 22,-26 2,-30 C-14,-26 -30,-14 -43,0Z" fill="'+C.herHair+'"/>'
 +'<path d="M-43,-2 C-47,20 -45,40 -41,54 L-34,52 C-38,32 -38,14 -35,-6Z M43,0 C47,20 45,40 41,54 L34,52 C38,32 38,16 36,2Z" fill="'+C.herHair+'"/>'
 +'<ellipse cx="-24" cy="20" rx="7" ry="4" fill="'+C.cheek+'" opacity=".55"/><ellipse cx="24" cy="20" rx="7" ry="4" fill="'+C.cheek+'" opacity=".55"/>'
 +'<ellipse cx="-17" cy="6" rx="3.6" ry="4.4" fill="#2b2028"/><ellipse cx="17" cy="6" rx="3.6" ry="4.4" fill="#2b2028"/><circle cx="-15.8" cy="4.4" r="1.3" fill="#fff"/><circle cx="18.2" cy="4.4" r="1.3" fill="#fff"/>'
 +'<rect x="-31" y="-5" width="26" height="21" rx="7" fill="#ffffff26" stroke="'+C.glasses+'" stroke-width="3.6"/><rect x="5" y="-5" width="26" height="21" rx="7" fill="#ffffff26" stroke="'+C.glasses+'" stroke-width="3.6"/>'
 +'<path d="M-5,3 Q0,0 5,3 M-31,2 L-40,0 M31,2 L40,0" stroke="'+C.glasses+'" stroke-width="3" fill="none"/>'
 +'<path d="M-24,-12 Q-17,-15 -10,-12 M10,-12 Q17,-15 24,-12" stroke="#7a4a32" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
 +'<path d="M-8,26 Q0,33 8,26" stroke="#a24d5a" stroke-width="3" fill="none" stroke-linecap="round"/>');
const hisHead=(x,y,t=0)=>at(x,y,t,'<ellipse cx="-40" cy="6" rx="7" ry="9" fill="'+C.hisSkin+'"/><ellipse cx="40" cy="6" rx="7" ry="9" fill="'+C.hisSkin+'"/><ellipse cx="0" cy="2" rx="40" ry="44" fill="'+C.hisSkin+'"/>'
 +'<path d="M-44,4 C-54,-44 -24,-70 4,-62 C32,-68 56,-44 45,2 C42,-12 38,-20 32,-24 C26,-12 14,-10 6,-22 C0,-10 -14,-8 -20,-22 C-28,-12 -38,-6 -44,4Z" fill="'+C.hisHair+'"/>'
 +'<path d="M-22,-24 C-26,-10 -30,-4 -37,-1 C-31,-12 -28,-20 -22,-24Z M5,-24 C3,-12 -3,-6 -10,-3 C-4,-12 -1,-18 5,-24Z M30,-24 C32,-14 36,-8 41,-6 C36,-14 34,-20 30,-24Z" fill="'+C.hisHair+'"/>'
 +'<path d="M-25,-7 Q-17,-11 -9,-8 M9,-8 Q17,-11 25,-7" stroke="'+C.hisHair+'" stroke-width="3.6" fill="none" stroke-linecap="round"/>'
 +'<ellipse cx="-17" cy="6" rx="3.4" ry="3.9" fill="#231a20"/><ellipse cx="17" cy="6" rx="3.4" ry="3.9" fill="#231a20"/><circle cx="-16" cy="4.6" r="1.2" fill="#fff"/><circle cx="18" cy="4.6" r="1.2" fill="#fff"/>'
 +'<ellipse cx="-25" cy="19" rx="6" ry="3.5" fill="'+C.cheek+'" opacity=".35"/><ellipse cx="25" cy="19" rx="6" ry="3.5" fill="'+C.cheek+'" opacity=".35"/>'
 +'<path d="M-2,12 Q1,16 4,13" stroke="#c99878" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M-8,25 Q0,31 8,25" stroke="#9a5148" stroke-width="3" fill="none" stroke-linecap="round"/>');
const herBackHead=(x,y,t=0)=>at(x,y,t,'<path d="M-47,-6 C-54,-64 54,-64 47,-6 C52,26 55,58 48,86 C28,96 -28,96 -48,86 C-55,58 -52,26 -47,-6Z" fill="'+C.herHair+'"/>'
 +'<path d="M-20,-40 C-26,0 -24,40 -18,84 M6,-48 C4,0 6,44 8,90 M28,-36 C34,4 34,44 30,84" stroke="'+C.herHairDark+'" stroke-width="2.4" fill="none" opacity=".6"/><path d="M-50,-2 L-44,2 M50,-2 L44,2" stroke="'+C.glasses+'" stroke-width="3"/>');
const hisBackHead=(x,y,t=0)=>at(x,y,t,'<rect x="-9" y="30" width="18" height="22" fill="'+C.hisShade+'"/><ellipse cx="-40" cy="6" rx="7" ry="9" fill="'+C.hisSkin+'"/><ellipse cx="40" cy="6" rx="7" ry="9" fill="'+C.hisSkin+'"/><ellipse cx="0" cy="0" rx="41" ry="45" fill="'+C.hisHair+'"/>'
 +'<path d="M-34,24 Q0,42 34,24 L32,36 Q0,52 -32,36Z" fill="'+C.hisShade+'"/><path d="M-20,-30 q8,-10 16,0 M6,-36 q10,-8 18,2" stroke="#43363e" stroke-width="2.5" fill="none"/>');
// Cuerpos: el suelo está en gy.
function herBody(x,gy,o){return '<rect x="'+(x-15)+'" y="'+(gy-60)+'" width="11" height="54" rx="5" fill="'+(o.legs||C.herSkin)+'"/><rect x="'+(x+4)+'" y="'+(gy-60)+'" width="11" height="54" rx="5" fill="'+(o.legs||C.herSkin)+'"/>'
 +'<ellipse cx="'+(x-10)+'" cy="'+(gy-5)+'" rx="10" ry="6" fill="'+o.shoes+'"/><ellipse cx="'+(x+10)+'" cy="'+(gy-5)+'" rx="10" ry="6" fill="'+o.shoes+'"/>'
 +'<path d="M'+(x-24)+','+(gy-120)+' L'+(x+24)+','+(gy-120)+' L'+(x+36)+','+(gy-54)+' Q'+x+','+(gy-46)+' '+(x-36)+','+(gy-54)+'Z" fill="'+o.bottom+'"/>'
 +'<rect x="'+(x-8)+'" y="'+(gy-176)+'" width="16" height="16" fill="'+C.herShade+'"/><rect x="'+(x-27)+'" y="'+(gy-166)+'" width="54" height="54" rx="19" fill="'+o.top+'"/>'
 +(o.apron?'<path d="M'+(x-17)+','+(gy-150)+' L'+(x+17)+','+(gy-150)+' L'+(x+22)+','+(gy-62)+' Q'+x+','+(gy-57)+' '+(x-22)+','+(gy-62)+'Z" fill="'+o.apron+'"/>':'');}
function hisBody(x,gy,o){return '<rect x="'+(x-18)+'" y="'+(gy-72)+'" width="16" height="66" rx="6" fill="'+(o.legs||o.bottom)+'"/><rect x="'+(x+2)+'" y="'+(gy-72)+'" width="16" height="66" rx="6" fill="'+(o.legs||o.bottom)+'"/>'
 +'<ellipse cx="'+(x-11)+'" cy="'+(gy-5)+'" rx="12" ry="7" fill="'+o.shoes+'"/><ellipse cx="'+(x+11)+'" cy="'+(gy-5)+'" rx="12" ry="7" fill="'+o.shoes+'"/>'
 +'<rect x="'+(x-30)+'" y="'+(gy-120)+'" width="60" height="54" rx="12" fill="'+o.bottom+'"/><rect x="'+(x-9)+'" y="'+(gy-188)+'" width="18" height="16" fill="'+C.hisShade+'"/><rect x="'+(x-32)+'" y="'+(gy-180)+'" width="64" height="70" rx="20" fill="'+o.top+'"/>'
 +(o.apron?'<path d="M'+(x-20)+','+(gy-164)+' L'+(x+20)+','+(gy-164)+' L'+(x+24)+','+(gy-70)+' Q'+x+','+(gy-64)+' '+(x-24)+','+(gy-70)+'Z" fill="'+o.apron+'"/>':'');}
// Escenas: cada pose devuelve un SVG completo.
function hands(o){const g=300;return svg(260,310,herHairBack(92,g-200)+herBody(92,g,o.her)+herArm(o.her,67,g-158,10)+herArmTo(o.her,117,g-158,132,g-108)+herHead(92,g-200,5)
 +hisBody(170,g,o.him)+hisArm(o.him,200,g-170,-10)+hisArmTo(o.him,140,g-170,134,g-106)+hisHead(170,g-212,-5)+heart(131,32,10,'#f4a6c0'));}
function hug(o){const g=300;return svg(260,310,herHairBack(112,g-196,10)+hisBody(152,g,o.him)+hisArm(o.him,182,g-170,-8)+hisHead(152,g-212,-7)
 +hisArmTo(o.him,124,g-170,82,g-112)+herBody(112,g,o.her)+'<circle cx="82" cy="'+(g-112)+'" r="7.2" fill="'+C.hisSkin+'"/>'+herArm(o.her,87,g-158,8)+herHead(112,g-196,10)+herArmTo(o.her,136,g-156,166,g-112)
 +'<rect x="200" y="'+(g-66)+'" width="40" height="60" rx="8" fill="#d99a8a"/><rect x="200" y="'+(g-46)+'" width="40" height="6" fill="#c07f71"/><path d="M212,'+(g-66)+' v-10 h16 v10" stroke="#8d5d55" stroke-width="4" fill="none"/>'
 +heart(132,30,11,'#f4a6c0')+heart(150,10,6,'#ffd2a8'));}
function lean(o){const g=300;return svg(260,310,herHairBack(90,g-200,10)+herBody(90,g,o.her)+herArm(o.her,65,g-158,6)+herArm(o.her,115,g-158,-6)+herHead(90,g-200,10)
 +hisBody(170,g,o.him)+hisArm(o.him,140,g-170,6)+hisArm(o.him,200,g-170,-6)+hisHead(170,g-212,-8)+heart(130,40,9,'#f4a6c0'));}
function cook(o){const g=300;return svg(260,310,herHairBack(90,g-200,4)+herBody(90,g,o.her)+herArmTo(o.her,65,g-158,48,g-202)+'<path d="M48,'+(g-202)+' L42,'+(g-236)+'" stroke="#b8a9a0" stroke-width="3"/><ellipse cx="40" cy="'+(g-246)+'" rx="7" ry="12" fill="none" stroke="#c9bdb5" stroke-width="2.5"/>'
 +herArmTo(o.her,115,g-158,118,g-122)+'<path d="M100,'+(g-128)+' h44 q-4,26 -22,26 q-18,0 -22,-26Z" fill="#f4d6af"/><ellipse cx="122" cy="'+(g-128)+'" rx="22" ry="5" fill="#fff3e2"/>'+herHead(90,g-200,4)
 +hisBody(172,g,o.him)+hisArm(o.him,202,g-170,-10)+hisArmTo(o.him,142,g-170,124,g-176)+'<path d="M124,'+(g-176)+' L106,'+(g-188)+'" stroke="#a87b52" stroke-width="5" stroke-linecap="round"/><ellipse cx="102" cy="'+(g-190)+'" rx="7" ry="4.5" fill="#a87b52"/>'+hisHead(172,g-212,-6)
 +'<circle cx="190" cy="'+(g-188)+'" r="4" fill="#ffffffcc"/>'+heart(150,24,9,'#f4a6c0'));}
function sitBack(o){const g=300;return svg(260,310,'<ellipse cx="130" cy="'+(g-8)+'" rx="122" ry="14" fill="'+o.blanket+'"/>'
 +'<rect x="130" y="'+(g-122)+'" width="64" height="112" rx="24" fill="'+o.him.top+'"/>'+hisBackHead(162,g-160,-4)
 +'<rect x="74" y="'+(g-106)+'" width="54" height="96" rx="22" fill="'+o.her.top+'"/>'+herBackHead(106,g-142,16)
 +hisArmTo(o.him,136,g-112,78,g-96)+heart(134,40,10,'#f4a6c0')+heart(152,22,6,'#ffd2a8'));}
function sofa(o){const g=300;let s=herHairBack(100,g-194,16)+hisBody(166,g,o.him)+hisArm(o.him,136,g-170,8)+hisHead(166,g-212,-4)+herBody(100,g,o.her)+herArm(o.her,75,g-158,6)+herArm(o.her,125,g-158,-8)+herHead(102,g-194,16);
 s+='<rect x="18" y="'+(g-86)+'" width="226" height="86" rx="28" fill="'+o.blanket+'"/>';for(let i=0;i<5;i++)s+='<path d="M'+(44+i*44)+','+(g-84)+' v82" stroke="#ffffff55" stroke-width="5"/>';s+='<path d="M20,'+(g-50)+' H242" stroke="#ffffff44" stroke-width="5"/>';
 s+=hisArmTo(o.him,196,g-170,206,g-104)+'<path d="M190,'+(g-128)+' h34 l-5,40 h-24Z" fill="#fff4ec"/><path d="M198,'+(g-128)+' l2,40 M210,'+(g-128)+' l-1,40" stroke="#e48d9b" stroke-width="6"/>';
 for(let i=0;i<6;i++)s+='<circle cx="'+(193+(i*7)%30)+'" cy="'+(g-132-(i%2)*6)+'" r="6" fill="#fff6dd"/>';
 return svg(260,310,s+heart(134,28,9,'#f4a6c0'));}
function umbrella(o){const g=300;return svg(260,310,herHairBack(100,g-200,8)+herBody(100,g,o.her)+herArm(o.her,75,g-158,8)+herArmTo(o.her,125,g-158,129,g-120)+herHead(100,g-200,8)
 +hisBody(162,g,o.him)+hisArm(o.him,192,g-170,-8)+hisArmTo(o.him,132,g-170,131,g-126)+hisHead(162,g-212,-6));}
function walkBack(o){const g=300;return svg(260,310,herBody(100,g,o.her)+herArmTo(o.her,125,g-158,131,g-110)+herArm(o.her,75,g-158,8)+herBackHead(100,g-200,4)
 +hisBody(162,g,o.him)+hisArmTo(o.him,132,g-170,131,g-108)+hisArm(o.him,192,g-170,-8)+hisBackHead(162,g-212,-3)+heart(131,40,9,'#f4a6c0'));}
const herBust=o=>svg(120,150,herHairBack(0,0,4)+'<rect x="-34" y="44" width="68" height="60" rx="22" fill="'+o.top+'"/>'+herHead(0,0,4),'-60 -72 120 150');
const hisBust=o=>svg(120,150,'<rect x="-38" y="42" width="76" height="60" rx="24" fill="'+o.top+'"/>'+hisHead(0,0,-4),'-60 -76 120 150');
const W={top:'#fbf6ee'},cream='#f3ead8';
window.Couple={
 forest:hands({her:{top:'#cdb6ea',bottom:'#b69ddb',shoes:'#6b4f7a'},him:{top:'#34415f',bottom:'#2a3248',shoes:'#f2efe8',long:true}}),
 station:hug({her:{top:'#f1e1c6',bottom:'#e6c9a4',shoes:'#8a5f52',long:true},him:{top:'#3d4f70',bottom:'#2c3550',shoes:'#f2efe8',long:true}}),
 cafe:lean({her:{top:'#f4b9c6',bottom:'#c995a5',shoes:'#7b5260',long:true},him:{top:'#e8d6b9',bottom:'#5d6a84',shoes:'#f2efe8',long:true}}),
 kitchen:cook({her:{top:W.top,bottom:'#c7b2de',shoes:'#7b5f8a',apron:'#f3b6c4'},him:{top:W.top,bottom:'#5d6a84',shoes:'#f2efe8',apron:'#9cc2b8'}}),
 park:hands({her:{top:'#fbf6ee',bottom:'#f5d48f',shoes:'#c98e6d'},him:{top:'#a9c8e6',bottom:'#c9c2b4',shoes:'#f2efe8'}}),
 sunset:sitBack({blanket:'#e9b9c9',her:{top:'#d7c2ef'},him:{top:'#3d4f70'}}),
 cinema:sofa({blanket:'#d9a9c4',her:{top:'#cdb6ea',bottom:'#cdb6ea',shoes:'#fff',long:true},him:{top:'#9a9aa6',bottom:'#6f6f7c',shoes:'#fff',long:true}}),
 rain:umbrella({her:{top:'#f2b7c3',bottom:'#e7a2b2',shoes:'#f3d27a',legs:'#f3d27a',long:true},him:{top:'#3e5a7c',bottom:'#2c3550',shoes:'#f3d27a',long:true}}),
 stars:sitBack({blanket:'#6d5f9a',her:{top:cream},him:{top:'#47557a'}}),
 home:walkBack({her:{top:'#fbf6ee',bottom:'#c9b3e0',shoes:'#7b5f8a'},him:{top:'#fbf6ee',bottom:'#5d6a84',shoes:'#f2efe8'}}),
 portal:walkBack({her:{top:'#fbf6ee',bottom:'#e7c8e4',shoes:'#8b6c9b'},him:{top:'#fbf6ee',bottom:'#8d97ad',shoes:'#f2efe8'}}),
 herCar:herBust({top:'#f4b9c6'}),hisCar:hisBust({top:'#a9c8e6'})
};
})();
