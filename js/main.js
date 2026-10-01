// Beauty Nell — interactions du site

document.addEventListener('DOMContentLoaded', function () {

  // Nav transparente sur le hero, solide une fois qu'on l'a dépassé
  var heroWrap = document.querySelector('.hero-wrap');
  var siteNav = document.getElementById('siteNav');
  if (heroWrap && siteNav) {
    var handleNavScroll = function () {
      var rect = heroWrap.getBoundingClientRect();
      var pastHero = rect.bottom <= siteNav.offsetHeight;
      siteNav.classList.toggle('is-fixed', pastHero);
      siteNav.classList.toggle('on-light', pastHero);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    window.addEventListener('resize', handleNavScroll);
    handleNavScroll();
  }

  // Menu mobile
  var menuToggle = document.getElementById('menuToggle');
  var mobilePanel = document.getElementById('mobilePanel');
  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobilePanel.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobilePanel.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Slider avant / après : glisser manuel + boucle automatique
  var baEl = document.getElementById('baSlider');
  if (baEl) {
    var auto = true;
    var dragging = false;
    var cycleToken = 0;
    var resumeTimeout = null;
    var RESUME_DELAY = 3500;

    function setPos(p) {
      p = Math.max(0, Math.min(100, p));
      baEl.style.setProperty('--pos', p + '%');
    }

    function posFromClientX(clientX) {
      var rect = baEl.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateTo(from, to, duration, token) {
      return new Promise(function (resolve) {
        var start = null;
        function frame(now) {
          if (token !== cycleToken) { resolve(); return; }
          if (start === null) start = now;
          var t = Math.min(1, (now - start) / duration);
          setPos(from + (to - from) * easeInOutCubic(t));
          if (t < 1) { requestAnimationFrame(frame); } else { resolve(); }
        }
        requestAnimationFrame(frame);
      });
    }

    function wait(ms, token) {
      return new Promise(function (resolve) {
        setTimeout(function () { resolve(); }, ms);
      });
    }

    function runCycle(token) {
      Promise.resolve()
        .then(function () { return animateTo(50, 82, 1800, token); })
        .then(function () { return wait(900, token); })
        .then(function () { if (token !== cycleToken || !auto) return Promise.reject('stopped'); return animateTo(82, 18, 2200, token); })
        .then(function () { return wait(900, token); })
        .then(function () { if (token !== cycleToken || !auto) return Promise.reject('stopped'); return animateTo(18, 50, 1400, token); })
        .then(function () { return wait(700, token); })
        .then(function () {
          if (token === cycleToken && auto) runCycle(token);
        })
        .catch(function () { /* cycle interrupted by user interaction */ });
    }

    function stopAuto() {
      auto = false;
      cycleToken++;
      if (resumeTimeout) clearTimeout(resumeTimeout);
    }

    function scheduleResume() {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(function () {
        auto = true;
        cycleToken++;
        runCycle(cycleToken);
      }, RESUME_DELAY);
    }

    baEl.addEventListener('pointerdown', function (e) {
      stopAuto();
      dragging = true;
      setPos(posFromClientX(e.clientX));
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      setPos(posFromClientX(e.clientX));
    });
    window.addEventListener('pointerup', function () {
      if (!dragging) return;
      dragging = false;
      scheduleResume();
    });

    runCycle(cycleToken);
  }

  // Vidéos produit : lecture une fois, puis retour à l'image
  document.querySelectorAll('.video-hover .vh-video').forEach(function (video) {
    video.addEventListener('ended', function () {
      video.classList.add('is-done');
    });
  });

  // Onglets soins institut (Visage / Corps / Capillaires)
  var svcTabs = document.querySelectorAll('.svc-tab');
  var svcPanels = document.querySelectorAll('.svc-grid[data-panel]');
  svcTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      svcTabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      var cat = tab.getAttribute('data-cat');
      svcPanels.forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-panel') !== cat;
      });
    });
  });

  // Réservation : choix du jour / créneau puis envoi via WhatsApp
  var bookingDaysEl = document.getElementById('bookingDays');
  if (bookingDaysEl) {
    var DAY_NAMES = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
    var SLOTS = ['10h', '11h', '14h', '16h'];
    var selectedDay = null;
    var selectedSlot = null;
    var bookingSlotsEl = document.getElementById('bookingSlots');
    var bookingAgree = document.getElementById('bookingAgree');
    var bookingSubmit = document.getElementById('bookingSubmit');
    var bookingSoin = document.getElementById('bookingSoin');

    var cursor = new Date();
    var added = 0;
    while (added < 8) {
      cursor.setDate(cursor.getDate() + 1);
      if (cursor.getDay() === 0) continue; // fermé le dimanche
      (function (date) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'booking-day';
        var monthShort = date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
        btn.innerHTML = '<span>' + DAY_NAMES[date.getDay()] + '</span>' + date.getDate() + ' ' + monthShort;
        btn.addEventListener('click', function () {
          document.querySelectorAll('.booking-day').forEach(function (d) { d.classList.remove('is-selected'); });
          btn.classList.add('is-selected');
          selectedDay = date;
          selectedSlot = null;
          renderSlots();
          updateSubmitState();
        });
        bookingDaysEl.appendChild(btn);
      })(new Date(cursor));
      added++;
    }

    function renderSlots() {
      bookingSlotsEl.innerHTML = '';
      SLOTS.forEach(function (slot) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'booking-slot';
        btn.textContent = slot;
        btn.addEventListener('click', function () {
          document.querySelectorAll('.booking-slot').forEach(function (s) { s.classList.remove('is-selected'); });
          btn.classList.add('is-selected');
          selectedSlot = slot;
          updateSubmitState();
        });
        bookingSlotsEl.appendChild(btn);
      });
    }

    function updateSubmitState() {
      bookingSubmit.disabled = !(selectedDay && selectedSlot && bookingAgree.checked);
    }

    bookingAgree.addEventListener('change', updateSubmitState);

    bookingSubmit.addEventListener('click', function () {
      if (bookingSubmit.disabled) return;
      var dateStr = selectedDay.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
      var soin = bookingSoin.value.trim();
      var message = 'Bonjour, je souhaite réserver un rendez-vous le ' + dateStr + ' à ' + selectedSlot +
        (soin ? ' pour : ' + soin : '') + '. J\'ai bien noté l\'acompte de 5 100 FCFA à envoyer par Mobile Money.';
      var url = 'https://wa.me/229167975626?text=' + encodeURIComponent(message);
      window.open(url, '_blank', 'noopener');
    });
  }

  // FAQ : afficher plus de questions sur action de l'utilisateur
  var faqToggle = document.getElementById('faqToggle');
  var faqMore = document.getElementById('faqMore');
  if (faqToggle && faqMore) {
    faqToggle.addEventListener('click', function () {
      var isOpen = faqMore.hidden === false;
      faqMore.hidden = isOpen;
      faqToggle.classList.toggle('is-open', !isOpen);
      faqToggle.querySelector('span').textContent = isOpen ? 'Voir plus de questions' : 'Voir moins de questions';
    });
  }

  // Newsletter (front-end uniquement — à relier à votre service d'emailing)
  var form = document.getElementById('nlForm');
  var note = document.getElementById('nlNote');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      note.textContent = 'Merci, vous êtes inscrite à la lettre de soin.';
      form.reset();
    });
  }

});
