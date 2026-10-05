const NAME='Dardoura';
const QUIZ=[
 {q:"You're in an exam and you want to cheat. What do you do?",o:['Ask with those eyes that can\'t be refused','Turn away and do it yourself','Hope he notices and helps'],r:'He always notices. He always helps. That\'s the deal, isn\'t it?'},
 {q:'Pick what matters most about someone.',o:['How they look at you','How they make you laugh','How they treat you when no one\'s watching'],r:'You have all three. That\'s rare, Mdrdra.'},
 {q:'When you\'re stressed about Bac, you want...',o:['Someone to believe in you','Someone to sit next to you quietly','Someone to make you laugh until you forget'],r:'Good. You deserve someone who does all of it.'}];
const MEM=[
 ['✦','Chapter one: The same room','You sat in the same classroom for years. He saw you there, day after day. But some things take time. Some things are worth waiting for.'],
 ['☾','Chapter two: This year','One day this year, he spoke. You answered. And somehow, a year of quiet became a conversation. How did that feel?'],
 ['♡','Chapter three: The eyes','He sees you when you laugh. He sees you when you\'re thinking. Those eyes of yours—he noticed them before you did.'],
 ['✿','Chapter four: The deal','You cheat. He helps. He pretends to be annoyed. You both know the truth. It\'s the smallest thing, and it\'s everything.'],
 ['★','Chapter five: The Bac is coming','Soon you\'ll be in the exam hall again. This time, he\'s not there. But his voice will be. Keep going. You\'ll pass. You\'ll shine.']];
const GIFTS=[['A study date','Just the two of you, books and coffee and laughter.'],['One quiet moment','No exam stress, no rushing. Just presence.'],['A promise','I\'ll be proud of you whether it\'s A or B. But you\'ll get A.']];
const ROOM={win:"The night is quiet. It's waiting for you.",moon:'Hi. Do88a, tap me again...',clock:'Time stopped here for you tonight.',book:'Every story has a best chapter. Yours is tonight.',lights:'Tiny lights, one for every wish you kept quiet.',b1:'Only three balloons. The room is small, the wishes are not.',b2:"This one is pink because you'd pick pink.",b3:'Float high, Dardoura.',cake:'A cake is waiting. Keep going.',cand:'Three tiny flames, all for you.',gift:'Not yet. Patience is part of the gift.',cup:'Still warm. Someone made it for you.',plant:'Small flowers, because you make ordinary days softer.',cat:'Shh. She is dreaming about you. Prrr...'};
const LETTER=`Dear Mdrdra,\n\nHappy birthday.\n\nI spent a year watching you in the same room, the same chair, the same space. And I said nothing. I was waiting, I think. Waiting for the right moment, the right word.\n\nThen this year came. And you looked back.\n\nEven before we spoke, I knew. I knew from your eyes. I knew from how you sit, how you listen, how you pretend to be annoyed when I help you cheat (and you always do). I knew from the way you laugh—not for everyone, just when something is actually funny. Just when it matters.\n\nYou are the kind of person who is rare: you are kind, you are careful with people, you are honest. And you are beautiful in a way that makes you look away when people see it. But I see it. Those eyes, Dardoura. That laugh. The way you think so hard about things that everyone else just does.\n\nThe Bac is coming. I know you're worried. But I need to tell you something: you will pass. You will pass because you are smart, because you are determined, and because you never give up even when it's hard. But more than that—you will pass because you deserve to. Because the next chapter of your life is waiting, and it's going to be beautiful.\n\nSo go light those candles. Make that wish. And know that someone who sat in your classroom for a year and said nothing is now saying everything: I am proud of you. I believe in you. And I will be here, whether you pass with an A or a B or whatever comes. Because that's not what matters.\n\nWhat matters is you. What matters is those eyes. What matters is your laugh.\n\nHappy birthday, Mdrdra. Happy birthday, Dardoura.\nYou are loved more than this little room can hold. ✦`;

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],rnd=(a,b)=>a+Math.random()*(b-a);

// ---- Audio ----
const a=new Audio('./assets/music.mp3');a.loop=true;a.preload='auto';
const mb=$('#music'),rt=$('#retry');
const sync=()=>{mb.classList.toggle('on',!a.paused);mb.textContent=a.paused?'♪ Music off':'♪ Music on'};
const fade=()=>{let v=a.volume;const i=setInterval(()=>{v=Math.min(.7,v+.05);a.volume=v;if(v>=.7)clearInterval(i)},200)};
const play=()=>{a.volume=0;let p;try{p=a.play()}catch(e){}Promise.resolve(p).then(()=>{rt.hidden=!a.paused;sync();fade()}).catch(()=>{rt.hidden=false;sync()})};
mb.onclick=()=>a.paused?play():(a.pause(),sync());
rt.onclick=play;a.onerror=()=>{rt.hidden=false};

// ---- Canvas effects ----
const cv=$('#fx'),cx=cv.getContext('2d');let W,H,D,T=0,SH=null;const ST=[],PT=[],FF=[];
function rs(){D=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;cx.setTransform(D,0,0,D,0,0)}
rs();addEventListener('resize',rs);
for(let i=0;i<110;i++)ST.push({x:Math.random(),y:Math.random(),r:rnd(.4,1.6),p:rnd(0,6),s:rnd(.5,2)});
for(let i=0;i<16;i++)FF.push({x:Math.random(),y:rnd(.3,.95),a:rnd(0,6),s:rnd(.0004,.0012)});
const burst=(x,y,n,g=['✦','♡','✿'],big)=>{for(let i=0;i<n;i++){const an=rnd(0,6.28),v=rnd(1,big?7:4);PT.push({x,y,vx:Math.cos(an)*v,vy:Math.sin(an)*v-1,l:1,d:rnd(.008,.018),g:g[i%g.length],z:rnd(10,big?26:18),c:`hsl(${rnd(10,50)} 100% ${rnd(65,85)}%)`,gr:.04})}};
const rise=(n,g)=>{for(let i=0;i<n;i++)PT.push({x:rnd(0,W),y:H+10,vx:rnd(-.3,.3),vy:-rnd(1.5,4),l:1,d:.004,g:g[i%g.length],z:rnd(12,24),c:'#ffd9a0',gr:0})};
const fall=(n,g)=>{for(let i=0;i<n;i++)PT.push({x:rnd(0,W),y:-20,vx:rnd(-.5,.5),vy:rnd(.6,1.8),l:1,d:.003,g:g[i%g.length],z:rnd(12,20),c:'#f2a2b8',gr:0,w:rnd(0,6)})};
function loop(t){T=t;cx.clearRect(0,0,W,H);cx.fillStyle='#fff';
 ST.forEach(s=>{cx.globalAlpha=.35+.65*Math.abs(Math.sin(t/1000*s.s+s.p));cx.beginPath();cx.arc(s.x*W,s.y*H,s.r,0,6.28);cx.fill()});
 if(!SH&&Math.random()<.004)SH={x:rnd(.3,1)*W,y:rnd(0,.3)*H,l:1};
 if(SH){cx.globalAlpha=SH.l;cx.strokeStyle='#fff';cx.lineWidth=2;cx.beginPath();cx.moveTo(SH.x,SH.y);cx.lineTo(SH.x+90*SH.l,SH.y-45*SH.l);cx.stroke();SH.x-=9;SH.y+=4.5;SH.l-=.025;if(SH.l<=0)SH=null}
 cx.fillStyle='#ffd98a';cx.shadowColor='#ffb765';cx.shadowBlur=12;
 FF.forEach(f=>{f.a+=f.s*16;f.x+=Math.cos(f.a)*.0007;f.y+=Math.sin(f.a*1.3)*.0005;cx.globalAlpha=.3+.6*Math.abs(Math.sin(f.a*3));cx.beginPath();cx.arc(f.x*W,f.y*H,2,0,6.28);cx.fill()});
 cx.shadowBlur=0;
 for(let i=PT.length-1;i>=0;i--){const p=PT[i];p.x+=p.vx+(p.w?Math.sin(t/400+p.w)*.6:0);p.y+=p.vy;p.vy+=p.gr;p.l-=p.d;if(p.l<=0||p.y>H+30||p.y<-40){PT.splice(i,1);continue}cx.globalAlpha=Math.min(1,p.l*2);cx.fillStyle=p.c;cx.font=p.z+'px serif';cx.fillText(p.g,p.x,p.y)}
 cx.globalAlpha=1;requestAnimationFrame(loop)}
requestAnimationFrame(loop);
let lt=0;addEventListener('pointermove',e=>{if(e.timeStamp-lt<40)return;lt=e.timeStamp;PT.push({x:e.clientX,y:e.clientY,vx:rnd(-.5,.5),vy:rnd(-.5,.5),l:1,d:.03,g:'✦',z:rnd(8,13),c:'#ffd9a0',gr:.01})});
addEventListener('pointerdown',e=>burst(e.clientX,e.clientY,5,['✦','♡']));

// ---- Helpers ----
const toast=t=>{const e=$('#toast');e.textContent=t;e.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('show'),3000)};
const tw=(el,txt,ms,done)=>{let i=0;clearTimeout(el._t);el.textContent='';(function f(){el.textContent=txt.slice(0,++i);if(i<txt.length)el._t=setTimeout(f,ms);else done&&done()})()};
const ORDER=['intro','room','secret','quiz','mem','cakes','wish','giftsc','letter'];
$('#dots').innerHTML=ORDER.map(()=>'<i></i>').join('');
let cur='intro';
function go(id){cur=id;$$('.scene').forEach(s=>s.classList.toggle('on',s.id===id));const k=ORDER.indexOf(id);$$('#dots i').forEach((d,i)=>d.className=i<k?'d':i===k?'c':'');
 const init={secret:sec,quiz:()=>quiz(0),mem:()=>mem(0),cakes:cakeReset,letter:type};init[id]&&init[id]()}

// ---- Intro ----
tw($('#hey'),'Hey '+NAME+'...',110,()=>$('#come').classList.add('show'));
$('#come').onclick=e=>{play();burst(e.clientX,e.clientY,18,['✦','♡'],1);go('room')};

// ---- Room ----
const found=new Set();let moon=0;
$$('.obj').forEach(o=>o.addEventListener('click',e=>{
 toast(ROOM[o.id]);found.add(o.id);$('#cnt').textContent=Math.min(found.size,8);
 if(o.id==='cat'||o.id==='b1'||o.id==='b2'||o.id==='b3')burst(e.clientX,e.clientY,8,['♡']);
 if(o.id==='moon'&&++moon>=5){moon=0;burst(e.clientX,e.clientY,30,['★','✦'],1);setTimeout(()=>go('egg'),700)}
 if(found.size>=8)$('#toSecret').hidden=false}));
$('#room').addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;$('#stage').style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*5}deg)`});
$('#toSecret').onclick=()=>go('secret');
$('#back').onclick=()=>go('room');

// ---- Constellation ----
const HP=[[150,60],[75,110],[45,180],[90,220],[150,240],[210,220],[255,180],[225,110]];
function sec(){let n=0;const s=$('#cons');s.classList.remove('done');$('#smsg').classList.remove('show');$('#toQuiz').hidden=true;$('#sp').textContent='Connect the stars, one by one.';
 s.innerHTML='<g id="ln"></g>'+HP.map((p,i)=>`<circle class="${i?'':'nx'}" cx="${p[0]}" cy="${p[1]}" r="10"/>`).join('');
 const cs=$$('#cons circle'),ln=(p,q)=>$('#ln').insertAdjacentHTML('beforeend',`<line pathLength="1" x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}"/>`);
 cs.forEach((c,i)=>c.onclick=e=>{if(i!==n)return;c.classList.remove('nx');c.classList.add('on');burst(e.clientX,e.clientY,7,['✦']);if(i)ln(HP[i-1],HP[i]);n++;
  if(n<8)cs[n].classList.add('nx');else{ln(HP[7],HP[0]);s.classList.add('done');$('#sp').textContent='A heart, hidden in the sky.';$('#smsg').classList.add('show');$('#toQuiz').hidden=false;burst(W/2,H/2,40,['♡','✦'],1)}})}
$('#toQuiz').onclick=()=>go('quiz');

// ---- Quiz ----
function quiz(i){const q=QUIZ[i],o=$('#opts'),r=$('#resp');r.classList.remove('show');$('#q').textContent=q.q;o.innerHTML='';
 q.o.forEach(t=>{const b=document.createElement('button');b.textContent=t;b.onclick=e=>{o.innerHTML='';r.textContent=q.r;r.classList.add('show');burst(e.clientX,e.clientY,10,['♡','✦']);setTimeout(()=>i+1<QUIZ.length?quiz(i+1):go('mem'),2400)};o.appendChild(b)})}

// ---- Memories ----
function mem(i){const c=$('#card');c.style.animation='none';c.offsetWidth;c.style.animation='';c.style.rotate=(i%2?2:-2)+'deg';c.innerHTML=`<em>${MEM[i][0]}</em><b>${MEM[i][1]}</b><span>${MEM[i][2]}</span>`;
 $('#nextmem').textContent=i+1<MEM.length?'Next':'Light the cake';$('#nextmem').onclick=()=>i+1<MEM.length?mem(i+1):go('cakes')}

// ---- Cake ----
let lit=0;const cakeReset=()=>{lit=0;$$('.cd').forEach(c=>c.classList.remove('lit'));$('#blow').hidden=true;$('#cp').textContent='Tap each candle to light it.'};
$$('.cd').forEach(c=>c.onclick=e=>{if(c.classList.contains('lit'))return;c.classList.add('lit');burst(e.clientX,e.clientY,6,['✦']);if(++lit===3){$('#cp').textContent='Now make a wish and blow.';$('#blow').hidden=false}});
$('#blow').onclick=()=>{$$('.cd').forEach(c=>c.classList.remove('lit'));$('#blow').hidden=true;$('#cp').textContent='Happy birthday!';for(let k=0;k<4;k++)setTimeout(()=>burst(rnd(.2,.8)*W,rnd(.2,.5)*H,24,['✦','♡','★','✿'],1),k*350);rise(16,['🎈','✦','♡']);setTimeout(()=>go('wish'),2600)};

// ---- Wish ----
$('#sendw').onclick=()=>{$('#wt').value='';SH={x:W*.9,y:H*.55,l:1};rise(26,['✦','★','♡']);$('#sendw').hidden=true;setTimeout(()=>{$('#sendw').hidden=false;go('giftsc')},3000)};

// ---- Gift ----
$('#box').onclick=e=>{const b=$('#box');if(b.classList.contains('open'))return;b.classList.add('open');$('#gp').textContent='Three little things, all from me. Tap each one.';burst(e.clientX,e.clientY,40,['✦','♡','★'],1);let k=0;
 $('#vch').innerHTML=GIFTS.map((g,i)=>`<button class="v" style="animation-delay:${.4+i*.3}s">${g[0]}</button>`).join('');
 $$('.v').forEach((v,i)=>v.onclick=ev=>{if(v.classList.contains('f'))return;v.classList.add('f');v.innerHTML=`<b>${GIFTS[i][0]}</b><br>${GIFTS[i][1]}`;burst(ev.clientX,ev.clientY,10,['♡']);if(++k===3)$('#toLetter').hidden=false})};
$('#toLetter').onclick=()=>go('letter');

// ---- Letter ----
function type(){const e=$('#lt');$('#replay').hidden=true;$('#endt').classList.remove('show');fall(14,['✿','♡']);let i=0;clearTimeout(e._t);e.textContent='';
 (function f(){if(cur!=='letter')return;e.textContent=LETTER.slice(0,++i);e.parentNode.scrollTop=1e5;if(i<LETTER.length)e._t=setTimeout(f,34);else end()})()}
function end(){$('#replay').hidden=false;$('#endt').classList.add('show');for(let k=0;k<7;k++)setTimeout(()=>burst(rnd(.15,.85)*W,rnd(.15,.5)*H,28,['✦','★','♡','✿'],1),k*500);fall(30,['✿','♡','✦'])}
$('#replay').onclick=type;
