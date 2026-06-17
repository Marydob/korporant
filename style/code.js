// Бургер-меню
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.onclick = function() {
  mobileMenu.classList.toggle('open');
};

const links = mobileMenu.querySelectorAll('a');
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function() {
    mobileMenu.classList.remove('open');
  };
}

// Карусель отзывов
const track = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let slide = 0;
const totalSlides = track.children.length;

function getPerView() {
  return window.innerWidth <= 834 ? 1 : 3;
}

function goToSlide() {
  const perView = getPerView();
  const maxSlide = totalSlides - perView;
  if (slide > maxSlide) slide = maxSlide;
  if (slide < 0) slide = 0;
  track.style.transform = 'translateX(-' + (slide * (100 / perView)) + '%)';
}

nextBtn.onclick = function() {
  const perView = getPerView();
  if (slide < totalSlides - perView) {
    slide++;
    goToSlide();
  }
};

prevBtn.onclick = function() {
  if (slide > 0) {
    slide--;
    goToSlide();
  }
};

window.addEventListener('resize', function() {
  slide = 0;
  goToSlide();
});

goToSlide();

// Профессии
const data = [
  ['экономист','менеджер','редактор','копирайтер','дизайнер','тимлид','аналитик','программист'],
  ['продюсер','оператор','арт-директор','таргетолог','бухгалтер','аудитор','инженер','проектировщик','консультант'],
  ['куратор','тьютор','художник','композитор','строитель','архитектор','аниматор','фотограф']
];

const colors = [
  ['orange','grey','orange','grey','orange','grey','orange','grey'],
  ['white','grey','white','grey','white','grey','white','grey','white'],
  ['grey','orange','grey','orange','grey','orange','grey','orange']
];

function fillLine(id, words, cols) {
  const line = document.getElementById(id);
  let html = '';
  for (let k = 0; k < 4; k++) {
    for (let j = 0; j < words.length; j++) {
      html += '<span class="tag tag-' + cols[j] + '">' + words[j] + '</span>';
    }
  }
  line.innerHTML = html;
}

fillLine('line1', data[0], colors[0]);
fillLine('line2', data[1], colors[1]);
fillLine('line3', data[2], colors[2]);

// Анимация ленты
const lines = [
  document.getElementById('line1'),
  document.getElementById('line2'),
  document.getElementById('line3')
];

const pos = [0, 0, 0];
const dir = [1, -1, 1];

pos[1] = -lines[1].offsetWidth / 2;

function move() {
  for (let i = 0; i < 3; i++) {
    pos[i] += 0.5 * dir[i];
    const half = lines[i].offsetWidth / 2;
    if (dir[i] === 1 && pos[i] >= 0) pos[i] = -half;
    if (dir[i] === -1 && pos[i] <= -half) pos[i] = 0;
    lines[i].style.transform = 'translateX(' + pos[i] + 'px)';
  }
  requestAnimationFrame(move);
}

move();