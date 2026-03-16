/**
 * PPC Construction – Shared Components
 * Injects navbar and footer into every page. Head (title, meta, favicon) is in each page's HTML.
 * To update nav or footer, edit ONLY this file.
 */

(function () {
  /* ──────────────────────────────────────────
     DETECT ACTIVE PAGE (used for nav highlight)
  ────────────────────────────────────────── */
  const pathSegment = (window.location.pathname.split('/').filter(Boolean).pop() || '').toLowerCase();
  const currentPage = pathSegment === '' ? 'index.html' : (pathSegment.endsWith('.html') ? pathSegment : pathSegment + '.html');

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
    logo:    'images/company-logo.png',
    tagline: 'Building quality structures, enriching communities. Your trusted partner for exceptional construction services.',
    address: '52, Jalan Bunga Melur 12, Taman Muda <br>68000 Ampang, Selangor',
    phone:   '(+60)10-250 2525',
    email:   'ppc.construction.my@gmail.com',
    year:    new Date().getFullYear(),
  };

  /* ──────────────────────────────────────────
     BUILD NAVBAR
  ────────────────────────────────────────── */
  function buildNavbar() {
    const liItems = navLinks.map(link => {
      const isActive = (currentPage === link.href || currentPage === link.href.toLowerCase()) ? ' active' : '';
      return `
        <li class="nav-item">
          <a class="nav-link${isActive}" href="${link.href}">${link.name}</a>
        </li>`;
    }).join('');

    return `
      <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
          <a class="navbar-brand" href="index.html">
            <img src="${company.logo}" alt="${company.name}" class="navbar-logo">
          </a>
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
              <a href="index.html" class="footer-logo-link">
                <img src="${company.logo}" alt="${company.name}" class="footer-logo">
              </a>
              <p style="color: rgba(255,255,255,0.7); font-size: 0.875rem; margin-top: 1rem;">${company.tagline}</p>
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
                <a href="#" class="social-icon social-icon-outline" aria-label="Instagram">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" class="social-icon" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
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
                <a href="privacy-policy.html" class="me-3">Privacy Policy</a>
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
