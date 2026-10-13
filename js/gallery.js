/**
 * AMARA HOTEL — DEDICATED GALLERY PAGE INTERACTIVE SCRIPT
 * Handles mobile drawer, category filter tabs, interactive fullscreen lightbox,
 * keyboard controls, and sticky header.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. MOBILE DRAWER NAVIGATION
  // =========================================================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop') || document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (mobileNavDrawer) {
      mobileNavDrawer.classList.add('drawer-open', 'active');
    }
    if (mobileMenuToggle) mobileMenuToggle.classList.add('open');
    if (drawerBackdrop) {
      drawerBackdrop.classList.add('active');
      drawerBackdrop.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileNavDrawer) {
      mobileNavDrawer.classList.remove('drawer-open', 'active');
    }
    if (mobileMenuToggle) mobileMenuToggle.classList.remove('open');
    if (drawerBackdrop) {
      drawerBackdrop.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNavDrawer && (mobileNavDrawer.classList.contains('drawer-open') || mobileNavDrawer.classList.contains('active'));
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  document.querySelectorAll('.mobile-nav-drawer a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Mobile drawer accordion for Rooms & Suites
  const drawerDropdownHeader = document.querySelector('.drawer-dropdown-header');
  if (drawerDropdownHeader) {
    drawerDropdownHeader.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = drawerDropdownHeader.closest('.drawer-dropdown-item');
      if (parent) parent.classList.toggle('active');
    });
  }


  // =========================================================================
  // 2. STICKY NAVBAR ON SCROLL
  // =========================================================================
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });


  // =========================================================================
  // 3. FLOATING BACK TO TOP
  // =========================================================================
  const floatingTopBtn = document.getElementById('floating-top-btn');
  if (floatingTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        floatingTopBtn.classList.add('active');
      } else {
        floatingTopBtn.classList.remove('active');
      }
    }, { passive: true });

    floatingTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // =========================================================================
  // 4. GALLERY FILTER NAVIGATION
  // =========================================================================
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
  let currentFilter = 'all';

  function filterGallery(category) {
    currentFilter = category;
    
    // Update active button state
    filterBtns.forEach(btn => {
      if (btn.dataset.filter === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Show/hide cards
    galleryCards.forEach(card => {
      const cardCategory = card.dataset.category;
      if (category === 'all' || cardCategory === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterGallery(filter);
    });
  });


  // =========================================================================
  // 5. INTERACTIVE LIGHTBOX MODAL
  // =========================================================================
  const lightboxModal = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-photo-title');
  const lightboxCategory = document.getElementById('lightbox-photo-category');
  const lightboxCounter = document.getElementById('lightbox-counter-badge');
  const lightboxInquireBtn = document.getElementById('lightbox-whatsapp-inquire');
  const lightboxCloseBtn = document.getElementById('lightbox-btn-close');
  const lightboxPrevBtn = document.getElementById('lightbox-btn-prev');
  const lightboxNextBtn = document.getElementById('lightbox-btn-next');

  let currentActiveIndex = 0;

  function getVisibleCards() {
    return galleryCards.filter(card => !card.classList.contains('hidden'));
  }

  function showLightboxImage(index) {
    const visibleCards = getVisibleCards();
    if (!visibleCards.length) return;

    // Wrap index safely
    if (index < 0) {
      index = visibleCards.length - 1;
    } else if (index >= visibleCards.length) {
      index = 0;
    }

    currentActiveIndex = index;
    const activeCard = visibleCards[currentActiveIndex];
    const imgEl = activeCard.querySelector('.gallery-card-thumb img');
    const titleEl = activeCard.querySelector('.gallery-card-title');
    const badgeEl = activeCard.querySelector('.gallery-card-badge');

    const imgSrc = imgEl ? (imgEl.getAttribute('data-full') || imgEl.src) : '';
    const imgAlt = imgEl ? imgEl.alt : 'Hotel Amara';
    const titleText = titleEl ? titleEl.textContent.trim() : 'Amara Showcase';
    const categoryText = badgeEl ? badgeEl.textContent.trim() : 'Hotel Amara';

    if (lightboxImg) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = imgAlt;
    }
    if (lightboxTitle) lightboxTitle.textContent = titleText;
    if (lightboxCategory) lightboxCategory.textContent = categoryText;
    if (lightboxCounter) lightboxCounter.textContent = `${currentActiveIndex + 1} / ${visibleCards.length}`;

    if (lightboxInquireBtn) {
      const encodedMsg = encodeURIComponent(`Hello Hotel Amara, I am inquiring about the ${titleText} seen in your gallery.`);
      lightboxInquireBtn.href = `https://wa.me/917518884446?text=${encodedMsg}`;
    }
  }

  function openLightbox(clickedCard) {
    const visibleCards = getVisibleCards();
    const index = visibleCards.indexOf(clickedCard);
    if (index === -1) return;

    showLightboxImage(index);

    if (lightboxModal) {
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Attach card click handlers
  galleryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Avoid redirect if clicking an explicit inner link
      if (e.target.tagName.toLowerCase() === 'a') return;
      openLightbox(card);
    });
  });

  // Modal controls
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentActiveIndex - 1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentActiveIndex + 1);
    });
  }

  // Backdrop click to close
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-dialog')) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showLightboxImage(currentActiveIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showLightboxImage(currentActiveIndex + 1);
    }
  });

});
