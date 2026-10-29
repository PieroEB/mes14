(() => {
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const chapters=$$('.chapter'),world=window.World.state,reduced=matchMedia('(prefers-reduced-motion: reduce)');
let active=0,positions=[],pending=false,toastTimer,greetingTimer;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const defaults={route:'lake',destination:'mountain',wish:'',plan:'',stars:[],ingredients:[],dreams:[]};
let saved={...defaults};
try{const raw=JSON.parse(localStorage.getItem('mes14-story-v2')||'{}');if(raw&&typeof raw==='object'){saved={...defaults,...raw};saved.stars=Array.isArray(raw.stars)?raw.stars.filter(n=>Number.isInteger(n)&&n>=0&&n<5):[];saved.ingredients=Array.isArray(raw.ingredients)?raw.ingredients.filter(s=>['risas','besos','ganas'].includes(s)):[];saved.dreams=Array.isArray(raw.dreams)?raw.dreams.filter(s=>['risas','abrazo','dias'].includes(s)):[];saved.wish=typeof raw.wish==='string'?raw.wish.slice(0,160):'';saved.plan=typeof raw.plan==='string'?raw.plan:'';}}catch{}
function persist(){try{localStorage.setItem('mes14-story-v2',JSON.stringify(saved));return true;}catch{return false;}}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3200);}
function sparkleAt(button,color){const r=button.getBoundingClientRect();window.World.burst(r.left+r.width/2,r.top+r.height/2,color);}
function go(index,animate=true){index=clamp(index,0,chapters.length-1);chapters[index].scrollIntoView({behavior:animate&&!reduced.matches?'smooth':'instant',block:'start'});}
function measure(){positions=chapters.map(el=>({top:el.offsetTop,height:el.offsetHeight,center:el.offsetTop+el.offsetHeight/2}));update();}
function update(){
 const center=scrollY+innerHeight/2;
 let from=0,to=0,amount=0;
 if(center>=positions[positions.length-1].center)from=to=positions.length-1;
 else if(center>positions[0].center){for(let i=0;i<positions.length-1;i++)if(center>=positions[i].center&&center<positions[i+1].center){from=i;to=i+1;amount=(center-positions[i].center)/(positions[i+1].center-positions[i].center);break;}}
 const t=clamp((amount-.18)/.64);world.from=from;world.to=to;world.mix=t*t*(3-2*t);
 active=amount>=.5?to:from;
 document.body.dataset.dark=String([1,2,6,7,9].includes(active)||(active===5&&world.sun>.62));
 $('#scene-number').textContent=active===0?'PRÓLOGO':String(active).padStart(2,'0')+' / 11';
 $('#scene-name').textContent=chapters[active].dataset.name;syncNote();
 $('#previous').disabled=active===0;$('#next').disabled=active===chapters.length-1;
 $('.journey-nav').classList.toggle('visible',scrollY>innerHeight*.25);
 const max=document.documentElement.scrollHeight-innerHeight;if($('#progress'))$('#progress').style.transform='scaleX('+clamp(max>0?scrollY/max:0)+')';
 chapters.forEach((el,i)=>{const distance=Math.abs(positions[i].center-center);const visibility=clamp(1-(distance/innerHeight-.22)*.9,.06,1);el.style.setProperty('--visibility',String(visibility));});
 pending=false;
}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});
addEventListener('resize',measure);new ResizeObserver(measure).observe($('#story'));document.fonts.ready.then(measure);measure();
$('#next').addEventListener('click',()=>go(active+1));$('#previous').addEventListener('click',()=>go(active-1));$('[data-next]').addEventListener('click',()=>go(1));
$('#chapter-links').innerHTML=chapters.map((el,i)=>'<a href="#'+el.id+'"><span>'+String(i).padStart(2,'0')+'</span>'+el.dataset.name+'</a>').join('');
$('#map-open').addEventListener('click',()=>$('#map-dialog').showModal());
$$('dialog').forEach(dialog=>{dialog.addEventListener('click',event=>{if(event.target.closest('.dialog-close'))dialog.close();if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}});});
$$('#chapter-links a').forEach((a,i)=>a.addEventListener('click',event=>{event.preventDefault();$('#map-dialog').close();go(i,false);}));
$('.credits-open').addEventListener('click',()=>{$('#map-dialog').close();$('#credits-dialog').showModal();});
$('#map-dialog').setAttribute('aria-label','Mapa de nuestro universo');$('#plans-dialog').setAttribute('aria-label','Elegir nuestra primera cita');$('#credits-dialog').setAttribute('aria-label','Créditos de las ilustraciones');

function hop(el){el.classList.remove('hop');void el.offsetWidth;el.classList.add('hop');}
function greet(name,text){$('#greeting').replaceChildren();const strong=document.createElement('strong');strong.textContent=name;$('#greeting').append(strong,document.createTextNode(text));$('#greeting').hidden=false;clearTimeout(greetingTimer);greetingTimer=setTimeout(()=>$('#greeting').hidden=true,6500);}
const ashLines=['¡Hola! Soy Ash y este es Pikachu. Nos colamos en tu regalo, no le digas a nadie.','Pikachu quería darte un abrazo, pero da chispas. Mejor te lo da Piero cuando te vea.','Yo me demoré años en ganar una liga. Él se ganó el premio mayor contigo.'],justinLines=['Hey! Me dijeron que hoy es un día especial. Feliz aniversario.','Tengo fans por todo el mundo, pero él solo tiene ojos para una.','14 meses, ¿no? Eso no lo aguanta cualquiera. Felicidades a los dos.'];let ashTurn=0,justinTurn=0;
$('#ash-hello').addEventListener('click',event=>{greet('ASH + PIKACHU',ashLines[ashTurn++%ashLines.length]);sparkleAt(event.currentTarget,'#ffd884');hop(event.currentTarget);});
$('#justin-hello').addEventListener('click',event=>{greet('JUSTIN BIEBER',justinLines[justinTurn++%justinLines.length]);sparkleAt(event.currentTarget,'#e7a8f3');hop(event.currentTarget);});
const dreams={risas:'Algún día nos vamos a reír tanto, en el mismo lugar, que nos va a doler la panza.',abrazo:'Algún día te voy a abrazar sin mirar el reloj, sin ninguna llamada que cortar.',dias:'Algún día un martes cualquiera también va a ser nuestro: tú, yo y nada que hacer.'};
$$('[data-dream]').forEach(button=>{button.setAttribute('aria-pressed',String(saved.dreams.includes(button.dataset.dream)));button.addEventListener('click',()=>{const key=button.dataset.dream;if(!saved.dreams.includes(key))saved.dreams.push(key);button.setAttribute('aria-pressed','true');$('#forest-secret').textContent=dreams[key];persist();sparkleAt(button);});});
$('#ticket').addEventListener('click',()=>{const opened=$('#ticket').getAttribute('aria-expanded')==='true';$('#ticket').setAttribute('aria-expanded',String(!opened));$('#ticket-message').textContent=opened?'':'Última parada: tus brazos. Ahí pienso quedarme un buen rato.';if(!opened)sparkleAt($('#ticket'),'#f8cba2');});
$$('[data-cup]').forEach(button=>button.addEventListener('click',()=>{$('#cafe-message').textContent=button.dataset.cup==='tu'?'Tu café, como te gusta. Y yo enfrente, mirándote sin disimular.':'El mío siempre se enfría. Contigo se me olvida todo lo demás.';sparkleAt(button,'#f5dfb9');}));
function setRoute(route,announce=false){saved.route=route==='garden'?'garden':'lake';world.route=saved.route;$$('[data-route]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.route===saved.route)));$('#route-message').textContent=saved.route==='lake'?'Junto al lago: tu cabeza en mi hombro y el agua sonando bajito.':'Entre las flores: yo diciendo que todas son lindas, y tú ganándoles a todas.';if(announce)persist();}
$$('[data-route]').forEach(b=>b.addEventListener('click',()=>setRoute(b.dataset.route,true)));setRoute(saved.route);
$('#sun-slider').addEventListener('input',()=>{world.sun=Number($('#sun-slider').value)/100;const arrived=world.sun>.68,was=$('#atardecer').classList.contains('complete');if(arrived===was){update();return;}if(arrived)window.World.shower(26);$('#atardecer').classList.toggle('complete',arrived);$('#sunset-title').innerHTML=arrived?'No importa<br><span>el lugar.</span>':'<span>Ojalá</span><br>estuvieras aquí.';$('#sunset-line').textContent=arrived?'Solo estar contigo. Eso es lo que tanto amo.':'Arrastra el sol hasta el horizonte.';update();});
$('#lights').addEventListener('click',()=>{world.lights=!world.lights;$('#lights').setAttribute('aria-pressed',String(world.lights));$('#lights span').textContent=world.lights?'Enciende las luces':'Apaga las luces';$('#movie-title').innerHTML=world.lights?'Silencio.<br><em>Por fin, juntos.</em>':'Una, dos…<br><em>o más de mil.</em>';$('#movie-subtitle').textContent=world.lights?'Si te quedas dormida en mi hombro, yo te cuento el final.':'Todas las películas que nos esperan para verlas juntos.';});
$('#umbrella').addEventListener('click',()=>{world.umbrella=!world.umbrella;$('#umbrella').setAttribute('aria-pressed',String(world.umbrella));$('#umbrella').textContent=world.umbrella?'Aquí estoy ♡':'Abre nuestro paraguas ☂';$('#rain-message').textContent=world.umbrella?'No tienes que estar bien para que me quede. Me quedo igual, con lluvia y todo.':'';});
const trips={mountain:'Montañas: frío, tu mano en mi bolsillo y una vista que no va a ser lo más bonito que mire.',sea:'El mar: arena en todos lados, sal en el pelo y tú riéndote con el sol en la cara.',city:'Una ciudad nueva: perdernos en calles que no conocemos hasta que se vuelvan nuestras.'};
function setDestination(value,write=false){saved.destination=['mountain','sea','city'].includes(value)?value:'mountain';world.destination=saved.destination;$('#trip-message').textContent=trips[saved.destination];$$('[data-destination]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.destination===saved.destination)));if(write)persist();}
$$('[data-destination]').forEach(button=>button.addEventListener('click',()=>{setDestination(button.dataset.destination,true);sparkleAt(button,'#e8d9f2');}));setDestination(saved.destination);
function syncStars(){$$('[data-star]').forEach(b=>{const lit=saved.stars.includes(Number(b.dataset.star));b.classList.toggle('lit',lit);b.setAttribute('aria-pressed',String(lit));});$('.constellation').classList.toggle('complete',saved.stars.length===5);if(saved.stars.length===5)$('.stars-copy>p:last-child').innerHTML='¿Lo ves? Hasta las estrellas<br>se ponen de acuerdo para unirnos.';}
$$('[data-star]').forEach(button=>button.addEventListener('click',()=>{const n=Number(button.dataset.star),before=saved.stars.length;if(!saved.stars.includes(n))saved.stars.push(n);syncStars();if(before===4&&saved.stars.length===5)window.World.shower(30);persist();sparkleAt(button,'#f6b1d2');}));syncStars();
$('#wish').value=saved.wish;
$('#wish-form').addEventListener('submit',event=>{event.preventDefault();const wish=$('#wish').value.trim();if(!wish){$('#wish-message').textContent='Escribe un deseo pequeñito antes de guardarlo.';$('#wish').focus();return;}saved.wish=wish.slice(0,160);const kept=persist();$('#wish-message').textContent=kept?'Tu deseo quedó guardado aquí. Ojalá podamos vivirlo.':'Tu deseo está aquí mientras mantengas la página abierta.';sparkleAt($('#wish-form button'),'#e6c1f2');});
const settings=window.GIFT||{};if(typeof settings.carta==='string'&&settings.carta.trim())$('#letter-text').textContent=settings.carta.trim();$('#recipient').textContent=(settings.recipient||'mi amor').replace(/\.$/,'')+'.';$('#signed').textContent='Con amor, '+(settings.sender||'yo')+'.';
$('#door').addEventListener('click',()=>{world.door=true;$('#hogar').classList.add('open');$('#final-letter').hidden=false;$('#hogar').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});sparkleAt($('#door'),'#ffdda5');window.World.shower(50);});
const plans=chapters.slice(2).map(el=>({id:el.id,name:el.dataset.name}));
$('#plan-options').innerHTML=plans.map(p=>'<button data-plan="'+p.id+'" aria-pressed="false">'+p.name+'</button>').join('');
function syncPlans(){const found=plans.find(p=>p.id===saved.plan);$$('[data-plan]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.plan===saved.plan)));$('#chosen-plan').textContent=found?'Nuestra primera cita pendiente: '+found.name.toLowerCase()+'.':'';}
$$('[data-plan]').forEach(button=>button.addEventListener('click',()=>{saved.plan=saved.plan===button.dataset.plan?'':button.dataset.plan;persist();syncPlans();$('#plans-dialog').close();toast(saved.plan?'Ya tenemos nuestro primer plan ♡':'Podemos seguir imaginando.');}));
$('#plans-open').addEventListener('click',()=>$('#plans-dialog').showModal());syncPlans();
if(settings.photos&&typeof settings.photos==='object'){for(const [id,url]of Object.entries(settings.photos)){const parent=document.getElementById(id);if(!parent||!parent.classList.contains('chapter')||typeof url!=='string'||!url)continue;const img=document.createElement('img');img.src=url;img.alt='Una imagen de nuestro sueño juntos';img.className='photo-memory';img.loading='lazy';parent.append(img);}}
// Notas escritas a mano en content.js: el botón aparece solo en las escenas que tienen una.
function noteFor(i){const notes=(window.GIFT&&window.GIFT.notas)||{},text=notes[chapters[i].id];return typeof text==='string'?text.trim():'';}
function syncNote(){const button=$('#note-open');if(!button)return;const has=Boolean(noteFor(active));if(button.hidden===has){button.hidden=!has;if(has){button.classList.remove('arrive');void button.offsetWidth;button.classList.add('arrive');}}}
$('#note-open').addEventListener('click',()=>{$('#note-scene').textContent=chapters[active].dataset.name.toUpperCase();$('#note-text').textContent=noteFor(active);$('#note-signed').textContent='— '+((window.GIFT&&window.GIFT.sender)||'yo');$('#note-dialog').showModal();sparkleAt($('#note-open'),'#ffd9a8');});
$('#note-dialog').setAttribute('aria-label','Una nota para ti');syncNote();
// Las escenas aparecen con una pequeña entrada al llegar a ellas.
if('IntersectionObserver' in window){document.documentElement.classList.add('reveal-ready');$$('[class$="-copy"],.cinema-screen').forEach(box=>[...box.children].forEach((child,i)=>child.style.setProperty('--i',i)));const seen=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');seen.unobserve(e.target);}}),{threshold:.2});chapters.forEach(el=>seen.observe(el));}
// Cada mensaje nuevo entra suavemente en lugar de aparecer de golpe.
const live='[aria-live],#greeting,#sunset-title,#movie-title';
const refresh=new MutationObserver(list=>{const done=new Set();list.forEach(m=>{const el=m.target.nodeType===1?m.target:m.target.parentElement,box=el&&el.closest(live);if(box&&!done.has(box)){done.add(box);box.classList.remove('refresh');void box.offsetWidth;box.classList.add('refresh');}});});
$$(live).forEach(el=>refresh.observe(el,{childList:true,characterData:true,subtree:true}));
let audio,master,musicOn=false,musicTimer,noteIndex=0;
const melody=[261.63,329.63,392,493.88,440,392,329.63,293.66,329.63,392,523.25,493.88];
function note(freq,delay=0){const oscillator=audio.createOscillator(),gain=audio.createGain(),at=audio.currentTime+delay;oscillator.type='sine';oscillator.frequency.value=freq;gain.gain.setValueAtTime(0,at);gain.gain.linearRampToValueAtTime(.04,at+.06);gain.gain.exponentialRampToValueAtTime(.0001,at+2.7);oscillator.connect(gain);gain.connect(master);oscillator.start(at);oscillator.stop(at+2.8);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};}
function musicTick(){if(document.hidden)return;note(melody[noteIndex%melody.length]);if(noteIndex%4===0)note(130.81,.1);noteIndex++;}
$('#music').addEventListener('click',async()=>{try{if(!audio){audio=new(window.AudioContext||window.webkitAudioContext)();master=audio.createGain();master.gain.value=.65;master.connect(audio.destination);}if(musicOn){clearInterval(musicTimer);await audio.suspend();musicOn=false;}else{await audio.resume();musicOn=true;musicTick();musicTimer=setInterval(musicTick,1000);}$('#music').setAttribute('aria-pressed',String(musicOn));$('#music').setAttribute('aria-label',musicOn?'Silenciar ambiente musical':'Activar ambiente musical');}catch{toast('El sonido no pudo activarse en este navegador.');}});
addEventListener('pagehide',()=>{clearInterval(musicTimer);if(audio)audio.suspend();});
})();


