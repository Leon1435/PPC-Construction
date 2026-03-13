/**
 * PPC Construction – Shared Components
 * Injects the navbar and footer into every page automatically.
 * To update nav or footer, edit ONLY this file.
 */

(function () {
  /* ──────────────────────────────────────────
     NAV LINKS CONFIG
     Add, remove, or rename links here.
  ────────────────────────────────────────── */
  const navLinks = [
    { name: 'HOME',     href: 'index.html'    },
    { name: 'SERVICES', href: 'services.html' },
    { name: 'OUR WORK', href: 'our-work.html' },
    { name: 'ABOUT US', href: 'about-us.html' },
    { name: 'GUIDE',    href: 'guide.html'    },
    { name: 'CONTACT',  href: 'contact.html'  },
    { name: 'ENQUIRY',  href: 'enquiry.html'  },
  ];

  /* ──────────────────────────────────────────
     COMPANY CONFIG
     Change brand, contact info here once.
  ────────────────────────────────────────── */
  const company = {
    name:    'PPC CONSTRUCTION',
    tagline: 'Building quality structures, enriching communities. Your trusted partner for exceptional construction services.',
    address: '123 Construction Ave<br>Your City, State 00000',
    phone:   '(000) 000-0000',
    email:   'info@ppcconstruction.com',
    year:    new Date().getFullYear(),
  };

  /* ──────────────────────────────────────────
     DETECT ACTIVE PAGE
  ────────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  /* ──────────────────────────────────────────
     BUILD NAVBAR
  ────────────────────────────────────────── */
  function buildNavbar() {
    const liItems = navLinks.map(link => {
      const isActive = currentPage === link.href ? ' active' : '';
      return `
        <li class="nav-item">
          <a class="nav-link${isActive}" href="${link.href}">${link.name}</a>
        </li>`;
    }).join('');

    return `
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
          <a class="navbar-brand" href="index.html">${company.name}</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
              ${liItems}
            </ul>
          </div>
        </div>
      </nav>`;
  }

  /* ──────────────────────────────────────────
     BUILD FOOTER
  ────────────────────────────────────────── */
  function buildFooter() {
    const quickLinks = navLinks.slice(0, 4).map(link =>
      `<li class="mb-2"><a href="${link.href}">${link.name.charAt(0) + link.name.slice(1).toLowerCase()}</a></li>`
    ).join('');

    return `
      <footer class="footer">
        <div class="container">
          <div class="row">

            <!-- Brand -->
            <div class="col-md-3 mb-4">
              <h3 class="footer-brand">${company.name}</h3>
              <p style="color: rgba(255,255,255,0.7); font-size: 0.875rem;">${company.tagline}</p>
            </div>

            <!-- Quick Links -->
            <div class="col-md-3 mb-4">
              <h4>Quick Links</h4>
              <ul class="list-unstyled">${quickLinks}</ul>
            </div>

            <!-- Contact -->
            <div class="col-md-3 mb-4">
              <h4>Contact</h4>
              <ul class="list-unstyled">
                <li class="mb-2" style="color:rgba(255,255,255,0.7);font-size:0.875rem;">${company.address}</li>
                <li class="mb-2" style="color:rgba(255,255,255,0.7);font-size:0.875rem;">${company.phone}</li>
                <li class="mb-2" style="color:rgba(255,255,255,0.7);font-size:0.875rem;">${company.email}</li>
              </ul>
            </div>

            <!-- Social -->
            <div class="col-md-3 mb-4">
              <h4>Follow Us</h4>
              <div class="mb-3">
                <a href="#" class="social-icon" aria-label="Facebook">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" class="social-icon" aria-label="Instagram">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" class="social-icon" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
              <a href="enquiry.html" class="btn-primary-custom">START PROJECT</a>
            </div>

          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div class="container">
            <div class="row">
              <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <p class="mb-0">&copy; ${company.year} PPC Construction. All rights reserved.</p>
              </div>
              <div class="col-md-6 text-center text-md-end">
                <a href="#" class="me-3">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>`;
  }

  /* ──────────────────────────────────────────
     INJECT
  ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    const navSlot    = document.getElementById('navbar-placeholder');
    const footerSlot = document.getElementById('footer-placeholder');

    if (navSlot)    navSlot.outerHTML    = buildNavbar();
    if (footerSlot) footerSlot.outerHTML = buildFooter();
  });
})();
