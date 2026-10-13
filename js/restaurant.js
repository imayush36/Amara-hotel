/**
 * AMARA HOTEL & RESTAURANT — DEDICATED DINING PAGE SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE DRAWER NAVIGATION
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const drawerBackdrop = document.getElementById('mobile-drawer-backdrop') || document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (mobileNavDrawer) {
      mobileNavDrawer.classList.add('drawer-open');
      mobileNavDrawer.classList.add('active');
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
      mobileNavDrawer.classList.remove('drawer-open');
      mobileNavDrawer.classList.remove('active');
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

  // Mobile drawer accordion
  const drawerDropdownHeader = document.querySelector('.drawer-dropdown-header');
  if (drawerDropdownHeader) {
    drawerDropdownHeader.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = drawerDropdownHeader.closest('.drawer-dropdown-item');
      if (parent) parent.classList.toggle('active');
    });
  }

  // 2. STICKY NAVBAR SCROLL CLASS
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

  // 3. FLOATING BACK TO TOP
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

  // 4. MENU CATEGORY FILTER TABS
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  const dishCards = document.querySelectorAll('.dish-card');

  if (filterButtons.length && dishCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active class toggle
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        dishCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInCard 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. TABLE RESERVATION FORM -> WHATSAPP
  const tableForm = document.getElementById('restaurant-table-form');
  if (tableForm) {
    // Set default reservation date to Today
    const dateInput = document.getElementById('table-date');
    if (dateInput && !dateInput.value) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
    }

    tableForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('table-name')?.value || 'Valued Guest';
      const phone = document.getElementById('table-phone')?.value || '';
      const date = document.getElementById('table-date')?.value || '';
      const timeSlot = document.getElementById('table-time')?.value || 'Dinner (08:00 PM)';
      const guests = document.getElementById('table-guests')?.value || '2 Persons';
      const seating = document.getElementById('table-seating')?.value || 'Main Dining Hall';
      const occasion = document.getElementById('table-occasion')?.value || 'Casual Dining';
      const notes = document.getElementById('table-notes')?.value || 'None';
      const bookingId = '#AR-' + Math.floor(100000 + Math.random() * 900000);

      const waText = `Hello Amara Restaurant & Hotel!\n\n` +
        `🍽️ *AMARA RESTAURANT TABLE RESERVATION*\n` +
        `• *Booking Reference:* ${bookingId}\n` +
        `• *Guest Name:* ${name}\n` +
        `• *Phone / WhatsApp:* ${phone}\n` +
        `• *Reservation Date:* ${date}\n` +
        `• *Preferred Time Slot:* ${timeSlot}\n` +
        `• *Number of Guests:* ${guests}\n` +
        `• *Seating Preference:* ${seating}\n` +
        `• *Dining Occasion:* ${occasion}\n` +
        `• *Special Requests:* ${notes}\n\n` +
        `Please confirm our table reservation at Amara Restaurant. Thank you!`;

      const whatsappUrl = `https://wa.me/917518884446?text=${encodeURIComponent(waText)}`;

      showToast(`Opening WhatsApp for Table Reservation (${bookingId})...`);

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);
    });
  }

  // 6. DISH QUICK INQUIRY BUTTONS
  document.querySelectorAll('.dish-order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dishName = btn.getAttribute('data-dish') || 'Special Dish';
      const dishPrice = btn.getAttribute('data-price') || '';

      const waText = `Hello Amara Restaurant! I would like to inquire about ordering / table serving for:\n\n` +
        `🍲 *Item:* ${dishName} (${dishPrice})\n` +
        `Please let me know if this is available for dining/room delivery today. Thank you!`;

      const whatsappUrl = `https://wa.me/917518884446?text=${encodeURIComponent(waText)}`;
      showToast(`Connecting with Amara Restaurant for ${dishName}...`);
      window.open(whatsappUrl, '_blank');
    });
  });

  // Helper: Toast message
  function showToast(msg) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

});
