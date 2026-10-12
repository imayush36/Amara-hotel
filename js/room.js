/**
 * AMARA HOTEL — DEDICATED ROOM CATEGORY PAGES SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. MOBILE DRAWER NAVIGATION
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openDrawer() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Mobile drawer accordion
  const drawerDropdownHeader = document.querySelector('.drawer-dropdown-header');
  if (drawerDropdownHeader) {
    drawerDropdownHeader.addEventListener('click', () => {
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

  // 4. SIDEBAR DEDICATED RESERVATION FORM -> WHATSAPP
  const sidebarForm = document.getElementById('room-sidebar-form');
  if (sidebarForm) {
    // Set default dates (Today & 2 days later)
    const checkinInput = document.getElementById('sidebar-checkin');
    const checkoutInput = document.getElementById('sidebar-checkout');
    
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 2);
    
    const formatYMD = (d) => d.toISOString().split('T')[0];
    if (checkinInput && !checkinInput.value) checkinInput.value = formatYMD(today);
    if (checkoutInput && !checkoutInput.value) checkoutInput.value = formatYMD(futureDate);

    sidebarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const roomName = document.getElementById('sidebar-room-name')?.value || document.title.split('|')[0].trim();
      const name = document.getElementById('sidebar-name')?.value || 'Guest';
      const phone = document.getElementById('sidebar-phone')?.value || '';
      const checkin = checkinInput?.value || '';
      const checkout = checkoutInput?.value || '';
      const guests = document.getElementById('sidebar-guests')?.value || '2 Adults';
      const bookingId = '#AH-' + Math.floor(100000 + Math.random() * 900000);

      // Calculate nights
      let nightsText = '';
      if (checkin && checkout) {
        const d1 = new Date(checkin);
        const d2 = new Date(checkout);
        const diffDays = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
          nightsText = `• *Duration:* ${diffDays} Night${diffDays > 1 ? 's' : ''}\n`;
        }
      }

      let waText = `Hello Hotel Amara! I would like to book a stay.\n\n` +
        `🏨 *ROOM RESERVATION REQUEST*\n` +
        `• *Booking ID:* ${bookingId}\n` +
        `• *Room Category:* ${roomName}\n` +
        `• *Guest Name:* ${name}\n` +
        `• *Phone / WhatsApp:* ${phone}\n` +
        `• *Check-in Date:* ${checkin}\n` +
        `• *Check-out Date:* ${checkout}\n` +
        nightsText +
        `• *Guests:* ${guests}\n\n` +
        `Please confirm room availability and booking for this category. Thank you!`;

      const whatsappUrl = `https://wa.me/917518884446?text=${encodeURIComponent(waText)}`;

      // Toast notification
      showToast(`Opening WhatsApp for ${roomName} booking...`);

      // Directly open WhatsApp
      window.open(whatsappUrl, '_blank');
    });
  }

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
