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
    /** WhatsApp click-to-chat: country code + number, no + or spaces (same line as phone above) */
    whatsappE164:    '60102502525',
    whatsappMessage: 'Hello, I would like to discuss a project with PPC Construction. Please connect me with the project manager.',
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

    const whatsappHref =
      'https://wa.me/' +
      company.whatsappE164 +
      '?text=' +
      encodeURIComponent(company.whatsappMessage);

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
                <a href="#" class="social-icon social-icon-facebook" aria-label="Facebook">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href="#" class="social-icon social-icon-outline social-icon-instagram" aria-label="Instagram">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" class="social-icon social-icon-linkedin" aria-label="LinkedIn">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="${whatsappHref}" class="social-icon social-icon-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp — discuss a project" title="WhatsApp: discuss a project">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
