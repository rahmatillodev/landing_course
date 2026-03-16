// Carousel data: students' opinions — short, personal, real-sounding
var opinionsData = [
  {
    quote: '"Reading 7.5 — siz o\'rgatganlaringizga rahmat. Birinchi kundanoq qo\'llashni boshladim, kutganimdan ham yaxshi bo\'ldi."',
    name: 'Dilnoza R.',
    score: 'IELTS 7.0'
  },
  {
    quote: '"Writing endi qo\'rqmasdan yozaman. Darslar qiziqarli, uyga vazifa qilsangiz natija keladi."',
    name: 'Jasur K.',
    score: 'IELTS 6.5'
  },
  {
    quote: '"Thanks to everything you taught me — Speaking 7.5. Har savolga javob berasiz, sabrli ustoz."',
    name: 'Madina S.',
    score: 'IELTS 7.5'
  },
  {
    quote: '"Platformadagi testlar ko\'p bo\'lgani uchun imtihonda tashvish yo\'q edi. 7.0 — 5 oy yetarli bo\'ldi."',
    name: 'Aziz T.',
    score: 'IELTS 7.0'
  },
  {
    quote: '"Kompyuterda mashq qilish formatga tez odatlantiradi. 7.5 ball — rahmat!"',
    name: 'Nilufar M.',
    score: 'IELTS 7.5'
  },
  {
    quote: '"Listening va Reading strategiyalari ishladi. 6.5 oldim — ustozga rahmat."',
    name: 'Bobur J.',
    score: 'IELTS 6.5'
  },
  {
    quote: "Bir yil oldin 5.5, endi 7.0. Intensiv lekin natija bo'ldi.",
    name: 'Sevinch K.',
    score: 'IELTS 7.0'
  }
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

// ——— Config (inline; .env is not available in the browser for static sites) ———
var LANDING_CONFIG = {
  SUPABASE_URL: 'https://miyoovimtupziuehtcxi.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1peW9vdmltdHVweml1ZWh0Y3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMzkwNzMsImV4cCI6MjA4MzYxNTA3M30.aaCqOF-_s5s5AN-_ElrWZWch8nSVHNmQ1fvC4hi2OoY',
  SUPABASE_TABLE_LEADS: 'course_leads',
  FACEBOOK_PIXEL_ID: '4212436022332120'
};

function getConfig() {
  return (typeof window !== 'undefined' && LANDING_CONFIG) || {};
}

// Facebook Pixel: init as soon as config is available (no config.js)
(function () {
  var pixelId = (LANDING_CONFIG && LANDING_CONFIG.FACEBOOK_PIXEL_ID) || '';
  if (!pixelId) return;
  console.log('[Facebook] Initializing Pixel', { pixel_id: pixelId });
  var f = window, b = document, e = 'script', v = 'https://connect.facebook.net/en_US/fbevents.js';
  if (f.fbq) return;
  var n = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  var t = b.createElement(e);
  t.async = true;
  t.onerror = function () {
    console.warn('[Facebook] Pixel script blocked (e.g. ad blocker or privacy extension). PageView and Lead events will not be sent.');
  };
  t.onload = function () {
    console.log('[Facebook] Sending event: PageView');
  };
  t.src = v;
  var s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s);
  fbq('init', pixelId);
  fbq('track', 'PageView');
})();

// ——— Attribution from URL (for Facebook / ads) ———
function getUrlAttributionData() {
  var search = typeof window !== 'undefined' && window.location && window.location.search;
  var params = (search && search.length >= 2) ? new URLSearchParams(search) : null;
  return {
    utm_source: params ? (params.get('utm_source') || '') : '',
    utm_medium: params ? (params.get('utm_medium') || '') : '',
    utm_campaign: params ? (params.get('utm_campaign') || '') : '',
    utm_term: params ? (params.get('utm_term') || '') : '',
    utm_content: params ? (params.get('utm_content') || '') : '',
    fbclid: params ? (params.get('fbclid') || '') : ''
  };
}

function getFbpCookie() {
  var cookies = document.cookie || '';
  var start = cookies.indexOf('_fbp=');
  if (start === -1) return '';
  start += 5;
  var end = cookies.indexOf(';', start);
  if (end === -1) end = cookies.length;
  return cookies.slice(start, end).trim() || '';
}

function getFbc(fbclid) {
  return (fbclid ? 'fb.1.' + Math.floor(Date.now() / 1000) + '.' + fbclid : '') || '';
}

// ——— Save lead to Supabase and fire Facebook Lead ———
function getSupabaseClient() {
  var config = getConfig();
  var url = config.SUPABASE_URL;
  var key = config.SUPABASE_ANON_KEY;
  if (!url || !key || typeof window.supabase === 'undefined') return null;
  return window.supabase.createClient(url, key);
}

function saveLeadToSupabase(payload, onSuccess, onError) {
  var client = getSupabaseClient();
  var config = getConfig();
  var table = config.SUPABASE_TABLE_LEADS || 'course_leads';
  if (!client) {
    if (onError) onError('Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in script.js.');
    return;
  }
  client.from(table).insert([payload]).then(function (res) {
    if (res.error) {
      if (onError) onError(res.error.message || 'Supabase insert failed.');
      return;
    }
    if (onSuccess) onSuccess();
  }).catch(function (e) {
    if (onError) onError(e && e.message ? e.message : 'Network error.');
  });
}

function fireFacebookLead(leadPayload) {
  var config = getConfig();
  var pixelId = config.FACEBOOK_PIXEL_ID;
  if (!pixelId || typeof fbq !== 'function') return;
  try {
    console.log('[Facebook] Sending event: Lead', {
      pixel_id: pixelId,
      event: 'Lead',
      lead_context: leadPayload || null
    });
    fbq('track', 'Lead');
  } catch (e) {
    console.warn('[Facebook] Lead event error:', e);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  renderOpinionsSlides();

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

  // Form submit: save to Supabase (course_leads), then success message + Facebook Lead
  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameEl = document.getElementById('username');
      var phoneEl = document.getElementById('phone');
      var name = (nameEl && nameEl.value) ? nameEl.value.trim() : '';
      var phone = (phoneEl && phoneEl.value) ? phoneEl.value.trim() : '';
      if (!name || !phone) {
        alert("Ism va telefon raqamni to'ldiring.");
        return;
      }

      var urlData = getUrlAttributionData();
      var fbp = getFbpCookie();
      var fbc = getFbc(urlData.fbclid);

      var payload = {
        full_name: name,
        phone: phone,
        utm_source: urlData.utm_source || null,
        utm_medium: urlData.utm_medium || null,
        utm_campaign: urlData.utm_campaign || null,
        utm_term: urlData.utm_term || null,
        utm_content: urlData.utm_content || null,
        fbclid: urlData.fbclid || null,
        fbp: fbp || null,
        fbc: fbc || null,
        user_agent: (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : null
      };

      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Yuborilmoqda…';
      }

      saveLeadToSupabase(payload, function () {
        fireFacebookLead(payload);
        alert("Ma'lumotlaringiz qabul qilindi! Tez orada siz bilan bog'lanamiz.");
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Yuborish';
        }
      }, function (err) {
        alert("Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring yoki biz bilan bog'laning.");
        console.error('[Lead]', err);
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Yuborish';
        }
      });
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
