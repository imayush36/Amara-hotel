/**
 * AMARA HOTEL — GORAKHPUR
 * Luxury Hotel Web Application Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DATA & CONSTANTS
  // ==========================================

  const CURRENCY_RATES = {
    INR: { symbol: 'Rs. ', rate: 1, name: 'Indian Rupee' },
    USD: { symbol: '$', rate: 0.012, name: 'US Dollar' },
    EUR: { symbol: '€', rate: 0.011, name: 'Euro' },
    GBP: { symbol: '£', rate: 0.0094, name: 'British Pound' }
  };

  let currentCurrency = 'INR';

  const ROOM_DATA = {
    deluxe: {
      id: 'deluxe',
      name: 'Deluxe Room',
      badge: 'Best Seller · 2 Guests',
      priceINR: 2499,
      bed: 'Queen Bed',
      image: 'assets/images/compositor.jpg',
      description: 'Immerse yourself in comfort with our Deluxe Room, equipped with plush bedding, dedicated work desk, smart LED TV, tea/coffee maker, and modern en-suite bathroom.',
      amenities: [
        'High-speed complimentary Wi-Fi & Smart TV',
        '24/7 in-room dining from Dinner Bell Restaurant',
        'Air Conditioning with climate control',
        'Daily housekeeping & premium toiletries',
        'Electric kettle with complimentary tea/coffee kit',
        'Dedicated ergonomic work desk & wardrobe'
      ]
    },
    superdeluxe: {
      id: 'superdeluxe',
      name: 'Super Deluxe Room',
      badge: 'Featured · City View',
      priceINR: 3299,
      bed: 'King Bed',
      image: 'assets/images/press_loft.jpg',
      description: 'Experience elevated luxury with our spacious Super Deluxe Room. Featuring expansive glass windows overlooking Gorakhpur, king-sized mattress, cozy sitting area, and premium amenities.',
      amenities: [
        'Expansive floor plan with luxury sitting lounge',
        'Complimentary breakfast at Dinner Bell',
        'Rainfall shower with bespoke herbal amenities',
        'Mini refrigerator & electric kettle',
        '50" 4K Smart LED TV with satellite channels',
        'Express laundry & valet assistance'
      ]
    },
    suite: {
      id: 'suite',
      name: 'Suite Room',
      badge: 'Master Suite · Living Area',
      priceINR: 4999,
      bed: 'Grand King Bed',
      image: 'assets/images/bindery_suite.jpg',
      description: 'Our master Suite Room is the pinnacle of Amara Hotel indulgence. Offers an independent drawing salon with sofa set, private bedroom with master king bed, luxury bath, and 24/7 dedicated service.',
      amenities: [
        'Separate drawing room with plush sofa set',
        'Deep soaking bathtub & complimentary bathrobes',
        'Priority table reservation at Dinner Bell',
        'Complimentary morning breakfast buffet',
        '55" 4K Smart TV in living & bedroom',
        'Dedicated 24-hour concierge assistance'
      ]
    },
    twin: {
      id: 'twin',
      name: 'Twin Room',
      badge: 'Twin Beds · 2 Guests',
      priceINR: 2699,
      bed: '2 Single Beds',
      image: 'assets/images/founders_room.jpg',
      description: 'Ideal for colleagues, friends, or traveling pairs. Features two individual single beds with ergonomic mattresses, dedicated work space, high-speed Wi-Fi, and complete comfort amenities.',
      amenities: [
        'Twin comfortable beds with individual reading sconces',
        'Full tea/coffee maker & minibar options',
        'High-speed Wi-Fi for video conferences',
        'Spacious wardrobe with electronic safe',
        'En-suite modern bathroom with hot water',
        '24/7 front desk & travel desk support'
      ]
    }
  };

  // ==========================================
  // 2. CURRENCY CONVERSION & FORMATTING
  // ==========================================

  function formatCurrency(amountINR) {
    const curr = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.INR;
    const converted = Math.round(amountINR * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  }

  function updateAllPriceTags() {
    document.querySelectorAll('[data-base-inr]').forEach(el => {
      const baseINR = parseFloat(el.getAttribute('data-base-inr'));
      if (!isNaN(baseINR)) {
        const amountSpan = el.querySelector('.rate-amount');
        if (amountSpan) {
          amountSpan.textContent = formatCurrency(baseINR);
        }
      }
    });

    // Update reservation form rate options
    const roomSelect = document.getElementById('res-room-select');
    if (roomSelect) {
      Array.from(roomSelect.options).forEach(opt => {
        const rate = parseFloat(opt.getAttribute('data-rate'));
        if (!isNaN(rate)) {
          const roomName = opt.textContent.split('(')[0].trim();
          opt.textContent = `${roomName} (${formatCurrency(rate)} / night)`;
        }
      });
    }

    calculateReservationTotal();
  }

  const currencySelector = document.getElementById('currency-selector');
  if (currencySelector) {
    currencySelector.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      updateAllPriceTags();
    });
  }

  // ==========================================
  // 3. THEME TOGGLE (LIGHT / DARK)
  // ==========================================

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconLight = document.getElementById('theme-icon-light');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('ba_theme') || 'light';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ba_theme', nextTheme);
      updateThemeIcons(nextTheme);
    });
  }

  function updateThemeIcons(theme) {
    if (theme === 'dark') {
      if (themeIconLight) themeIconLight.style.display = 'none';
      if (themeIconDark) themeIconDark.style.display = 'inline';
    } else {
      if (themeIconLight) themeIconLight.style.display = 'inline';
      if (themeIconDark) themeIconDark.style.display = 'none';
    }
  }

  // ==========================================
  // 4. MOBILE NAVIGATION MENU & LUXURY SIDEBAR DRAWER
  // ==========================================

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop');

  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('drawer-open');
    if (mobileToggle) mobileToggle.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('drawer-open');
    if (mobileToggle) mobileToggle.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer && mobileDrawer.classList.contains('drawer-open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileDrawer();
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileDrawer);
  }

  // Close drawer on clicking links
  document.querySelectorAll('.mobile-nav-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // Toggle drawer rooms dropdown on mobile if desired
  const drawerDropdownHeader = document.querySelector('.drawer-dropdown-header');
  const drawerSublinks = document.querySelector('.drawer-sublinks');
  if (drawerDropdownHeader && drawerSublinks) {
    drawerDropdownHeader.addEventListener('click', () => {
      const isVisible = drawerSublinks.style.display === 'flex';
      drawerSublinks.style.display = isVisible ? 'none' : 'flex';
    });
  }

  // ==========================================
  // 5. ROOMS FILTER TABS
  // ==========================================

  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const roomCards = document.querySelectorAll('.room-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      roomCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. ROOM DETAIL MODAL
  // ==========================================

  const roomDetailModal = document.getElementById('room-detail-modal');
  const roomModalClose = document.getElementById('room-modal-close');
  const modalImg = document.getElementById('modal-room-img');
  const modalBadge = document.getElementById('modal-room-badge');
  const modalTitle = document.getElementById('modal-room-title');
  const modalPrice = document.getElementById('modal-room-price');
  const modalDesc = document.getElementById('modal-room-desc');
  const modalAmenities = document.getElementById('modal-room-amenities');
  const modalBookBtn = document.getElementById('modal-book-now-btn');

  let selectedRoomForModal = 'deluxe';

  function openRoomModal(roomId) {
    const room = ROOM_DATA[roomId] || ROOM_DATA.deluxe;
    selectedRoomForModal = roomId;

    if (modalImg) modalImg.src = room.image;
    if (modalBadge) modalBadge.textContent = room.badge;
    if (modalTitle) modalTitle.textContent = room.name;
    if (modalPrice) modalPrice.textContent = `${formatCurrency(room.priceINR)} / night`;
    if (modalDesc) modalDesc.textContent = room.description;

    if (modalAmenities) {
      modalAmenities.innerHTML = room.amenities.map(a => `<div>✓ ${a}</div>`).join('');
    }

    if (roomDetailModal) roomDetailModal.classList.add('active');
  }

  document.querySelectorAll('.open-room-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const roomId = btn.getAttribute('data-room');
      openRoomModal(roomId);
    });
  });

  if (roomModalClose && roomDetailModal) {
    roomModalClose.addEventListener('click', () => {
      roomDetailModal.classList.remove('active');
    });

    roomDetailModal.addEventListener('click', (e) => {
      if (e.target === roomDetailModal) {
        roomDetailModal.classList.remove('active');
      }
    });
  }

  if (modalBookBtn) {
    modalBookBtn.addEventListener('click', () => {
      if (roomDetailModal) roomDetailModal.classList.remove('active');
      const roomSelect = document.getElementById('res-room-select');
      if (roomSelect) {
        roomSelect.value = selectedRoomForModal;
        calculateReservationTotal();
      }
      const resSection = document.getElementById('reservation');
      if (resSection) {
        resSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Direct Book buttons across cards
  document.querySelectorAll('.direct-book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const roomId = btn.getAttribute('data-room');
      const roomSelect = document.getElementById('res-room-select');
      if (roomSelect && roomId) {
        roomSelect.value = roomId;
        calculateReservationTotal();
      }
      const resSection = document.getElementById('reservation');
      if (resSection) {
        resSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // 7. HERO SEARCH BAR TO RESERVATION
  // ==========================================

  const heroSearchBtn = document.getElementById('hero-search-btn');
  if (heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      const checkin = document.getElementById('hero-checkin')?.value;
      const checkout = document.getElementById('hero-checkout')?.value;
      const roomType = document.getElementById('hero-room-type')?.value;
      const guests = document.getElementById('hero-guests')?.value;

      const resCheckin = document.getElementById('res-checkin');
      const resCheckout = document.getElementById('res-checkout');
      const resRoom = document.getElementById('res-room-select');
      const resGuests = document.getElementById('res-guests');

      if (resCheckin && checkin) resCheckin.value = checkin;
      if (resCheckout && checkout) resCheckout.value = checkout;
      if (resRoom && roomType) resRoom.value = roomType;
      if (resGuests && guests) resGuests.value = guests;

      calculateReservationTotal();

      const resSection = document.getElementById('reservation');
      if (resSection) {
        resSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ==========================================
  // 8. LIVE RESERVATION ENGINE & CALCULATOR
  // ==========================================

  const resForm = document.getElementById('reservation-form');
  const resRoomSelect = document.getElementById('res-room-select');
  const resNightsInput = document.getElementById('res-nights');
  const resCheckinInput = document.getElementById('res-checkin');
  const resCheckoutInput = document.getElementById('res-checkout');
  const resSumNights = document.getElementById('res-sum-nights');
  const resSumTotal = document.getElementById('res-sum-total');
  const bookingConfirmModal = document.getElementById('booking-confirmation-modal');
  const confirmCloseBtn = document.getElementById('confirm-modal-close-btn');

  function calculateReservationTotal() {
    if (!resRoomSelect || !resSumTotal) return;

    let nights = parseInt(resNightsInput?.value || '2', 10);
    if (isNaN(nights) || nights < 1) nights = 1;

    // Calculate nights from dates if available
    if (resCheckinInput?.value && resCheckoutInput?.value) {
      const d1 = new Date(resCheckinInput.value);
      const d2 = new Date(resCheckoutInput.value);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        nights = diffDays;
        if (resNightsInput) resNightsInput.value = nights;
      }
    }

    const selectedOption = resRoomSelect.options[resRoomSelect.selectedIndex];
    const baseRate = parseFloat(selectedOption?.getAttribute('data-rate') || '2499');
    const totalINR = baseRate * nights;

    if (resSumNights) {
      resSumNights.textContent = `${nights} Night${nights > 1 ? 's' : ''} · 1 Room`;
    }
    resSumTotal.textContent = formatCurrency(totalINR);
  }

  if (resRoomSelect) resRoomSelect.addEventListener('change', calculateReservationTotal);
  if (resNightsInput) resNightsInput.addEventListener('input', calculateReservationTotal);
  if (resCheckinInput) resCheckinInput.addEventListener('change', calculateReservationTotal);
  if (resCheckoutInput) resCheckoutInput.addEventListener('change', calculateReservationTotal);

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-fullname')?.value || 'Guest';
      const phone = document.getElementById('res-phone')?.value || '';
      const room = resRoomSelect?.options[resRoomSelect.selectedIndex]?.text.split('(')[0].trim() || 'Deluxe Room';
      const bookingId = '#BA-' + Math.floor(100000 + Math.random() * 900000);

      const confirmDesc = document.getElementById('confirm-desc-text');
      const confirmId = document.getElementById('confirm-booking-id');

      if (confirmDesc) {
        confirmDesc.innerHTML = `Thank you, <strong>${name}</strong>! Your reservation request for <strong>${room}</strong> has been received. Our concierge will contact you at <strong>${phone}</strong> on WhatsApp shortly.`;
      }
      if (confirmId) {
        confirmId.textContent = `BOOKING ID: ${bookingId}`;
      }

      if (bookingConfirmModal) {
        bookingConfirmModal.classList.add('active');
      }
      showToast(`Reservation request sent successfully! Booking ID: ${bookingId}`);
    });
  }

  if (confirmCloseBtn && bookingConfirmModal) {
    confirmCloseBtn.addEventListener('click', () => {
      bookingConfirmModal.classList.remove('active');
    });

    bookingConfirmModal.addEventListener('click', (e) => {
      if (e.target === bookingConfirmModal) {
        bookingConfirmModal.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 9. CONTACT INQUIRY FORM & TOAST
  // ==========================================

  const inqForm = document.getElementById('contact-inquiry-form');
  if (inqForm) {
    inqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inq-name')?.value || 'Guest';
      showToast(`Thank you, ${name}! Your inquiry has been sent to Amara Hotel.`);
      inqForm.reset();
    });
  }

  function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `<span>✦</span><span>${msg}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // ==========================================
  // 10. GSAP & SCROLLTRIGGER ANIMATIONS
  // ==========================================

  function initGsapAnimations() {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Master Hero Entrance Timeline
    const tlHero = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });

    tlHero
      .from('.main-navbar', { y: -20, opacity: 0, duration: 0.6 })
      .from('.hero-main-title', { y: 40, opacity: 0, duration: 1.0, ease: 'power4.out' }, '-=0.3')
      .from('.hero-tagline-sub', { opacity: 0, letterSpacing: '0.4em', duration: 0.8 }, '-=0.6')
      .from('.hero-main-lead', { y: 25, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero-cta-group', { y: 20, opacity: 0, scale: 0.95, duration: 0.7 }, '-=0.4')
      .from('.hero-booking-bar', { y: 35, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
      .from('.hero-cinematic-viewport', { y: 45, scale: 0.96, opacity: 0, duration: 1.1 }, '-=0.5')
      .from('.hero-floating-details .hero-stat-badge', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.3');

    if (typeof ScrollTrigger === 'undefined') return;

    // Header Pinning & Back to Top / Floating Book Room visibility
    const header = document.getElementById('site-header');
    const floatingBookPill = document.getElementById('floating-book-pill');
    const floatingTopBtn = document.getElementById('floating-top-btn');

    function updateFloatingState(currentScrollY, direction = 1) {
      if (header) {
        if (currentScrollY > 100) {
          header.classList.add('header-scrolled');
          if (direction === 1 && currentScrollY > 250) {
            header.classList.add('header-unpinned');
            header.classList.remove('header-pinned');
          } else if (direction === -1) {
            header.classList.add('header-pinned');
            header.classList.remove('header-unpinned');
          }
        } else {
          header.classList.remove('header-scrolled', 'header-unpinned', 'header-pinned');
        }
      }

      const isScrolledPast = currentScrollY > 300;
      if (floatingBookPill) {
        floatingBookPill.classList.toggle('visible', isScrolledPast);
      }
      if (floatingTopBtn) {
        floatingTopBtn.classList.toggle('visible', isScrolledPast);
      }
    }

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        updateFloatingState(self.scroll(), self.direction);
      }
    });

    window.addEventListener('scroll', () => {
      updateFloatingState(window.scrollY);
    }, { passive: true });

    if (floatingTopBtn) {
      floatingTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Hero Cover Image Parallax Scrub
    gsap.to('.cover-hero-img', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    // Section Headers Reveal
    document.querySelectorAll('.section-header, .editorial-intro-row').forEach((hdr) => {
      gsap.from(hdr, {
        scrollTrigger: {
          trigger: hdr,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Staggered Room Cards Reveal
    ScrollTrigger.batch('.room-card', {
      start: 'top 88%',
      onEnter: (elements) => gsap.fromTo(elements,
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.75, ease: 'power3.out', overwrite: 'auto' }
      )
    });

    // Staggered Editorial & Space Cards
    ScrollTrigger.batch('.editorial-card, .space-card, .gallery-item', {
      start: 'top 88%',
      onEnter: (elements) => gsap.fromTo(elements,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out', overwrite: 'auto' }
      )
    });

    // Dining Section Reveal
    gsap.from('.dining-image-col', {
      scrollTrigger: {
        trigger: '.dining-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: -40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.dining-content-col', {
      scrollTrigger: {
        trigger: '.dining-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      x: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  }

  // ==========================================
  // 11. 3D CARD TILT & SPECULAR GLARE
  // ==========================================

  function init3DCardTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (!tiltElements.length) return;

    tiltElements.forEach(el => {
      let bounds;

      function updateBounds() {
        bounds = el.getBoundingClientRect();
      }

      function onMouseMove(e) {
        if (!bounds) updateBounds();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = mouseX / bounds.width;
        const yPct = mouseY / bounds.height;

        const tiltX = (0.5 - yPct) * 12;
        const tiltY = (xPct - 0.5) * 12;

        el.style.setProperty('--mouse-x', `${xPct * 100}%`);
        el.style.setProperty('--mouse-y', `${yPct * 100}%`);
        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
      }

      function onMouseLeave() {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      }

      el.addEventListener('mouseenter', updateBounds);
      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mouseleave', onMouseLeave);
    });
  }

  // ==========================================
  // 12. MAGNETIC BUTTON HOVER PHYSICS
  // ==========================================

  function initMagneticButtons() {
    const magnetics = document.querySelectorAll('.btn-brand, .floating-book-pill, .brand-monogram-box');
    magnetics.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // ==========================================
  // 13. INTERACTIVE RADAR & NEARBY LOCATIONS
  // ==========================================

  function initNearbyRadarInteractions() {
    const listItems = document.querySelectorAll('.nearby-list-item');
    const radarPins = document.querySelectorAll('.radar-pin-node');
    const connectorLines = document.querySelectorAll('.radar-connector-line');

    if (!listItems.length) return;

    function activateLocation(locId) {
      if (!locId) return;

      // Update list items
      listItems.forEach(item => {
        if (item.getAttribute('data-location-id') === locId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      // Update radar pins
      radarPins.forEach(pin => {
        if (pin.getAttribute('data-location-id') === locId) {
          pin.classList.add('active');
        } else {
          pin.classList.remove('active');
        }
      });

      // Update connector lines
      connectorLines.forEach(line => {
        if (line.getAttribute('data-location-id') === locId) {
          line.classList.add('active');
        } else {
          line.classList.remove('active');
        }
      });
    }

    // List item events
    listItems.forEach(item => {
      const locId = item.getAttribute('data-location-id');
      item.addEventListener('mouseenter', () => activateLocation(locId));
      item.addEventListener('click', () => activateLocation(locId));
      item.addEventListener('touchstart', () => activateLocation(locId), { passive: true });
    });

    // Radar pin events
    radarPins.forEach(pin => {
      const locId = pin.getAttribute('data-location-id');
      pin.addEventListener('mouseenter', () => activateLocation(locId));
      pin.addEventListener('click', () => {
        activateLocation(locId);
        const targetListItem = document.querySelector(`.nearby-list-item[data-location-id="${locId}"]`);
        if (targetListItem) {
          targetListItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      pin.addEventListener('touchstart', () => activateLocation(locId), { passive: true });
    });
  }

  // Initialize
  updateAllPriceTags();
  initGsapAnimations();
  init3DCardTilt();
  initMagneticButtons();
  initNearbyRadarInteractions();

});
