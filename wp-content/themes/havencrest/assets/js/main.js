document.addEventListener('DOMContentLoaded', async () => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  const close = document.querySelector('.menu-close');
  const loader = document.querySelector('.site-loader');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setMenu = (open) => {
    menu?.classList.toggle('is-open', open);
    menu?.setAttribute('aria-hidden', String(!open));
    toggle?.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  };

  toggle?.addEventListener('click', () => setMenu(true));
  close?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const chatToggle = document.querySelector('.agent-chat-toggle');
  const chatPanel = document.querySelector('.agent-chat');
  const chatClose = document.querySelector('.agent-chat__close');
  const chatForm = document.querySelector('.agent-chat__form');
  const chatBody = document.querySelector('.agent-chat__body');
  const chatMessage = chatForm?.querySelector('[name="chat_message"]');
  const chatEmail = chatForm?.querySelector('[name="chat_email"]');
  const chatSubmit = chatForm?.querySelector('button[type="submit"]');

  const setChat = (open) => {
    chatPanel?.classList.toggle('is-open', open);
    chatPanel?.setAttribute('aria-hidden', String(!open));
    chatToggle?.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('chat-open', open);
    if (open) window.setTimeout(() => chatMessage?.focus(), 320);
  };

  const appendChatMessage = (message, type) => {
    if (!chatBody) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-message chat-message--${type}`;
    const text = document.createElement('span');
    text.textContent = message;
    bubble.appendChild(text);
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  const sendChatMessage = async (message, email = '') => {
    if (!message || !window.havencrestChat) return;
    appendChatMessage(message, 'user');
    chatSubmit?.setAttribute('disabled', 'disabled');
    const payload = new URLSearchParams({ action: 'havencrest_chat', nonce: havencrestChat.nonce, message, email });
    try {
      const response = await fetch(havencrestChat.ajaxUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: payload.toString() });
      const result = await response.json();
      appendChatMessage(result?.data?.message || 'Thank you. An advisor will be in touch shortly.', 'agent');
    } catch (error) {
      appendChatMessage('We could not send that message. Please call us at (512) 555-0186.', 'agent');
    } finally {
      chatSubmit?.removeAttribute('disabled');
    }
  };

  chatToggle?.addEventListener('click', () => setChat(!chatPanel?.classList.contains('is-open')));
  chatClose?.addEventListener('click', () => setChat(false));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setChat(false); });
  chatPanel?.querySelectorAll('[data-chat-message]').forEach((button) => {
    button.addEventListener('click', () => sendChatMessage(button.dataset.chatMessage || '', chatEmail?.value || ''));
  });
  chatForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = chatMessage?.value.trim() || '';
    if (!message) return;
    chatMessage.value = '';
    sendChatMessage(message, chatEmail?.value.trim() || '');
  });

  const closePremiumSelects = (except = null) => {
    document.querySelectorAll('.premium-select.is-open').forEach((selectShell) => {
      if (selectShell === except) return;
      selectShell.classList.remove('is-open');
      selectShell.querySelector('.premium-select__trigger')?.setAttribute('aria-expanded', 'false');
    });
  };

  document.querySelectorAll('select:not([multiple])').forEach((select, selectIndex) => {
    if (select.closest('.premium-select')) return;
    const shell = document.createElement('div');
    const trigger = document.createElement('button');
    const value = document.createElement('span');
    const menu = document.createElement('div');
    const menuId = `premium-select-${selectIndex}`;
    shell.className = 'premium-select';
    trigger.className = 'premium-select__trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-controls', menuId);
    trigger.setAttribute('aria-expanded', 'false');
    value.className = 'premium-select__value';
    menu.className = 'premium-select__menu';
    menu.id = menuId;
    menu.setAttribute('role', 'listbox');
    select.parentNode.insertBefore(shell, select);
    shell.append(select, trigger, menu);
    select.classList.add('premium-select__native');
    trigger.append(value);

    const syncSelect = () => {
      value.textContent = select.options[select.selectedIndex]?.text || '';
      menu.querySelectorAll('[role="option"]').forEach((optionButton) => {
        const selected = optionButton.dataset.value === select.value;
        optionButton.classList.toggle('is-selected', selected);
        optionButton.setAttribute('aria-selected', String(selected));
      });
    };

    Array.from(select.options).forEach((option) => {
      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.className = 'premium-select__option';
      optionButton.dataset.value = option.value;
      optionButton.setAttribute('role', 'option');
      optionButton.textContent = option.text;
      optionButton.addEventListener('click', (event) => {
        event.stopPropagation();
        select.value = option.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        syncSelect();
        closePremiumSelects();
        trigger.focus();
      });
      menu.append(optionButton);
    });

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const opening = !shell.classList.contains('is-open');
      closePremiumSelects(shell);
      shell.classList.toggle('is-open', opening);
      trigger.setAttribute('aria-expanded', String(opening));
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closePremiumSelects();
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        shell.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        menu.querySelector('.is-selected, .premium-select__option')?.focus();
      }
    });
    select.addEventListener('change', syncSelect);
    select.form?.addEventListener('reset', () => window.setTimeout(syncSelect));
    window.addEventListener('havencrest:languagechange', syncSelect);
    syncSelect();
  });
  document.addEventListener('click', () => closePremiumSelects());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePremiumSelects();
  });

  const backToTop = document.querySelector('.back-to-top');
  let scrollToPageTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  const updateBackToTop = () => backToTop?.classList.toggle('is-visible', window.scrollY > 650);
  backToTop?.addEventListener('click', () => scrollToPageTop());
  updateBackToTop();
  window.addEventListener('scroll', updateBackToTop, { passive: true });

  if (!window.gsap || reduceMotion) {
    loader?.classList.add('is-hidden');
    document.querySelectorAll('.reveal, .media-reveal').forEach((element) => element.classList.add('is-visible'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const heroStage = document.querySelector('.hero__image[data-texture]');
  const canUseThree = heroStage && window.matchMedia('(min-width: 769px) and (pointer: fine)').matches;
  if (canUseThree && !window.THREE && window.havencrestChat?.threeUrl) {
	await new Promise((resolve) => {
	  const script = document.createElement('script');
	  script.src = window.havencrestChat.threeUrl;
	  script.defer = true;
	  script.onload = resolve;
	  script.onerror = resolve;
	  document.head.appendChild(script);
	});
  }
  if (canUseThree && window.THREE) {
    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 10);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
      const pointer = new THREE.Vector2();
      const pointerTarget = new THREE.Vector2();
      const imageSize = new THREE.Vector2(1, 1);
      const resolution = new THREE.Vector2(1, 1);
      const texture = new THREE.TextureLoader().load(heroStage.dataset.texture, (loadedTexture) => {
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        imageSize.set(loadedTexture.image.naturalWidth || loadedTexture.image.width, loadedTexture.image.naturalHeight || loadedTexture.image.height);
        heroStage.classList.add('is-three-ready');
      });
      const geometry = new THREE.PlaneGeometry(1, 1, 36, 24);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: pointer },
          uResolution: { value: resolution },
          uImageSize: { value: imageSize }
        },
        vertexShader: `
          varying vec2 vUv;
          uniform vec2 uMouse;
          void main() {
            vUv = uv;
            vec3 positionShift = position;
            float depth = (uv.x - 0.5) * uMouse.x + (uv.y - 0.5) * uMouse.y;
            positionShift.z += depth * 0.08;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(positionShift, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform vec2 uMouse;
          uniform vec2 uResolution;
          uniform vec2 uImageSize;
          void main() {
            float screenRatio = uResolution.x / max(uResolution.y, 1.0);
            float imageRatio = uImageSize.x / max(uImageSize.y, 1.0);
            vec2 scale = screenRatio < imageRatio ? vec2(screenRatio / imageRatio, 1.0) : vec2(1.0, imageRatio / screenRatio);
            vec2 coverUv = (vUv - 0.5) * scale + 0.5;
            coverUv += uMouse * vec2(0.052, 0.035);
            gl_FragColor = texture2D(uTexture, coverUv);
          }
        `
      });
      const heroMesh = new THREE.Mesh(geometry, material);
      scene.add(heroMesh);
      camera.position.z = 2.4;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      heroStage.appendChild(renderer.domElement);

	  let heroVisible = true;
	  let heroFrame = 0;

      const resizeHeroStage = () => {
        const width = heroStage.clientWidth;
        const height = heroStage.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        resolution.set(width, height);
        const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        heroMesh.scale.set(viewHeight * camera.aspect * 1.12, viewHeight * 1.12, 1);
      };

      const updateHeroPointer = (event) => {
        const bounds = heroStage.getBoundingClientRect();
        if (event.clientY < bounds.top || event.clientY > bounds.bottom) {
          pointerTarget.set(0, 0);
          return;
        }
        pointerTarget.set(
          ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
          -((event.clientY - bounds.top) / bounds.height - 0.5) * 2
        );
      };
      const resetHeroPointer = () => pointerTarget.set(0, 0);
      window.addEventListener('pointermove', updateHeroPointer, { passive: true });
      window.addEventListener('blur', resetHeroPointer);
      window.addEventListener('resize', resizeHeroStage, { passive: true });
      resizeHeroStage();

	  const renderHeroStage = () => {
		if (!heroVisible || document.hidden) {
			heroFrame = 0;
			return;
		}
        pointer.lerp(pointerTarget, 0.055);
        heroMesh.rotation.y = pointer.x * 0.085;
        heroMesh.rotation.x = -pointer.y * 0.052;
        camera.position.x = pointer.x * 0.072;
        camera.position.y = pointer.y * 0.04;
        renderer.render(scene, camera);
		heroFrame = window.requestAnimationFrame(renderHeroStage);
      };
	  const startHeroStage = () => {
		if (!heroFrame && heroVisible && !document.hidden) heroFrame = window.requestAnimationFrame(renderHeroStage);
	  };
	  const heroObserver = new IntersectionObserver(([entry]) => {
		heroVisible = entry.isIntersecting;
		if (heroVisible) startHeroStage();
	  }, { rootMargin: '100px' });
	  heroObserver.observe(heroStage);
	  document.addEventListener('visibilitychange', startHeroStage);
	  startHeroStage();
    } catch (error) {
      heroStage.classList.remove('is-three-ready');
    }
  }

  let lenis;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
    scrollToPageTop = () => lenis.scrollTo(0, { duration: 1.25, force: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          event.preventDefault();
          lenis.scrollTo(target, { offset: -90 });
        }
      });
    });
  }

  const loaderTimeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      loader?.classList.add('is-hidden');
      document.body.classList.add('site-ready');
      ScrollTrigger.refresh();
    }
  });

  if (loader) {
    const counter = { value: 0 };
    loaderTimeline
      .to('.site-loader__brand', { y: 0, opacity: 1, duration: 0.55 })
      .to('.site-loader__line i', { scaleX: 1, duration: 1.05, ease: 'power2.inOut' }, '-=.25')
      .to(counter, { value: 100, duration: 1.05, ease: 'power2.inOut', onUpdate: () => {
        const output = document.querySelector('.site-loader__meta strong');
        if (output) output.textContent = String(Math.round(counter.value)).padStart(2, '0');
      } }, '<')
      .to('.site-loader__inner', { y: -20, opacity: 0, duration: 0.35 })
      .to(loader, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '-=.1');
  }

  const heroTimeline = gsap.timeline({ delay: loader ? 2.35 : 0.1, defaults: { ease: 'power4.out' } });
  const animateHeroTarget = (selector, options, position) => {
    if (document.querySelector(selector)) heroTimeline.from(selector, options, position);
  };
  animateHeroTarget('.site-header__inner', { y: -25, opacity: 0, duration: 0.8 });
  animateHeroTarget('.hero .eyebrow, .page-hero .eyebrow', { y: 18, opacity: 0, duration: 0.65 }, '-=.45');
  animateHeroTarget('.hero h1, .page-hero h1', { y: 75, opacity: 0, duration: 1.15 }, '-=.4');
  animateHeroTarget('.hero__intro, .hero .button, .page-hero__index', { y: 24, opacity: 0, stagger: 0.1, duration: 0.65 }, '-=.65');
  animateHeroTarget('.property-search', { y: 45, opacity: 0, duration: 0.75 }, '-=.4');

  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.fromTo(element, { y: 45, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 87%', once: true }
    });
  });

  gsap.utils.toArray('.media-reveal').forEach((element) => {
    const image = element.querySelector('img');
    gsap.fromTo(element, { clipPath: 'inset(0 0 100% 0)' }, {
      clipPath: 'inset(0 0 0% 0)',
      duration: 1.25,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: element, start: 'top 82%', once: true }
    });
    if (image) {
      gsap.fromTo(image, { scale: 1.14 }, {
        scale: 1,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 82%', once: true }
      });
    }
  });

  gsap.utils.toArray('.property-card').forEach((card, index) => {
    gsap.from(card, {
      y: 55,
      duration: 0.9,
      delay: (index % 3) * 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%', once: true }
    });
  });

  gsap.utils.toArray('.service-split__image img, .about-story__media img, .seller-feature img, .contact-image img').forEach((image) => {
    gsap.fromTo(image, { yPercent: -6 }, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  const editorialSection = document.querySelector('.editorial-showcase');
  const editorialViewport = document.querySelector('.editorial-carousel');
  const editorialTrack = document.querySelector('.editorial-carousel__track');
  const editorialSlides = gsap.utils.toArray('.editorial-slide');
  const editorialProgress = document.querySelector('.editorial-carousel__progress i');
  const editorialCounter = document.querySelector('.editorial-carousel__count strong');
  const editorialPrevious = document.querySelector('[data-editorial-prev]');
  const editorialNext = document.querySelector('[data-editorial-next]');
  let editorialTrigger = null;
  let editorialActiveIndex = 0;

  const updateEditorialUI = (progressValue) => {
    const safeProgress = Math.max(0, Math.min(1, progressValue));
    editorialActiveIndex = Math.min(editorialSlides.length - 1, Math.round(safeProgress * (editorialSlides.length - 1)));
    if (editorialCounter) editorialCounter.textContent = String(editorialActiveIndex + 1).padStart(2, '0');
    if (editorialProgress) gsap.set(editorialProgress, { scaleX: safeProgress });
  };

  if (editorialSection && editorialViewport && editorialTrack && editorialSlides.length) {
    const editorialMedia = gsap.matchMedia();
    editorialMedia.add('(min-width: 901px)', () => {
      const editorialDistance = () => Math.max(0, editorialTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
      const setEditorialDistance = () => editorialSection.style.setProperty('--editorial-scroll-distance', `${editorialDistance()}px`);
      setEditorialDistance();
      window.addEventListener('resize', setEditorialDistance, { passive: true });
      gsap.set(editorialTrack, { force3D: true });
      const editorialTween = gsap.to(editorialTrack, {
        x: () => -editorialDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: editorialSection,
          start: 'top top',
          end: () => `+=${editorialDistance()}`,
          scrub: 1.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateEditorialUI(self.progress)
        }
      });
      editorialTrigger = editorialTween.scrollTrigger;
      return () => {
        editorialTrigger = null;
        window.removeEventListener('resize', setEditorialDistance);
        editorialSection.style.removeProperty('--editorial-scroll-distance');
        editorialTween.scrollTrigger?.kill();
      };
    });
    editorialMedia.add('(max-width: 900px)', () => {
      const updateMobileEditorial = () => {
        const maximum = editorialViewport.scrollWidth - editorialViewport.clientWidth;
        updateEditorialUI(maximum > 0 ? editorialViewport.scrollLeft / maximum : 0);
      };
      editorialViewport.addEventListener('scroll', updateMobileEditorial, { passive: true });
      return () => editorialViewport.removeEventListener('scroll', updateMobileEditorial);
    });

    const goToEditorialSlide = (direction) => {
      const targetIndex = Math.max(0, Math.min(editorialSlides.length - 1, editorialActiveIndex + direction));
      if (editorialTrigger) {
        const targetProgress = targetIndex / (editorialSlides.length - 1);
        const targetScroll = editorialTrigger.start + (editorialTrigger.end - editorialTrigger.start) * targetProgress;
        updateEditorialUI(targetProgress);
        if (lenis) lenis.scrollTo(targetScroll, { duration: 1.05, force: true, lock: false, onComplete: () => ScrollTrigger.update() });
        else window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      } else {
        editorialViewport.scrollTo({ left: editorialSlides[targetIndex].offsetLeft - 24, behavior: 'smooth' });
      }
    };
    editorialPrevious?.addEventListener('click', () => goToEditorialSlide(-1));
    editorialNext?.addEventListener('click', () => goToEditorialSlide(1));
  }

  const gallerySection = document.querySelector('.about-gallery');
  const galleryTrack = document.querySelector('.about-gallery__track');
  if (gallerySection && galleryTrack) {
    const galleryMatch = gsap.matchMedia();
    galleryMatch.add('(min-width: 901px)', () => {
      const galleryCounter = document.querySelector('.about-gallery__guide strong');
      const galleryDistance = () => Math.max(0, galleryTrack.scrollWidth - window.innerWidth + window.innerWidth * 0.07);
      const galleryTween = gsap.to(galleryTrack, {
        x: () => -galleryDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: gallerySection,
          start: 'top top',
          end: () => `+=${galleryDistance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (galleryCounter) {
              const activeCard = Math.min(5, Math.floor(self.progress * 5) + 1);
              galleryCounter.textContent = `${String(activeCard).padStart(2, '0')} — 05`;
            }
          }
        }
      });
      return () => galleryTween.scrollTrigger?.kill();
    });
  }

  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    gsap.to(marqueeTrack, {
      xPercent: -35,
      ease: 'none',
      scrollTrigger: { trigger: marqueeTrack.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
    });
  }

  gsap.utils.toArray('.stats strong, .mini-stats strong, .seller-proof__stats strong').forEach((stat) => {
    gsap.from(stat, { opacity: 0.25, y: 18, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: stat, start: 'top 90%', once: true } });
  });

  const progress = document.querySelector('.scroll-progress i');
  if (progress) {
    gsap.to(progress, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { start: 0, end: 'max', scrub: true } });
  }

  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.18, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.18, ease: 'power3' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });
    window.addEventListener('mousemove', (event) => {
      setDotX(event.clientX);
      setDotY(event.clientY);
      setRingX(event.clientX);
      setRingY(event.clientY);
    });
    document.querySelectorAll('a, button, .property-card__media').forEach((element) => {
      element.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
      element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
    });
    document.querySelectorAll('.property-card__media, .neighborhood-card').forEach((element) => {
      element.addEventListener('mouseenter', () => document.body.classList.add('cursor-view'));
      element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view'));
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
});
