(()=>{'use strict';const questions=[{key:'deadline',title:'How close is your next deadline?',type:'options',choices:[['More than a week away',0],['3–7 days',25],['1–2 days',55],['6–24 hours',80],['Less than 6 hours / overdue',100]]},{key:'progress',title:'How much of that assignment is actually done?',type:'range',min:0,max:100,step:5,default:50,suffix:'% completed'},{key:'sleep',title:'How much sleep did you get last night?',type:'options',choices:[['8+ hours (legendary)',0],['6–7 hours',25],['4–5 hours',60],['2–3 hours',85],['0–1 hours (why)',100]]},{key:'caffeine',title:'How many caffeinated drinks today?',type:'options',choices:[['None',0],['1',15],['2',35],['3–4',70],['5+ (you can hear colors)',100]]},{key:'tabs',title:'How many browser tabs are open?',type:'options',choices:[['1–5, very civilized',0],['6–15',25],['16–30',55],['31–50',80],['51+ / I stopped counting',100]]},{key:'procrastination',title:'How long have you been avoiding your work?',type:'options',choices:[['I started already',0],['Less than an hour',20],['A few hours',50],['All day',80],['Several days (oops)',100]]},{key:'tasks',title:'How many other unfinished tasks are haunting you?',type:'options',choices:[['0–1',0],['2–3',25],['4–6',55],['7–10',80],['11+ (the task hydra)',100]]}];const weights={deadline:.27,progress:.23,sleep:.15,caffeine:.08,tabs:.07,procrastination:.12,tasks:.08};let step=0,answers={};const $=id=>document.getElementById(id);const show=id=>['welcome','quiz','results'].forEach(x=>$(x).classList.toggle('hide',x!==id));const selected=q=>answers[q.key];function render(){const q=questions[step];$('qcount').textContent=`QUESTION ${step+1} / ${questions.length}`;$('qpercent').textContent=Math.round((step+1)/questions.length*100)+'%';$('qbar').style.width=((step+1)/questions.length*100)+'%';$('qtitle').textContent=q.title;$('validation').textContent='';const root=$('answers');root.replaceChildren();if(q.type==='options'){root.className='option-grid';q.choices.forEach(([label,value],i)=>{const b=document.createElement('button');b.type='button';b.className='option'+(selected(q)===i?' selected':'');b.innerHTML='<i>'+String.fromCharCode(65+i)+'</i><span></span>';b.querySelector('span').textContent=label;b.onclick=()=>{answers[q.key]=i;render()};root.append(b)})}else{root.className='range-wrap';if(selected(q)===undefined)answers[q.key]=q.default;const val=document.createElement('div');val.className='range-value';val.textContent=answers[q.key]+'%';const range=document.createElement('input');range.type='range';range.min=q.min;range.max=q.max;range.step=q.step;range.value=answers[q.key];range.setAttribute('aria-label',q.title);range.oninput=()=>{answers[q.key]=Number(range.value);val.textContent=range.value+'%'};const ends=document.createElement('div');ends.className='range-ends';ends.innerHTML='<span>0% · NOTHING</span><span>100% · DONE</span>';root.append(val,range,ends)}$('back').textContent=step===0?'← START':'← BACK';$('next').textContent=step===questions.length-1?'REVEAL MY FATE →':'NEXT QUESTION →'}function raw(key){if(key==='progress')return 100-answers.progress;const q=questions.find(q=>q.key===key);return q.choices[answers[key]][1]}function getScore(){let total=0;for(const [key,w] of Object.entries(weights))total+=raw(key)*w;const urgent=raw('deadline')>=80&&answers.progress<=20?8:0;return Math.max(0,Math.min(100,Math.round(total+urgent)))}const levels=[{max:20,name:'RAW',verdict:'You still have a future.'},{max:40,name:'LIGHTLY TOASTED',verdict:'Slightly concerning.'},{max:60,name:'MEDIUM RARE',verdict:"You're playing with fire."},{max:80,name:'WELL DONE',verdict:"It's not looking good."},{max:100,name:'DEEP FRIED',verdict:"Even Gordon Ramsay can't save this."}];let result=null;function calculate(){const score=getScore(),level=levels.find(l=>score<=l.max);const dl=['over a week','3–7 days','1–2 days','6–24 hours','less than 6 hours (or already passed)'][answers.deadline];const personal=`Your deadline is ${dl} away, your assignment is ${answers.progress}% complete, and you are taking this quiz instead of working. An iconic choice.`;const tips=[];if(raw('deadline')>=55&&answers.progress<75)tips.push('Pick one deliverable and work on it for 25 uninterrupted minutes.');if(raw('sleep')>=60)tips.push('Plan a real sleep window; rest helps more than another doom-scroll.');if(raw('caffeine')>=70)tips.push('Switch the next caffeine run for water and a short break.');if(raw('tabs')>=55||raw('procrastination')>=50)tips.push('Close distracting tabs and write the next tiny action.');if(!tips.length)tips.push('Keep your momentum: choose one priority and protect your rest.');result={score,level,personal,advice:tips.slice(0,3)};$('score').textContent=score;$('classification').textContent=level.name;$('verdict').textContent=level.verdict;$('personal').textContent=personal;$('advice').textContent=result.advice.join(' ');$('meter').style.width='0%';$('shareStatus').textContent='';show('results');requestAnimationFrame(()=>requestAnimationFrame(()=>$('meter').style.width=score+'%'))}function shareText(){return `AM I COOKED?\nMY COOKED SCORE: ${result.score}% — ${result.level.name}\n${result.level.verdict}\n${result.personal}\n#AmICooked`}$('start').onclick=()=>{step=0;answers={};render();show('quiz')};$('back').onclick=()=>{if(step===0)show('welcome');else{step--;render()}};$('next').onclick=()=>{if(selected(questions[step])===undefined){$('validation').textContent='PICK AN ANSWER BEFORE THE UNIVERSE COLLAPSES.';return}if(step<questions.length-1){step++;render()}else calculate()};$('restart').onclick=()=>{step=0;answers={};render();show('quiz')};$('copy').onclick=async()=>{try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(shareText());else{const t=document.createElement('textarea');t.value=shareText();document.body.append(t);t.select();if(!document.execCommand('copy'))throw Error('Copy unavailable');t.remove()}$('shareStatus').textContent='RESULTS COPIED. GO SPREAD THE PANIC.'}catch(e){$('shareStatus').textContent='COPY BLOCKED BY BROWSER. TRY A SECURE CONTEXT.'}};$('download').onclick=()=>{try{const c=document.createElement('canvas');c.width=1080;c.height=1350;const ctx=c.getContext('2d');const bg=ctx.createLinearGradient(0,0,0,1350);bg.addColorStop(0,'#24145a');bg.addColorStop(.35,'#5b36ad');bg.addColorStop(.62,'#e77ac8');bg.addColorStop(1,'#39247c');ctx.fillStyle=bg;ctx.fillRect(0,0,1080,1350);ctx.lineCap='round';for(let i=0;i<12;i++){ctx.beginPath();ctx.moveTo(-100,110+i*86);ctx.bezierCurveTo(250,-100+i*86,650,300+i*45,1180,80+i*84);ctx.strokeStyle=i%3===0?'#203858':i%3===1?'#f5b464':'#ae503b';ctx.lineWidth=22+(i%3)*8;ctx.globalAlpha=.72;ctx.stroke()}ctx.globalAlpha=1;ctx.save();ctx.translate(80,170);ctx.rotate(-.025);ctx.fillStyle='#172737';ctx.fillRect(16,16,920,1010);ctx.fillStyle='#fff4ff';ctx.fillRect(0,0,920,1010);ctx.strokeStyle='#172737';ctx.lineWidth=7;ctx.strokeRect(0,0,920,1010);ctx.fillStyle='#9a5232';ctx.font='26px monospace';ctx.fillText('// THE RAINBOW CRISIS CALCULATOR',55,85);ctx.fillStyle='#1b2634';ctx.font='bold 73px Arial';ctx.fillText('AM I COOKED?',50,190);ctx.fillStyle='#f052b0';ctx.font='bold 220px Arial';ctx.fillText(result.score+'%',40,435);ctx.fillStyle='#eadcf5';ctx.fillRect(55,480,810,35);ctx.fillStyle='#ff7ac5';ctx.fillRect(55,480,810*result.score/100,35);ctx.fillStyle='#1b2634';ctx.font='bold 67px Arial';ctx.fillText(result.level.name,50,630);ctx.font='bold 34px Arial';wrap(ctx,result.level.verdict,55,710,805,45);ctx.font='29px Arial';wrap(ctx,result.personal,55,790,805,43);ctx.fillStyle='#8b3bc2';ctx.font='bold 26px monospace';ctx.fillText('A SCIENTIFICALLY QUESTIONABLE RESULT',55,955);ctx.restore();c.toBlob(blob=>{if(!blob){$('shareStatus').textContent='COULD NOT CREATE IMAGE.';return}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='am-i-cooked-'+result.score+'.png';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('shareStatus').textContent='YOUR DISASTER CARD IS READY.'},'image/png')}catch(e){$('shareStatus').textContent='IMAGE EXPORT FAILED IN THIS BROWSER.'}};function wrap(ctx,text,x,y,maxWidth,lineHeight){const words=text.split(' ');let line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){ctx.fillText(line,x,y);y+=lineHeight;line=word}else line=test}if(line)ctx.fillText(line,x,y)} 
let soundOn=false,audioCtx=null,toastTimer=null,roastIndex=0;
function beep(freq=440,duration=.09){if(!soundOn)return;try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type='square';osc.frequency.value=freq;gain.gain.setValueAtTime(.035,audioCtx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+duration);osc.connect(gain);gain.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+duration)}catch(e){}}
function toast(message){let node=document.querySelector('.pixel-toast');if(!node){node=document.createElement('div');node.className='pixel-toast';node.setAttribute('role','status');document.body.append(node)}node.textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.remove(),2400)}
function confetti(count=65){const colors=['#ff65b5','#fff06a','#82f7f0','#a9ff8c','#ae8bff','#ff9d5d'];for(let i=0;i<count;i++){const e=document.createElement('i');e.className='spark';e.style.left=Math.random()*100+'vw';e.style.top=(25+Math.random()*55)+'vh';e.style.background=colors[i%colors.length];e.style.setProperty('--dx',(Math.random()*440-220)+'px');e.style.setProperty('--dy',(Math.random()*420-210)+'px');document.body.append(e);setTimeout(()=>e.remove(),1450)}}
function updateLive(){const filled=questions.filter(q=>answers[q.key]!==undefined);const percent=Math.round(filled.length/questions.length*100);$('liveScore').textContent=filled.length?percent+'% DATA COLLECTED':'???';$('liveFill').style.width=percent+'%';$('liveMessage').textContent=filled.length===questions.length?'All evidence collected. The verdict awaits.':filled.length+' of '+questions.length+' questionable decisions documented.'}
const originalRender=render;render=function(){originalRender();updateLive()};
const originalCalculate=calculate;calculate=function(){originalCalculate();const a=[];if(answers.progress<=20)a.push('📚 LAST-MINUTE LEGEND');if(raw('sleep')>=85)a.push('🌙 SLEEP IS A MYTH');if(raw('tabs')>=80)a.push('🖥️ TAB HOARDER');if(raw('caffeine')>=70)a.push('☕ CAFFEINE GOBLIN');if(result.score>=81)a.push('🔥 FINAL BOSS: DEEP FRIED');if(!a.length)a.push('🌟 FUNCTIONAL HUMAN (RARE DROP)');$('achievements').textContent=a.join(' · ');$('recoveryQuest').replaceChildren();['Drink a glass of water','Close 3 distracting tabs','Do 5 minutes of one task'].forEach((t,i)=>{const l=document.createElement('label'),c=document.createElement('input');c.type='checkbox';c.onchange=()=>{const n=$('recoveryQuest').querySelectorAll('input:checked').length;$('questStatus').textContent=n+' / 3 missions complete';beep(520+n*110);if(n===3){toast('🏆 QUEST COMPLETE! YOU ARE 3% LESS COOKED (EMOTIONALLY).');confetti(90)}};l.append(c,document.createTextNode(t));$('recoveryQuest').append(l)});$('questStatus').textContent='0 / 3 missions complete';confetti(70);beep(680)};
$('soundToggle').onclick=()=>{soundOn=!soundOn;$('soundToggle').textContent='♫ SOUND: '+(soundOn?'ON':'OFF');beep(700);toast(soundOn?'RETRO BEEPS ENABLED':'SILENT MODE ACTIVATED')};
$('surprise').onclick=()=>{confetti(100);beep(800);toast('🌈 THE RAINBOW HAS ABSOLUTELY NO SOLUTIONS!')};
$('randomAnswer').onclick=()=>{const q=questions[step];answers[q.key]=q.type==='range'?Math.floor(Math.random()*21)*5:Math.floor(Math.random()*q.choices.length);render();beep(620);toast('🎲 FATE HAS CHOSEN YOUR ANSWER')};
const panicMessages=[
['🚨 DEADLINE DETECTED','Your assignment just filed a missing-person report.'],
['☕ COFFEE.exe HAS STOPPED WORKING','Your bloodstream is now 87% iced latte.'],
['💩 POOP HAPPENS','Your schedule has entered its villain era.'],
['☕ YOUR COFFEE IS JUDGING YOU','Even the rainbow cannot carry your GPA.'],
['📚 HOMEWORK JUMPSCARE','The Google Doc has been open for 4 hours. It is still blank.'],
['⏰ TIME IS A SOCIAL CONSTRUCT','Unfortunately, your professor disagrees.'],
['🧠 BRAIN NOT FOUND','Have you tried turning yourself off and on again?'],
['🚽 CRISIS FLUSH INITIATED','Your motivation has gone down the toilet.'],
['⚡ CRITICAL COOKED LEVEL','You are not behind schedule. You ARE the schedule.'],
['🥲 SKILL ISSUE DETECTED','Your procrastination has procrastinated.'],
['💻 404: PRODUCTIVITY NOT FOUND','Your 73 tabs are holding an emergency meeting.'],
['🍜 INSTANT NOODLE ENERGY','Three minutes to cook. Three weeks to finish the essay.'],
['🛑 EMOTIONAL DAMAGE','Your to-do list just unfollowed you.'],
['👁️ THE DEADLINE IS WATCHING','It knows you are clicking this button again.'],
['🔥 YOU ARE THE AIR FRYER','At this point, the assignment is cooking YOU.'],
['🌈 RAINBOW EMERGENCY','The cat is flying. Your grades are not.'],
['🪦 REST IN PIECES, FREE TIME','Cause of death: “I’ll do it tomorrow.”'],
['📢 THIS IS NOT A DRILL','Actually it is. You have drilled the panic button 12 times.'],
['🥔 POTATO MODE ACTIVATED','Productivity: mashed. Confidence: fried.'],
['📅 CALENDAR HAS LEFT THE CHAT','November called. It wants its deadlines back.'],
['🫠 MELTDOWN SPEEDRUN','New personal best: panicking before starting.'],
['🧋 BOBA-FUELED DISASTER','The tapioca pearls are doing more work than you.'],
['👻 GHOST OF ASSIGNMENTS PAST','Boo. Remember that unfinished paragraph?'],
['🛸 ALIEN ABDUCTION REQUESTED','Even the aliens said “finish your homework first.”']
];
let lastPanic=-1,panicCount=0;
let activeCatPanic=null;
function panicStorm(){
 panicCount++;
 let index=Math.floor(Math.random()*panicMessages.length);
 if(index===lastPanic)index=(index+1)%panicMessages.length;
 lastPanic=index;
 const [headline,subline]=panicMessages[index];
 if(activeCatPanic){activeCatPanic.remove();activeCatPanic=null;}
 const overlay=document.createElement('div');overlay.className='cat-panic-overlay';overlay.setAttribute('role','status');overlay.setAttribute('aria-label',headline+' '+subline);
 const scene=document.createElement('div');scene.className='cat-panic-scene';
 const title=document.createElement('div');title.className='cat-panic-caption';title.textContent=headline;
 const subtitle=document.createElement('div');subtitle.className='cat-panic-sub';subtitle.textContent=subline;
 const close=document.createElement('button');close.className='cat-panic-close';close.type='button';close.textContent='✕';close.setAttribute('aria-label','Close panic animation');close.onclick=()=>{overlay.remove();if(activeCatPanic===overlay)activeCatPanic=null};
 // Use the provided poop character asset for the panic animation.
 const cat=document.createElement('div');cat.className='cat-panic-cat';
 const character=document.createElement('img');character.className='panic-runner';character.src='assets/poop_character.png';character.alt='Rainbow pixel poop character';character.draggable=false;
 cat.append(character);
 scene.append(title,cat,subtitle,close);overlay.append(scene);document.body.append(overlay);activeCatPanic=overlay;
 const icons=['💩','☕','💀'];
 // Every particle is born at the character's actual rear, not the screen center.
 let emitted=0;
 const timer=setInterval(()=>{
  if(!overlay.isConnected||emitted>=26){clearInterval(timer);return;}
    const bounds=character.getBoundingClientRect();
    // The character faces right, so emit from the lower-left rear/hip.
    const buttX=bounds.left+bounds.width*.22;
    const buttY=bounds.top+bounds.height*.66;
  const sceneBounds=scene.getBoundingClientRect();
  const icon=document.createElement('span');icon.className='cat-poop';
  icon.textContent=icons[Math.floor(Math.random()*icons.length)];
  icon.style.left=(buttX-sceneBounds.left)+'px';
  icon.style.top=(buttY-sceneBounds.top)+'px';
  icon.style.setProperty('--dx',(-85-Math.random()*210)+'px');
  icon.style.setProperty('--dy',(-95+Math.random()*200)+'px');
  icon.style.setProperty('--spin',(-480+Math.random()*960)+'deg');
  icon.style.setProperty('--duration',(900+Math.random()*650)+'ms');
  scene.append(icon);setTimeout(()=>icon.remove(),1650);emitted++;
 },105);
 beep(190,.16);setTimeout(()=>beep(340,.11),110);
 setTimeout(()=>{if(activeCatPanic===overlay){overlay.remove();activeCatPanic=null}},3900);
}
$('panicButton').onclick=panicStorm;
const roasts=['You have successfully turned procrastination into an extracurricular activity.','Your to-do list has a to-do list. Neither has been opened.','Your browser tabs are forming their own government.','Your future self just sent a strongly worded email.','Somewhere, a deadline is laughing in 8-bit.','Your productivity arc has been delayed to the next season.'];
$('rerollRoast').onclick=()=>{roastIndex=(roastIndex+1)%roasts.length;$('personal').textContent=roasts[roastIndex];result.personal=roasts[roastIndex];beep(560);toast('🎤 ROAST UPDATED — SHARE YOUR NEW DISASTER')};
$('celebrate').onclick=()=>{confetti(120);beep(880);toast('🌈 ACHIEVEMENT UNLOCKED: STILL ALIVE')};
document.addEventListener('keydown',e=>{if($('quiz').classList.contains('hide')||['INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;const q=questions[step];if(q.type==='options'&&/^[1-5]$/.test(e.key)){const n=Number(e.key)-1;if(n<q.choices.length){answers[q.key]=n;render();beep(480+n*70)}}if(e.key==='Enter'&&document.activeElement.tagName!=='BUTTON'){$('next').click()}if(e.key==='ArrowLeft'&&document.activeElement.tagName!=='INPUT'){$('back').click()}});
document.addEventListener('click',e=>{if(e.target.closest('.option')){beep(540);e.target.closest('.option').classList.add('answer-bounce')}if(e.target.closest('#next'))beep(780);if(e.target.closest('#back'))beep(360)});
})();

// Cinematic opening: three separate black-screen lines, then a full-screen rainbow wipe.
(function cinematicOpening(){
 const overlay=document.getElementById('cinematicIntro');
 const line=document.getElementById('introLine');
 const wipe=document.getElementById('rainbowWipe');
 const lines=['Deadlines are screaming.','Your coffee is judging you.','Find out exactly how close you are to becoming a human toast.'];
 let timers=[];let finished=false;
 function later(fn,ms){timers.push(setTimeout(fn,ms));}
 function finish(){if(finished)return;finished=true;timers.forEach(clearTimeout);overlay.remove();document.body.classList.remove('intro-playing');}
 function show(i){line.classList.remove('visible');later(()=>{line.textContent=lines[i];line.classList.add('visible');},220);}
 function startWipe(){line.classList.remove('visible');wipe.classList.add('sweep');later(()=>{overlay.style.background='transparent';overlay.classList.add('reveal-home');wipe.classList.remove('sweep');wipe.classList.add('exit');later(finish,1150);},1800);}
 document.getElementById('skipIntro').addEventListener('click',finish);
 show(0);later(()=>show(1),1900);later(()=>show(2),3800);
 // Third sentence appears at 4020ms, stays fully visible for three seconds.
 later(startWipe,7020);
})();


/* Original user-drawn pixel artwork. Duplicate identical groups for a seamless marquee. */
(function makePixelParade(){
 for(const [id,offset] of [['paradeTop',0],['paradeBottom',1]]){
  const root=document.getElementById(id);if(!root)continue;
  const html=Array.from({length:22},(_,i)=>`<img class="parade-person" src="assets/${(i+offset)%2?'pose-run':'pose-arms'}.png" alt="" draggable="false">`).join('');
  root.innerHTML=`<div class="parade-half">${html}</div><div class="parade-half" aria-hidden="true">${html}</div>`;
 }
})();
