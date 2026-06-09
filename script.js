const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const audio = $('#theme');
let musicStarted = false;
let carouselsStarted = false;

const titles = {
  suspeita: {
    img:'assets/principal-suspeita.png',
    title:'A Principal Suspeita',
    tags:['99% compatível','Documentário criminal','Crime emocional','Caso nº 0612-M'],
    desc:'Investigada por roubar pensamentos, atenção e um coração inteiro. O caso parecia sério, mas ficou impossível negar: a principal suspeita era também a protagonista favorita do investigador.'
  },
  operacao: {
    img:'assets/operacao-cabecao.png',
    title:'Operação: Me Pirou o Cabeção',
    tags:['100% surtado','Comédia romântica','Perigo de paixão','Sem chance'],
    desc:'O plano era simples: manter a calma. Mas aí ela apareceu, sorriu, falou do jeitinho dela e todo o sistema emocional do Allan entrou em colapso.'
  },
  harry: {
    img:'assets/harry-caso.png',
    title:'Harry Potter e o Caso Sem Solução',
    tags:['Mágico','Mistério','Sonserina vibes','Feitiço irreversível'],
    desc:'Em uma biblioteca mágica, entre livros, pistas e feitiços, o grande mago Allan descobre que alguns mistérios simplesmente não querem ser resolvidos. Principalmente quando envolvem DarkMari, a bruxa rabuda.'
  },
  crime: {
    img:'assets/crime-organizado.png',
    title:'Crime Organizado',
    tags:['Dupla principal','Parceiros no crime','Plano perfeito','Corações envolvidos'],
    desc:'Nenhum coração saiu ileso. Uma produção sobre duas pessoas que, sem perceber, começaram a planejar juntos o crime emocional mais bonito da história brasileira.'
  },
  defesa: {
    img:'assets/sem-defesa.png',
    title:'Sem Possibilidade de Defesa',
    tags:['Veredito: xonadão','Tribunal do amor','Evidências esmagadoras','Culpada de ser linda'],
    desc:'As evidências eram esmagadoras: sorriso, olhar, presença e aquele jeito impossível de resistir. Veredito: completamente xonadão.'
  },
  assalto: {
    img:'assets/assalto-perfeito.png',
    title:'O Assalto Perfeito',
    tags:['Coração roubado','Ação romântica','Sem alarme','Fuga impossível'],
    desc:'O alvo nunca teve chance. Quando ele percebeu, o coração já tinha sido levado, sem alarme, sem fuga e sem possibilidade de recuperação.'
  },
  parzinho: {
    img:'assets/meu-outro-parzinho.png',
    title:'Meu Outro Parzinho',
    tags:['Romance original','Combinação perfeita','Tonguices inclusas','Baseado em momentos reais'],
    desc:'Às vezes a vida acerta em cheio. Um romance baseado em pequenos momentos, olhares bobos e na sensação de ter encontrado alguém que combina com as tonguices um do outro.'
  },
  renovada: {
    img:'assets/renovada-para-sempre.png',
    title:'Renovada Para Sempre',
    tags:['Série renovada','Episódios infinitos','Amor contínuo','Sem final previsto'],
    desc:'Algumas histórias não precisam de final. Elas só precisam continuar sendo assistidas, vividas e guardadas com carinho, episódio por episódio.'
  },
  futuro: {
    img:'assets/o-futuro.png',
    title:'O Futuro',
    tags:['Em produção','Coming soon','Roteiro aberto','Duração: uma vida inteira'],
    desc:'Ainda em produção. Estrelando Mariana e Allan. Roteiro aberto, novos episódios todos os dias e duração prevista: uma vida inteira.'
  }
};

function show(el){ if(el) el.classList.remove('hidden') }
function hide(el){ if(el) el.classList.add('hidden') }

function playMusic(){
  if(!audio) return;

  audio.volume = .55;
  audio.play().then(()=>{
    musicStarted = true;

    const letterMusic = $('#letterMusic');
    if(letterMusic) letterMusic.textContent = '⏸ Pausar trilha';
  }).catch(()=>{});
}

function pauseMusic(){
  if(!audio) return;

  audio.pause();
  musicStarted = false;

  const letterMusic = $('#letterMusic');
  if(letterMusic) letterMusic.textContent = '🎵 Música para acompanhar';
}

function enterLogin(){
  const nickInput = $('#nickInput');
  const loginError = $('#loginError');
  const nick = (nickInput?.value || '').trim().toUpperCase();

  if(nick !== 'DARKMARI'){
    show(loginError);
    nickInput?.classList.add('input-error');
    nickInput?.focus();
    return;
  }

  hide(loginError);
  nickInput?.classList.remove('input-error');

  $('#login').animate(
    [{opacity:1, transform:'scale(1)'},{opacity:0, transform:'scale(1.08)'}],
    {duration:900,easing:'ease-in-out'}
  ).onfinish=()=>{
    hide($('#login'));
    show($('#profiles'));
  };
}

$('#enterBtn')?.addEventListener('click', enterLogin);

$('#nickInput')?.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') enterLogin();
});

$('[data-enter-home]')?.addEventListener('click', () => {
  $('#profiles').animate([{opacity:1},{opacity:0}],{duration:650}).onfinish=()=>{
    hide($('#profiles'));
    show($('#app'));
    window.scrollTo(0,0);

    setTimeout(()=>{
      if(!carouselsStarted){
        createAutoCarousel('#momentos .row', 1.6);
        createAutoCarousel('.row.tall', 1);
        carouselsStarted = true;
      }
    },300);
  };
});

$$('[data-scroll]').forEach(btn =>
  btn.addEventListener('click',()=>{
    const target = $(btn.dataset.scroll);
    if(target) target.scrollIntoView({behavior:'smooth'});
  })
);

function openModal(key){
  const item = titles[key];
  if(!item) return;

  $('#modalTitle').textContent = item.title;
  $('#modalDesc').textContent = item.desc;
  $('.modal-bg').style.backgroundImage = `url('${item.img}')`;
  $('#modalPoster').src = item.img;

  const tags = $('#modalTags');
  if(tags){
    tags.innerHTML = '';
    item.tags.forEach(tag=>{
      const span = document.createElement('span');
      span.textContent = tag;
      tags.appendChild(span);
    });
  }

  show($('#modal'));
  $('#modal').animate([{opacity:0},{opacity:1}],{duration:280});
}

function closeModal(){
  $('#modal').animate([{opacity:1},{opacity:0}],{duration:250}).onfinish=()=>{
    hide($('#modal'));
  };
}

document.addEventListener('click', (event)=>{
  const trigger = event.target.closest('[data-open]');
  if(!trigger) return;

  openModal(trigger.dataset.open);
});

$('#closeModal')?.addEventListener('click',closeModal);
$('#modalClose2')?.addEventListener('click',closeModal);

const letterText = `Meu amor,\n\nEu poderia ter comprado qualquer coisa pronta na Shopee, mas nada teria tanto de mim quanto isso aqui, e eu gosto de ser diferente.\n\nEntão criei uma plataforma só nossa, pra que tire de você nem que seja um sorriso — e olha que eu amo ele —, algumas versões cinematográficas da nossa história e um pedacinho da forma como eu vejo você, a comediona da minha vida.\n\nVocê é meu romance favorito, meu suspense preferido e a personagem principal de uma história que eu quero continuar assistindo por muito tempo.\n\nObrigado por ser você. Obrigado por ser a tonga que me faz rir. Obrigado por ser a Mariana que me faz admirar cada detalhe.\n\nFeliz Dia dos Namorados, meu amor.\n\nCom amor,\nSeu tchala.`;

const SECRET_PASSWORD = "170422";
let typed = false;

$('#unlockBtn')?.addEventListener('click',()=>{
  show($('#passwordBox'));
  $('#secretCode')?.focus();
});

$('#secretCode')?.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter'){
    $('#confirmCode')?.click();
  }
});

$('#confirmCode')?.addEventListener('click',()=>{

  const code = ($('#secretCode')?.value || '').trim();
  const validCodes = ['170422','17/04/22','17-04-22','17042022'];

  if(!validCodes.includes(code)){
    show($('#passwordError'));
    $('#secretCode').value = '';
    $('#secretCode').focus();
    return;
  }

  hide($('#vault'));
  hide($('#passwordError'));
  show($('#secretPhoto'));
  $('.secret-box')?.classList.add('unlocked');

  const box = $('#letter');
  show(box);

  if(typed){
    show($('#letterActions'));
    return;
  }

  typed = true;
  let i = 0;
  box.textContent = '';

  const timer = setInterval(()=>{
    box.textContent += letterText[i++] || '';

    if(i >= letterText.length){
      clearInterval(timer);
      show($('#letterActions'));
    }
  },25);
});

const letterMusic = $('#letterMusic');

if(letterMusic){
  letterMusic.addEventListener('click', () => {
    if(audio.paused){
      playMusic();
    }else{
      pauseMusic();
    }
  });
}

let taps=0;

$('.nav-logo')?.addEventListener('click',()=>{
  taps++;
  if(taps>=5){
    openModal('renovada');
    taps=0;
  }
});

window.addEventListener('mousemove',(e)=>{
  const x=(e.clientX/window.innerWidth-.5)*12;
  const y=(e.clientY/window.innerHeight-.5)*12;

  document.documentElement.style.setProperty('--mx',`${x}px`);
  document.documentElement.style.setProperty('--my',`${y}px`);
});

function createAutoCarousel(selector, speed = 1){

  const carousel = document.querySelector(selector);
  if(!carousel || carousel.dataset.carouselReady === 'true') return;

  carousel.dataset.carouselReady = 'true';

  const originalItems = [...carousel.children];

  if(originalItems.length < 2) return;

  originalItems.forEach(item=>{
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden','true');
    carousel.appendChild(clone);
  });

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let autoScrollTimer;

  function halfWidth(){
    return carousel.scrollWidth / 2;
  }

  function normalizePosition(){
    const half = halfWidth();

    if(carousel.scrollLeft >= half){
      carousel.scrollLeft -= half;
    }

    if(carousel.scrollLeft <= 0){
      carousel.scrollLeft += half;
    }
  }

  function startAutoScroll(){
    stopAutoScroll();

    autoScrollTimer = setInterval(() => {
      if(isDragging) return;

      carousel.scrollLeft += speed;
      normalizePosition();
    },20);
  }

  function stopAutoScroll(){
    clearInterval(autoScrollTimer);
  }

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    stopAutoScroll();

    carousel.classList.add('dragging');

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if(!isDragging) return;

    isDragging = false;
    carousel.classList.remove('dragging');
    normalizePosition();
    startAutoScroll();
  });

  carousel.addEventListener('mousemove', (e) => {
    if(!isDragging) return;

    e.preventDefault();

    const distance = e.pageX - startX;
    carousel.scrollLeft = startScrollLeft - distance;
    normalizePosition();
  });

  carousel.addEventListener('scroll', () => {
    if(isDragging) normalizePosition();
  });

  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);

  carousel.addEventListener('touchstart', stopAutoScroll, {passive:true});
  carousel.addEventListener('touchend', startAutoScroll);

  carousel.scrollLeft = 1;
  startAutoScroll();
}

const loginMosaic = document.querySelector('.login-mosaic');

if(loginMosaic && !loginMosaic.dataset.filled){
  loginMosaic.dataset.filled = 'true';

  const posters = [...loginMosaic.children];

  for(let i = 0; i < 5; i++){
    posters.forEach(poster => {
      const clone = poster.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      loginMosaic.appendChild(clone);
    });
  }
}