document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ENTRADA DO HEADER ---
    const compassLogo = document.getElementById('compass-logo');
    const navItems = document.querySelectorAll('.nav-item');
    const navLine = document.getElementById('nav-line');

    if(compassLogo) compassLogo.classList.add('spin-entrance');
    
    setTimeout(() => {
        if(navLine) navLine.style.opacity = "1";
        navItems.forEach((item, index) => {
            setTimeout(() => { item.classList.add('show-item'); }, index * 80);
        });
    }, 600);

    // --- 2. TYPING EFFECT OTIMIZADO ---
    const textToType = "Sistemas Inteligentes para Negócios Reais.";
    const typingElement = document.getElementById("typing-title");
    let charIndex = 0;

    function typeWriter() {
        if (!typingElement) return;
        if (charIndex < textToType.length) {
            typingElement.innerHTML = textToType.substring(0, charIndex + 1) + '<span class="cursor"></span>';
            charIndex++;
            setTimeout(typeWriter, 45); 
        } else {
            typingElement.innerHTML = textToType + '<span class="cursor"></span>';
        }
    }
    requestAnimationFrame(() => setTimeout(typeWriter, 500));

    // --- 3. SCROLL REVEAL (Eficiência Máxima) ---
    const reveals = document.querySelectorAll('.reveal-hidden');
    const revealOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    reveals.forEach(reveal => revealObserver.observe(reveal));

    // --- 4. 3D TILT COM DEBOUNCE VISUAL ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -12; 
                const rotateY = ((x - centerX) / centerX) * 12;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(56, 189, 248, 0.15)`; 
            });
        });

        card.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                card.style.boxShadow = `0 8px 20px rgba(0,0,0,0.04)`;
                card.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease-out';
            });
        });

        card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
    });

    // --- 5. DARK MODE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    if(themeToggleBtn) themeToggleBtn.innerText = currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggleBtn.innerText = newTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        });
    }

    // --- 6. NAVEGAÇÃO DA SETA & BÚSSOLA ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a, .logo-link");
    const movingArrow = document.querySelector(".moving-arrow");
    const navContainer = document.querySelector(".nav-container");

    function moveArrowToLink(link) {
        if (!link || !movingArrow || window.innerWidth <= 768) return; 
        const linkRect = link.getBoundingClientRect();
        const navRect = navContainer.getBoundingClientRect();
        const centerPosition = (linkRect.left - navRect.left) + (linkRect.width / 2);
        movingArrow.style.transform = `translateX(${centerPosition - 12}px) translateZ(0)`;
        movingArrow.style.opacity = "1";
    }

    const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeLink = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
                moveArrowToLink(activeLink);
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(sec => menuObserver.observe(sec));
    
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", (e) => moveArrowToLink(e.target));
        link.addEventListener("focus", (e) => moveArrowToLink(e.target)); 
    });

    const btnCompass = document.getElementById('btn-compass');
    function handleOrientation(event) {
        let heading = event.webkitCompassHeading || Math.abs(event.alpha - 360);
        if (heading && compassLogo) {
            requestAnimationFrame(() => {
                compassLogo.style.transform = `rotate(${heading + 180}deg) translateZ(0)`;
                if(btnCompass) {
                    btnCompass.innerText = "✓ Ativa";
                    btnCompass.style.borderColor = "var(--conversion)";
                }
            });
        }
    }

    if(btnCompass) {
        btnCompass.addEventListener('click', () => {
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission().then(state => {
                    if (state === 'granted') window.addEventListener('deviceorientation', handleOrientation, true);
                }).catch(console.error);
            } else {
                window.addEventListener('deviceorientation', handleOrientation, true);
                btnCompass.innerText = "✓ Ativa";
            }
        });
    }

    // --- 7. LANTERNA GLOBAL ---
    const globalSpotlight = document.getElementById('global-spotlight');
    let isLightMoving = false;

    if(globalSpotlight) {
        document.addEventListener('mousemove', (e) => {
            if (!isLightMoving) {
                requestAnimationFrame(() => {
                    globalSpotlight.style.setProperty('--mouse-x', `${e.clientX}px`);
                    globalSpotlight.style.setProperty('--mouse-y', `${e.clientY}px`);
                    isLightMoving = false;
                });
                isLightMoving = true;
            }
        }, { passive: true }); 
    }

    // --- 8. BOTÃO MAGNÉTICO ---
    const magneticWrap = document.querySelector('.magnetic-wrap');
    const magneticBtn = document.querySelector('.magnetic-btn');
    const btnText = document.querySelector('.btn-text');

    if(magneticWrap && magneticBtn && btnText) {
        magneticWrap.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                const rect = magneticWrap.getBoundingClientRect();
                const x = (e.clientX - rect.left) - (rect.width / 2);
                const y = (e.clientY - rect.top) - (rect.height / 2);

                magneticBtn.style.transition = 'none';
                btnText.style.transition = 'none';
                magneticBtn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
                btnText.style.transform = `translate3d(${x * 0.15}px, ${y * 0.15}px, 0)`;
            });
        });

        magneticWrap.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                magneticBtn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                btnText.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                magneticBtn.style.transform = `translate3d(0px, 0px, 0)`;
                btnText.style.transform = `translate3d(0px, 0px, 0)`;
            });
        });
    }

    // --- 9. MENU HAMBURGER (A Gaveta Mobile) ---
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navContainerMobile = document.querySelector('.nav-container');
    const navLinksMobile = document.querySelectorAll('.nav-item a, .logo-link');

    if(hamburgerBtn && navContainerMobile) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navContainerMobile.classList.toggle('menu-open');
        });

        navLinksMobile.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navContainerMobile.classList.remove('menu-open');
            });
        });
    }
});