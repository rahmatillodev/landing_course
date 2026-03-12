// Carousel data: students' opinions
var opinionsData = [
  {
    quote: '"Kurs juda tushunarli va foydali edi. 5 oy ichida Listening va Speaking ancha yaxshilandi. IELTS dan 7.0 oldim — ustozga katta rahmat!"',
    avatar: 'https://i.pravatar.cc/100?img=1',
    name: 'Dilnoza R.',
    score: 'IELTS 7.0'
  },
  {
    quote: '"Darslar qiziqarli va tizimli. Writing bo\'yicha ko\'p narsa o\'rgandim. Maslahatlarim — qatnang va uyga vazifalarni bajaring."',
    avatar: 'https://i.pravatar.cc/100?img=3',
    name: 'Jasur K.',
    score: 'IELTS 6.5'
  },
  {
    quote: '"O\'qituvchi juda sabrli va har bir savolga tushunarli javob beradi. Speaking bo\'yicha ishonchim oshdi. Tavsiya qilaman!"',
    avatar: 'https://i.pravatar.cc/100?img=5',
    name: 'Madina S.',
    score: 'IELTS 7.5'
  },
  {
    quote: '"5 oylik kurs — to\'g\'ri muddat. Juda ko\'p mock test qildik, shuning uchun imtihonda tashvish kam bo\'ldi. Natija 7.0."',
    avatar: 'https://i.pravatar.cc/100?img=8',
    name: 'Aziz T.',
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
      '<div class="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 h-full">' +
      '<div class="flex gap-1 text-accent-400 mb-4">' + starsHtml + '</div>' +
      '<p class="text-slate-700 mb-6 leading-relaxed">' + item.quote + '</p>' +
      '<div class="flex items-center gap-4">' +
      '<div class="w-12 h-12 rounded-full bg-primary-200 overflow-hidden">' +
      '<img src="' + item.avatar + '" alt="" class="w-full h-full object-cover">' +
      '</div>' +
      '<div><p class="font-semibold text-dark-900">' + item.name + '</p>' +
      '<p class="text-slate-500 text-sm">' + item.score + '</p></div></div></div>';
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
      '<div class="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 text-center h-full flex flex-col items-center justify-center min-h-[200px]">' +
      '<p class="text-4xl font-display font-bold text-accent-400 mb-1">' + item.score + '</p>' +
      '<p class="text-white/90">' + item.name + '</p>' +
      '<p class="text-white/60 text-sm">' + item.year + '</p></div>';
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
