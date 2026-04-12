/**
 * PPC Construction – Shared Components
 * Injects navbar and footer into every page. Head (title, meta, favicon) is in each page's HTML.
 * Client-editable contact & social links: public/site-settings.txt (plain text, KEY=value).
 * Enquiry form emails: Web3Forms (https://web3forms.com) — set ENQUIRY_WEB3FORMS_ACCESS_KEY in site settings.
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

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, '&#39;');
  }

  /** Defaults used if site-settings.txt is missing or a key is omitted */
  function getDefaultCompany() {
    return {
      name:    'PPC CONSTRUCTION',
      logo:    'images/company-logo.png',
      tagline: 'Building quality structures, enriching communities. Your trusted partner for exceptional construction services.',
      address: '52, Jalan Bunga Melur 12, Taman Muda <br>68000 Ampang, Selangor',
      phone:   '(+60)10-250 2525',
      email:   'ppc.construction.my@gmail.com',
      year:    new Date().getFullYear(),
      whatsappE164:    '60102502525',
      whatsappMessage: 'Hello, I would like to discuss a project with PPC Construction. Please connect me with the project manager.',
      facebookUrl:  '',
      instagramUrl: '',
      linkedinUrl:  '',
      mapEmbedUrl:
        'https://www.google.com/maps?q=52+Jalan+Bunga+Melur+12,+Taman+Muda,+68000+Ampang,+Selangor,+Malaysia&output=embed',
      businessHours: 'Mon - Fri: 9:00 AM - 6:00 PM<br>Sat: 10:00 AM - 4:00 PM<br>Sun: Closed',
      enquiryWeb3formsAccessKey: '',
      enquiryEmailSubject: 'New project enquiry',
    };
  }

  /**
   * Parses site-settings.txt: one KEY=value per line; # starts a comment; first = splits key/value.
   */
  function parseSiteSettings(text, base) {
    const out = Object.assign({}, base);
    const lines = text.split(/\r?\n/);
    const keyMap = {
      COMPANY_NAME: 'name',
      LOGO_PATH: 'logo',
      TAGLINE: 'tagline',
      ADDRESS: 'address',
      PHONE: 'phone',
      EMAIL: 'email',
      WHATSAPP_NUMBER: 'whatsappE164',
      WHATSAPP_MESSAGE: 'whatsappMessage',
      FACEBOOK_URL: 'facebookUrl',
      INSTAGRAM_URL: 'instagramUrl',
      LINKEDIN_URL: 'linkedinUrl',
      MAP_EMBED_URL: 'mapEmbedUrl',
      BUSINESS_HOURS: 'businessHours',
      ENQUIRY_WEB3FORMS_ACCESS_KEY: 'enquiryWeb3formsAccessKey',
      ENQUIRY_EMAIL_SUBJECT: 'enquiryEmailSubject',
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.charAt(0) === '#') continue;
      const eq = line.indexOf('=');
      if (eq === -1) continue;
      const rawKey = line.slice(0, eq).trim().toUpperCase().replace(/-/g, '_');
      const field = keyMap[rawKey];
      if (!field) continue;
      let val = line.slice(eq + 1).trim();
      val = val.replace(/\\n/g, '\n');
      if (field === 'businessHours') {
        val = val.replace(/\n/g, '<br>');
      }
      out[field] = val;
    }
    return out;
  }

  async function loadCompanyConfig() {
    const defaults = getDefaultCompany();
    try {
      const res = await fetch('site-settings.txt', { cache: 'no-store' });
      if (!res.ok) return defaults;
      const text = await res.text();
      return parseSiteSettings(text, defaults);
    } catch (e) {
      return defaults;
    }
  }

  function socialLinkOrEmpty(href, classNames, ariaLabel, innerSvg) {
    const h = (href || '').trim();
    if (!h) return '';
    const safe = escapeAttr(h);
    return `
                <a href="${safe}" class="${classNames}" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttr(ariaLabel)}">
                  ${innerSvg}
                </a>`;
  }

  /* ──────────────────────────────────────────
     BUILD NAVBAR
  ────────────────────────────────────────── */
  function buildNavbar(company) {
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
            <img src="${escapeAttr(company.logo)}" alt="${escapeAttr(company.name)}" class="navbar-logo">
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
  function buildFooter(company) {
    const quickLinks = navLinks.slice(0, 4).map(link =>
      `<li class="mb-2"><a href="${link.href}">${link.name.charAt(0) + link.name.slice(1).toLowerCase()}</a></li>`
    ).join('');

    const waDigits = String(company.whatsappE164 || '').replace(/\D/g, '');
    const whatsappHref =
      waDigits.length > 0
        ? 'https://wa.me/' + waDigits + '?text=' + encodeURIComponent(company.whatsappMessage || '')
        : '';

    const fbSvg = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>';
    const igSvg = '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>';
    const liSvg = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>';
    const waSvg = '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

    const socialFacebook = socialLinkOrEmpty(
      company.facebookUrl,
      'social-icon social-icon-facebook',
      'Facebook',
      fbSvg
    );
    const socialInstagram = socialLinkOrEmpty(
      company.instagramUrl,
      'social-icon social-icon-outline social-icon-instagram',
      'Instagram',
      igSvg
    );
    const socialLinkedIn = socialLinkOrEmpty(
      company.linkedinUrl,
      'social-icon social-icon-linkedin',
      'LinkedIn',
      liSvg
    );

    const socialWhatsApp =
      waDigits.length > 0 && whatsappHref
        ? `
                <a href="${escapeAttr(whatsappHref)}" class="social-icon social-icon-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
                  ${waSvg}
                </a>`
        : '';

    const copyrightName = escapeHtml(company.name || 'PPC Construction');

    return `
      <footer class="footer">
        <div class="container">
          <div class="row">

            <!-- Brand -->
            <div class="col-md-3 mb-4">
              <a href="index.html" class="footer-logo-link">
                <img src="${escapeAttr(company.logo)}" alt="${escapeAttr(company.name)}" class="footer-logo">
              </a>
              <p style="color: rgba(255,255,255,0.7); font-size: 0.875rem; margin-top: 1rem;">${escapeHtml(company.tagline)}</p>
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
                <li class="mb-2" style="color:rgba(255,255,255,0.7);font-size:0.875rem;">${escapeHtml(company.phone)}</li>
                <li class="mb-2" style="color:rgba(255,255,255,0.7);font-size:0.875rem;">${escapeHtml(company.email)}</li>
              </ul>
            </div>

            <!-- Social -->
            <div class="col-md-3 mb-4">
              <h4>Follow Us</h4>
              <div class="mb-3">
                ${socialFacebook}
                ${socialInstagram}
                ${socialLinkedIn}
                ${socialWhatsApp}
              </div>
            </div>

          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div class="container">
            <div class="row">
              <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <p class="mb-0">&copy; ${company.year} ${copyrightName}. All rights reserved.</p>
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
     PAGE MOTION (scroll reveal, hero entrance, navbar shadow)
  ────────────────────────────────────────── */
  function isRoughlyVisible(el) {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.9 && r.bottom > 56;
  }

  function initNavbarScrollShadow() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const onScroll = function () {
      nav.classList.toggle('navbar-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initPageMotion() {
    initNavbarScrollShadow();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('js-motion');

    const hero = document.querySelector('section.hero-section');
    if (hero) {
      hero.classList.add('hero-motion');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          hero.classList.add('hero-motion-in');
        });
      });
    }

    const footerEl = document.querySelector('footer.footer');
    const preFooterLinked =
      footerEl &&
      footerEl.previousElementSibling &&
      footerEl.previousElementSibling.tagName === 'SECTION'
        ? footerEl.previousElementSibling
        : null;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const t = entry.target;
          t.classList.add('motion-in');
          if (preFooterLinked && t === preFooterLinked && footerEl) {
            footerEl.classList.add('motion-in');
          }
          observer.unobserve(t);
        });
      },
      { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    );

    document.querySelectorAll('body > section:not(.hero-section)').forEach(function (el) {
      el.classList.add('motion-section');
      if (el === preFooterLinked) {
        return;
      }
      if (isRoughlyVisible(el)) {
        el.classList.add('motion-in');
      } else {
        observer.observe(el);
      }
    });

    if (footerEl) {
      footerEl.classList.add('motion-section');
      if (preFooterLinked) {
        if (isRoughlyVisible(preFooterLinked)) {
          preFooterLinked.classList.add('motion-in');
          footerEl.classList.add('motion-in');
        } else {
          observer.observe(preFooterLinked);
        }
      } else {
        if (isRoughlyVisible(footerEl)) {
          footerEl.classList.add('motion-in');
        } else {
          observer.observe(footerEl);
        }
      }
    }
  }

  function applyContactPagePlaceholders(company) {
    const addr = document.getElementById('site-contact-address');
    if (addr) addr.innerHTML = company.address || '';
    const phone = document.getElementById('site-contact-phone');
    if (phone) phone.textContent = company.phone || '';
    const email = document.getElementById('site-contact-email');
    if (email) email.textContent = company.email || '';
    const hours = document.getElementById('site-contact-hours');
    if (hours) hours.innerHTML = company.businessHours || '';
    const map = document.getElementById('site-contact-map');
    if (map && company.mapEmbedUrl) map.setAttribute('src', company.mapEmbedUrl);
  }

  /** Contact page: submit opens WhatsApp with fields as plain text (uses WHATSAPP_NUMBER from site settings). */
  function initContactWhatsAppForm(company) {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const waDigits = String(company.whatsappE164 || '').replace(/\D/g, '');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!waDigits) {
        window.alert('WhatsApp number is not configured. Please use phone or email on this page.');
        return;
      }
      function field(id) {
        const el = document.getElementById(id);
        return el ? String(el.value || '').trim() : '';
      }
      const text =
        '*First Name:* ' +
        field('firstName') +
        '\n' +
        '*Last Name:* ' +
        field('lastName') +
        '\n' +
        '*Email:* ' +
        field('email') +
        '\n' +
        '*Phone:* ' +
        field('phone') +
        '\n' +
        '*Message:* ' +
        field('message');
      const url = 'https://wa.me/' + waDigits + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /**
   * Enquiry page: POST formatted body to Web3Forms; they email the address verified in the Web3Forms dashboard.
   * Requires ENQUIRY_WEB3FORMS_ACCESS_KEY in site-settings.txt (free account at https://web3forms.com).
   */
  function initEnquiryEmailForm(company) {
    const form = document.getElementById('enquiry-form');
    if (!form) return;
    const accessKey = String(company.enquiryWeb3formsAccessKey || '').trim();
    const subjectLine = String(company.enquiryEmailSubject || 'New project enquiry').trim() || 'New project enquiry';
    const statusEl = document.getElementById('enquiry-form-status');
    const submitBtn = document.getElementById('enquiry-submit-btn');

    const projectTypeLabels = {
      residential: 'New Residential Build',
      commercial: 'New Commercial Build',
      renovation: 'Full Renovation',
      extension: 'Extension / Addition',
      'fit-out': 'Fit-Out',
      other: 'Other',
    };
    const budgetLabels = {
      '10-25k': 'RM 10,000 - RM 25,000',
      '25-50k': 'RM 25,000 - RM 50,000',
      '50-100k': 'RM 50,000 - RM 100,000',
      '100k+': 'RM 100,000+',
      flexible: 'Flexible',
    };
    const timelineLabels = {
      asap: 'As soon as possible',
      '1-3': '1-3 months',
      '3-6': '3-6 months',
      '6+': '6+ months',
      flexible: 'Flexible',
    };
    const referralLabels = {
      search: 'Search Engine',
      social: 'Social Media',
      referral: 'Referral',
      advertisement: 'Advertisement',
      other: 'Other',
    };

    function val(id) {
      const el = document.getElementById(id);
      return el ? String(el.value || '').trim() : '';
    }
    function selectDisplay(id, map) {
      const v = val(id);
      return map[v] != null ? map[v] : v;
    }
    function yn(id) {
      const el = document.getElementById(id);
      return el && el.checked ? 'Yes' : 'No';
    }

    /** HTML email body: bold labels via &lt;strong&gt;, values escaped. */
    function buildEnquiryEmailHtml() {
      const br = '<br>';
      function line(label, valueHtml) {
        return '<strong>' + label + '</strong> ' + valueHtml;
      }
      const descHtml = escapeHtml(val('description')).replace(/\r\n/g, '\n').replace(/\n/g, '<br>');
      const parts = [
        line('First Name:', escapeHtml(val('firstName'))),
        line('Last Name:', escapeHtml(val('lastName'))),
        line('Email:', escapeHtml(val('email'))),
        line('Phone:', escapeHtml(val('phone'))),
        line('Project Type:', escapeHtml(selectDisplay('projectType', projectTypeLabels))),
        line('Property Address:', escapeHtml(val('address'))),
        line('Estimated Budget:', escapeHtml(selectDisplay('budget', budgetLabels))),
        line('Desired Timeline:', escapeHtml(selectDisplay('timeline', timelineLabels))),
        line('Project Description:', descHtml),
        line('How did you hear about us?:', escapeHtml(selectDisplay('referral', referralLabels))),
        line(
          'I would like to schedule an in-person consultation:',
          escapeHtml(yn('consultationCheck'))
        ),
      ];
      return parts.join(br);
    }

    function showEnquirySuccessModal() {
      const el = document.getElementById('enquiry-success-modal');
      if (el && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        bootstrap.Modal.getOrCreateInstance(el).show();
      } else {
        window.alert('Thank you — your enquiry was sent successfully. We will get back to you soon.');
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'text-center small mt-3 mb-0';
      }

      if (!accessKey) {
        window.alert(
          'Enquiry email is not configured yet. Add ENQUIRY_WEB3FORMS_ACCESS_KEY to site-settings.txt (free key from web3forms.com).'
        );
        return;
      }

      const bodyHtml = buildEnquiryEmailHtml();

      const fromName = (val('firstName') + ' ' + val('lastName')).trim() || 'Website enquiry';

      const payload = {
        access_key: accessKey,
        subject: subjectLine,
        from_name: fromName,
        email: val('email'),
        message: bodyHtml,
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
      }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok && result.data && result.data.success) {
            form.reset();
            if (statusEl) {
              statusEl.textContent = '';
              statusEl.className = 'text-center small mt-3 mb-0';
            }
            showEnquirySuccessModal();
          } else {
            const msg =
              (result.data && (result.data.message || result.data.error)) ||
              'Something went wrong. Please try again or contact us by phone or email.';
            window.alert(msg);
          }
        })
        .catch(function () {
          window.alert('Could not send your enquiry. Check your connection and try again.');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
          }
        });
    });
  }

  /* ──────────────────────────────────────────
     INJECT
  ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    loadCompanyConfig().then(function (company) {
      const navSlot = document.getElementById('navbar-placeholder');
      const footerSlot = document.getElementById('footer-placeholder');

      if (navSlot) navSlot.outerHTML = buildNavbar(company);
      if (footerSlot) footerSlot.outerHTML = buildFooter(company);

      applyContactPagePlaceholders(company);
      initContactWhatsAppForm(company);
      initEnquiryEmailForm(company);
      initPageMotion();
    });
  });
})();
