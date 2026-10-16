const header=document.querySelector('[data-header]');
const reveals=[...document.querySelectorAll('.reveal')];
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.12});
reveals.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;observer.observe(el)});
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>24),{passive:true});

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const filter=button.dataset.filter;
  document.querySelectorAll('.product-card').forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.category!==filter));
}));

const quiz=document.querySelector('[data-quiz]');
const steps=[...quiz.querySelectorAll('.quiz-step')];
const result=quiz.querySelector('[data-result]');
const back=quiz.querySelector('[data-back]');
const progress=document.querySelector('[data-progress]');
const progressLabel=document.querySelector('[data-progress-label]');
const answers={};let current=1;
const productLinks={qv35a:'https://pl.roborock.com/collections/roboty-sprzatajace',saros:'https://pl.roborock.com/products/roborock-saros-10r-robot-sprzatajacy',z60:'https://pl.mova.tech/products/mova-z60-ultra-robot-vacuum',yuka:'https://pl.mammotion.com/',luba:'https://pl.mammotion.com/',spino:'https://pl.mammotion.com/products/robot-do-czyszczenia-basenu-spino-e1'};
const recommendations={
  qv35a:{brand:'ROBOROCK',name:'QV35A Set',copy:'Najrozsądniejszy start: kompletna stacja, odkurzanie i mopowanie bez wejścia w cenę flagowca.'},
  saros:{brand:'ROBOROCK',name:'Saros 10R',copy:'Smukły robot premium, który dobrze radzi sobie z przeszkodami, dywanami i sierścią.'},
  z60:{brand:'MOVA',name:'Z60 Ultra Roller',copy:'Dobry wybór do dużej powierzchni i częstego mopowania — z mocnym ssaniem i aktywnym pokonywaniem progów.'},
  yuka:{brand:'MAMMOTION',name:'YUKA mini 2 1000',copy:'Prosta konfiguracja bez przewodu i precyzyjna nawigacja dla typowego ogrodu do 1000 m².'},
  luba:{brand:'MAMMOTION',name:'LUBA mini 2 AWD',copy:'Napęd 4×4 ma sens tam, gdzie ogród ma spadki, nierówności lub trudniejsze przejazdy.'},
  spino:{brand:'MAMMOTION',name:'SPINO E1',copy:'Bezprzewodowe czyszczenie dna, ścian i linii wody — bez ciągnięcia kabla przez ogród.'}
};
function showStep(step){current=step;steps.forEach(el=>el.classList.toggle('active',Number(el.dataset.step)===step));result.classList.remove('active');back.hidden=step===1;progress.style.width=`${step*33.333}%`;progressLabel.textContent=`Krok ${step} z 3`}
function option(label,sub,value,index){return `<button type="button" data-value="${value}"><span>0${index}</span><b>${label}</b><small>${sub}</small></button>`}
function setupSecond(){const dom=answers.space==='dom';document.querySelector('[data-q2]').textContent=dom?'Co najbardziej komplikuje sprzątanie?':'Co robot ma pielęgnować?';document.querySelector('[data-options-two]').innerHTML=dom?option('Sierść i dywany','Potrzebna dobra szczotka','pets',1)+option('Dużo twardej podłogi','Liczy się mopowanie','floor',2):option('Trawnik','Regularne koszenie','lawn',1)+option('Basen','Dno, ściany i linia wody','pool',2);bindDynamic(document.querySelector('[data-options-two]'),'need',()=>{setupThird();showStep(3)})}
function setupThird(){const pool=answers.need==='pool';const garden=answers.space==='ogrod';document.querySelector('[data-options-three]').innerHTML=pool?option('Do 3 000 zł','Wystarczy sprawdzony model','mid',1)+option('Elastyczny','Liczy się najlepsze dopasowanie','premium',2):garden?option('Do 5 000 zł','Równy lub prosty teren','mid',1)+option('Powyżej 5 000 zł','Trudny teren i napęd 4×4','premium',2):option('Do 1 500 zł','Najlepszy stosunek ceny do funkcji','mid',1)+option('Powyżej 1 500 zł','Więcej automatyzacji','premium',2);bindDynamic(document.querySelector('[data-options-three]'),'budget',finish)}
function bindDynamic(container,key,next){container.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{answers[key]=btn.dataset.value;next()}))}
quiz.querySelectorAll('[data-answer="space"]').forEach(btn=>btn.addEventListener('click',()=>{answers.space=btn.dataset.value;setupSecond();showStep(2)}));
function finish(){let id;if(answers.space==='dom'){id=answers.budget==='mid'?'qv35a':answers.need==='pets'?'saros':'z60'}else{id=answers.need==='pool'?'spino':answers.budget==='premium'?'luba':'yuka'}const item=recommendations[id];steps.forEach(el=>el.classList.remove('active'));result.innerHTML=`<p class="result-kicker">Twój wynik · ${item.brand}</p><h3>${item.name}</h3><p>${item.copy}</p><div class="result-actions"><a href="${productLinks[id]}" target="_blank" rel="sponsored noopener">Sprawdź u producenta ↗</a><button type="button" data-restart>Zacznij od nowa</button></div>`;result.classList.add('active');back.hidden=true;progress.style.width='100%';progressLabel.textContent='Gotowe';result.querySelector('[data-restart]').addEventListener('click',restart)}
function restart(){Object.keys(answers).forEach(key=>delete answers[key]);result.classList.remove('active');showStep(1)}
back.addEventListener('click',()=>showStep(Math.max(1,current-1)));

if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const heroBg=document.querySelector('.hero-bg');
  window.addEventListener('scroll',()=>{if(scrollY<innerHeight)heroBg.style.transform=`scale(1.02) translateY(${scrollY*.08}px)`},{passive:true});
}
