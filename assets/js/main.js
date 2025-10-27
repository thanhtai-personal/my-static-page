/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  const scriptPromises = new Map();

  const loadScript = (src) => {
    if (!src) {
      return Promise.resolve();
    }

    if (scriptPromises.has(src)) {
      return scriptPromises.get(src);
    }

    const existingScript = document.querySelector(`script[src="${src}"]`);
    const promise = new Promise((resolve, reject) => {
      const handleLoad = (event) => {
        const target = event && event.target ? event.target : existingScript;
        if (target) {
          target.setAttribute('data-loaded', 'true');
        }
        resolve();
      };

      const handleError = () => {
        reject(new Error(`Failed to load script: ${src}`));
      };

      if (existingScript) {
        if (existingScript.getAttribute('data-loaded') === 'true') {
          resolve();
        } else {
          existingScript.addEventListener('load', handleLoad, { once: true });
          existingScript.addEventListener('error', handleError, { once: true });
        }
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.addEventListener('load', handleLoad, { once: true });
      script.addEventListener('error', handleError, { once: true });
      document.head.appendChild(script);
    });

    scriptPromises.set(src, promise);
    return promise;
  };

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  const initSwiper = () => {
    if (typeof Swiper === 'undefined') {
      return;
    }

    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab") && typeof initSwiperWithCustomPagination === 'function') {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  };

  /**
   * Init isotope layout and filters
   */
  const initIsotopeLayouts = () => {
    if (typeof imagesLoaded !== 'function' || typeof Isotope === 'undefined') {
      return;
    }

    document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope;
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
        filters.addEventListener('click', function () {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  };

  /**
   * Initiate glightbox
   */
  const initLightbox = () => {
    if (typeof GLightbox !== 'function') {
      return;
    }

    GLightbox({
      selector: '.glightbox'
    });
  };

  const initPortfolioFeatures = () => {
    if (initPortfolioFeatures.initialized) {
      return;
    }

    initLightbox();
    initIsotopeLayouts();
    initSwiper();
    initPortfolioFeatures.initialized = true;
  };

  const setupPortfolioEnhancements = () => {
    const portfolioSection = document.querySelector('#portfolio');
    const requiresIsotope = document.querySelector('.isotope-layout');
    const requiresLightbox = document.querySelector('.glightbox');
    const requiresSwiper = document.querySelector('.init-swiper');

    if (!portfolioSection || (!requiresIsotope && !requiresLightbox && !requiresSwiper)) {
      return;
    }

    const scriptLoaders = [];

    if (requiresIsotope) {
      scriptLoaders.push(loadScript('assets/vendor/imagesloaded/imagesloaded.pkgd.min.js'));
      scriptLoaders.push(loadScript('assets/vendor/isotope-layout/isotope.pkgd.min.js'));
    }

    if (requiresLightbox) {
      scriptLoaders.push(loadScript('assets/vendor/glightbox/js/glightbox.min.js'));
    }

    if (requiresSwiper) {
      scriptLoaders.push(loadScript('assets/vendor/swiper/swiper-bundle.min.js'));
    }

    let requested = false;
    let handleScroll;

    const activatePortfolio = () => {
      if (requested) {
        return;
      }

      requested = true;
      if (handleScroll) {
        window.removeEventListener('scroll', handleScroll);
      }

      Promise.all(scriptLoaders).then(() => {
        initPortfolioFeatures();
      }).catch((error) => {
        console.error('Failed to load portfolio scripts', error);
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            obs.disconnect();
            activatePortfolio();
          }
        });
      }, { rootMargin: '200px' });

      observer.observe(portfolioSection);
    } else {
      window.addEventListener('load', activatePortfolio, { once: true });
    }

    handleScroll = () => {
      if (requested) {
        window.removeEventListener('scroll', handleScroll);
        return;
      }

      const rect = portfolioSection.getBoundingClientRect();
      if (rect.top - window.innerHeight <= 200) {
        window.removeEventListener('scroll', handleScroll);
        activatePortfolio();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (window.location.hash && portfolioSection.matches(window.location.hash)) {
      activatePortfolio();
    }
  };

  setupPortfolioEnhancements();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

function handleExpand(id, height) {
  const containerElement = document.getElementById(id);
  if (containerElement) {
    if (containerElement.classList.contains("show")) {
      containerElement.style.height = `${containerElement.scrollHeight}px`; // Set the current height
      // Trigger the transition by setting height to 0
      setTimeout(() => {
        containerElement.style.height = `${height || 0}px`;
      });
      containerElement.classList.remove("show");
    } else {
      containerElement.style.height = `${height || 0}px`; // Reset height to ensure smooth transition
      containerElement.classList.add("show");
      setTimeout(() => {
        containerElement.style.height = `${containerElement.scrollHeight}px`;
      });
    }
  }
}

// discover more
function showButtons() {
  const hiddenButtons = document.getElementById('hiddenButtons');
  hiddenButtons.classList.add('active');
}

function matrix() {
  const rows = 30; // Number of rows
  const columns = 300; // Number of columns
  const matrix = document.getElementById('matrix');

  // Generate rows
  for (let i = 0; i < rows; i++) {
    const row = document.createElement('div');
    row.classList.add('m-row');

    // Generate a string of random numbers for the row
    let rowContent = '';
    for (let j = 0; j < columns; j++) {
      rowContent += Math.floor(Math.random() * 2); // Random number 0 or 1
    }

    row.textContent = rowContent;
    row.style.animationDuration = `${Math.random() * 2 + 10}s`;
    row.style.animationDelay = `${Math.random() * 5}s`;
    matrix.appendChild(row);
  }
}
matrix();