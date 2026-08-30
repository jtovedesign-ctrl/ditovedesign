const revealItems = document.querySelectorAll('.reveal');
const localTime = document.querySelector('#local-time');
const particleCanvas = document.querySelector('#hero-particles');
const particleContext = particleCanvas?.getContext('2d');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const storyLines = [
  ['상품을 읽고,', '구조를 만듭니다.'],
  ['고객의 망설임을 보고,', '선택을 설계합니다.'],
  ['좋은 이유를 찾아,', '페이지에 담습니다.']
];
const storyLineOne = document.querySelector('#story-line-one');
const storyLineTwo = document.querySelector('#story-line-two');
const heroKorean = document.querySelector('.hero-korean');
let storyIndex = 0;
let storyTimer;

const rollStory = () => {
  if (!storyLineOne || !storyLineTwo) return;
  storyIndex = (storyIndex + 1) % storyLines.length;
  const [firstLine, secondLine] = storyLines[storyIndex];
  const updateLine = (lineElement, text) => {
    if (reduceMotion) {
      lineElement.firstElementChild.textContent = text;
      return;
    }
    const nextText = document.createElement('span');
    nextText.textContent = text;
    lineElement.append(nextText);
    lineElement.classList.add('is-changing');
    setTimeout(() => {
      lineElement.firstElementChild.remove();
      lineElement.classList.remove('is-changing');
    }, 900);
  };
  updateLine(storyLineOne, firstLine);
  updateLine(storyLineTwo, secondLine);
  heroKorean?.setAttribute('aria-label', `${firstLine} ${secondLine}`);
};

if (!reduceMotion) storyTimer = setInterval(rollStory, 5600);
let particleFrame;
let particles = [];
let particleWidth = 0;
let particleHeight = 0;

const setupParticles = () => {
  if (!particleCanvas || !particleContext) return;
  const bounds = particleCanvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  particleWidth = bounds.width;
  particleHeight = bounds.height;
  particleCanvas.width = particleWidth * pixelRatio;
  particleCanvas.height = particleHeight * pixelRatio;
  particleContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  const count = Math.min(115, Math.max(55, Math.floor(particleWidth / 10)));
  particles = Array.from({ length: count }, (_, index) => {
    const x = Math.random() * particleWidth;
    const progress = x / particleWidth;
    const bandCenter = particleHeight * (.72 - progress * .38);
    return {
      x,
      y: bandCenter + (Math.random() - .5) * particleHeight * (.04 + Math.random() * .14),
      size: Math.random() * 1.7 + .5,
      speed: Math.random() * .34 + .08,
      drift: Math.random() * 1.8 + .4,
      phase: index * .47 + Math.random() * 2,
      offset: (Math.random() - .5) * particleHeight * .11,
      accent: Math.random() > .76
    };
  });
};

const drawParticles = (time = 0) => {
  if (!particleContext) return;
  particleContext.clearRect(0, 0, particleWidth, particleHeight);
  particles.forEach((particle) => {
    if (!reduceMotion) {
      particle.x += particle.speed;
      if (particle.x > particleWidth + 20) particle.x = -20;
      const progress = Math.max(0, Math.min(1, particle.x / particleWidth));
      const bandCenter = particleHeight * (.72 - progress * .38);
      particle.y = bandCenter + particle.offset + Math.sin(time * .0005 + particle.phase) * particle.drift;
    }
    particleContext.beginPath();
    particleContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    particleContext.fillStyle = particle.accent ? 'rgba(0, 212, 170, .9)' : 'rgba(220, 230, 228, .72)';
    particleContext.fill();
  });
  particles.forEach((particle, index) => {
    particles.slice(index + 1).forEach((other) => {
      const distanceX = particle.x - other.x;
      const distanceY = particle.y - other.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < 92) {
        particleContext.beginPath();
        particleContext.moveTo(particle.x, particle.y);
        particleContext.lineTo(other.x, other.y);
        particleContext.strokeStyle = `rgba(150, 190, 185, ${.14 * (1 - distance / 92)})`;
        particleContext.lineWidth = .45;
        particleContext.stroke();
      }
    });
  });
  if (!reduceMotion) particleFrame = requestAnimationFrame(drawParticles);
};

setupParticles();
drawParticles();
window.addEventListener('resize', () => { cancelAnimationFrame(particleFrame); setupParticles(); drawParticles(); });

const updateLocalTime = () => {
  if (localTime) {
    localTime.textContent = new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul'
    }).format(new Date()) + ' KST';
  }
};

updateLocalTime();
setInterval(updateLocalTime, 60000);

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
const portfolioTrack = document.querySelector('.portfolio-track');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const portfolioDetail = document.querySelector('#portfolio-detail');
const detailTitle = document.querySelector('#detail-title');
const detailKicker = document.querySelector('#detail-kicker');
const detailDescription = document.querySelector('#detail-description');
const detailCover = document.querySelector('#detail-cover');
const detailSecondary = document.querySelector('#detail-secondary');
const detailPoints = [
  document.querySelector('#detail-point-one'),
  document.querySelector('#detail-point-two'),
  document.querySelector('#detail-point-three')
];
let portfolioIndex = 0;
let portfolioTimer;

const movePortfolio = (direction) => {
  if (!portfolioTrack || portfolioCards.length < 2) return;
  const visibleCards = window.matchMedia('(max-width: 600px)').matches ? 1 : window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
  const lastIndex = Math.max(0, portfolioCards.length - visibleCards);
  portfolioIndex += direction;
  if (portfolioIndex > lastIndex) portfolioIndex = 0;
  if (portfolioIndex < 0) portfolioIndex = lastIndex;
  const cardWidth = portfolioCards[0].getBoundingClientRect().width + 14;
  portfolioTrack.style.transform = `translateX(-${portfolioIndex * cardWidth}px)`;
};

document.querySelectorAll('.portfolio-arrow').forEach((button) => {
  button.addEventListener('click', () => movePortfolio(button.dataset.direction === 'next' ? 1 : -1));
});

const portfolioSlider = document.querySelector('.portfolio-slider');
const startPortfolioRoll = () => {
  clearInterval(portfolioTimer);
  portfolioTimer = setInterval(() => movePortfolio(1), 4200);
};

portfolioSlider?.addEventListener('mouseenter', () => clearInterval(portfolioTimer));
portfolioSlider?.addEventListener('mouseleave', startPortfolioRoll);
portfolioSlider?.addEventListener('focusin', () => clearInterval(portfolioTimer));
portfolioSlider?.addEventListener('focusout', (event) => {
  if (!portfolioSlider.contains(event.relatedTarget)) startPortfolioRoll();
});
startPortfolioRoll();

document.querySelectorAll('.portfolio-open').forEach((item) => {
  const selectPortfolio = () => {
    document.querySelectorAll('.portfolio-card').forEach((card) => card.classList.remove('is-selected'));
    item.classList.add('is-selected');
    detailTitle.textContent = item.dataset.title;
    detailKicker.textContent = item.dataset.kicker;
    detailDescription.textContent = item.dataset.description || '상품의 감정에서 출발해 제작 과정과 선택 정보까지 이어지는 상세페이지를 설계한 작업입니다.';
    detailCover.src = item.dataset.image;
    detailCover.alt = item.dataset.title;
    if (detailSecondary && item.dataset.detail) {
      detailSecondary.src = item.dataset.detail;
      detailSecondary.alt = `${item.dataset.title} 상세 이미지`;
    }
    detailPoints.forEach((point, index) => {
      const pointNumber = ['one', 'two', 'three'][index];
      if (point && item.dataset[`point-${pointNumber}`]) point.textContent = item.dataset[`point-${pointNumber}`];
    });
    portfolioDetail?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  item.addEventListener('click', selectPortfolio);
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectPortfolio(); }
  });
});

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.textContent = isOpen ? 'Menu' : 'Close';
  nav?.classList.toggle('mobile-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = 'Menu';
    nav.classList.remove('mobile-open');
  });
});
