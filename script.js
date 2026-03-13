// Carousel data: students' opinions
var opinionsData = [
  {
    quote: '"Kurs juda tushunarli va foydali edi. 5 oy ichida Listening va Speaking ancha yaxshilandi. IELTS dan 7.0 oldim — ustozga katta rahmat!"',
    name: 'Dilnoza R.',
    score: 'IELTS 7.0'
  },
  {
    quote: '"Darslar qiziqarli va tizimli. Writing bo\'yicha ko\'p narsa o\'rgandim. Maslahatlarim — qatnang va uyga vazifalarni bajaring."',
    name: 'Jasur K.',
    score: 'IELTS 6.5'
  },
  {
    quote: '"O\'qituvchi juda sabrli va har bir savolga tushunarli javob beradi. Speaking bo\'yicha ishonchim oshdi. Tavsiya qilaman!"',
    name: 'Madina S.',
    score: 'IELTS 7.5'
  },
  {
    quote: '"5 oylik kurs — to\'g\'ri muddat. Juda ko\'p mock test qildik, shuning uchun imtihonda tashvish kam bo\'ldi. Natija 7.0."',
    name: 'Aziz T.',
    score: 'IELTS 7.0'
  },
  {
    quote: '"Kompyuterda mock testlar va darslarda kompyuter asosida mashq qilish juda yordam berdi. Imtihon formatiga tez odatlandim. 7.5 ball."',
    name: 'Nilufar M.',
    score: 'IELTS 7.5'
  },
  {
    quote: '"Ustoz har bir bo\'limga alohida e\'tibor beradi. Listening va Reading da strategiyalarini o\'rgatdi — natija 6.5. Rahmat!"',
    name: 'Bobur J.',
    score: 'IELTS 6.5'
  },
  {
    quote: '"Darslar haftada 5 kun — intensiv, lekin natija ko\'rinadi. Bir yil oldin 5.5 edim, endi 7.0. Barchaga tavsiya qilaman."',
    name: 'Sevinch K.',
    score: 'IELTS 7.0'
  }
];

// Carousel data: students' results
var resultsData = [
  { score: '7.5', name: 'Madina', year: '2024' },
  { score: '7.0', name: 'Dilnoza', year: '2024' },
  { score: '8.0', name: 'Sardor', year: '2024' },
  { score: '6.5', name: 'Jasur', year: '2024' },
  { score: '7.0', name: 'Aziz', year: '2024' }
];

function renderOpinionsSlides() {
  var wrapper = document.querySelector('.swiper-opinions .swiper-wrapper');
  if (!wrapper) return;
  var starsHtml = '<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>';
  opinionsData.forEach(function (item) {
    var slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML =
      '<div class="opinion-card">' +
      '<div class="opinion-header">' +
      '<div class="opinion-meta"><p class="opinion-name">' + item.name + '</p><p class="opinion-score">' + item.score + '</p></div>' +
      '<div class="opinion-stars">' + starsHtml + '</div></div>' +
      '<p class="opinion-quote">' + item.quote + '</p></div>';
    wrapper.appendChild(slide);
  });
}

function renderResultsSlides() {
  var wrapper = document.querySelector('.swiper-results .swiper-wrapper');
  if (!wrapper) return;
  resultsData.forEach(function (item) {
    var slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML =
      '<div class="result-card">' +
      '<p class="result-score">' + item.score + '</p>' +
      '<p class="result-name">' + item.name + '</p>' +
      '<p class="result-year">' + item.year + '</p></div>';
    wrapper.appendChild(slide);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderOpinionsSlides();
  renderResultsSlides();

  // Swiper: Students' opinions — loop, autoplay
  new Swiper('.swiper-opinions', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // Swiper: Students' results — loop, autoplay
  new Swiper('.swiper-results', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 }
    }
  });

  // Form submit
  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('username').value;
      var phone = document.getElementById('phone').value;
      // Here you can send to your backend or analytics
      console.log('Yuborildi:', { name: name, phone: phone });
      alert("Ma'lumotlaringiz qabul qilindi! Tez orada siz bilan bog'lanamiz.");
      form.reset();
    });
  }

  // Hero video: hide overlay when playing, show on pause
  var video = document.getElementById('hero-video');
  var overlay = document.getElementById('hero-video-overlay');
  if (video && overlay) {
    video.addEventListener('play', function () {
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
    });
    video.addEventListener('pause', function () {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = '';
    });
    overlay.addEventListener('click', function () {
      video.play();
    });
  }
});
