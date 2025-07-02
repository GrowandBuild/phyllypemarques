// Menu mobile toggle - Versão simplificada e garantida
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const overlay = document.getElementById('menuOverlay');
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    
    console.log('Menu elements found:', {
        hamburger: hamburger,
        navMenu: navMenu,
        overlay: overlay
    });
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hamburger clicked!');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (overlay) {
                overlay.classList.toggle('active');
            }
            
            // Toggle body scroll
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fechar menu ao clicar no overlay
        if (overlay) {
            overlay.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
        
        // Fechar menu com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
        
        console.log('Menu event listeners added successfully!');
    } else {
        console.error('Menu elements not found!');
    }

    // Dropdowns responsivos
    function isDesktop() {
        return window.innerWidth >= 992;
    }

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        // Desktop: hover
        dropdown.addEventListener('mouseenter', function() {
            if (isDesktop()) {
                dropdown.classList.add('open');
            }
        });
        dropdown.addEventListener('mouseleave', function() {
            if (isDesktop()) {
                dropdown.classList.remove('open');
            }
        });

        // Mobile: click
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (!isDesktop()) {
                    e.preventDefault();
                    dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('open'); });
                    dropdown.classList.toggle('open');
                }
            });
        }
    });

    // Fecha dropdown ao clicar fora (mobile)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });
});

// Filtro do cardápio
const categoryButtons = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class de todos os botões
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active class ao botão clicado
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        menuItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                item.classList.add('fade-in-up');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in-up');
            }
        });
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada dos elementos (modo lite, suave)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.menu-item, .gallery-item, .stat, .contact-item, .curriculo-section');
    animatedElements.forEach(el => observer.observe(el));
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simular envio do formulário
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de envio
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Galeria com lightbox (simples)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        
        // Criar lightbox
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Fechar lightbox ao clicar
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        // Fechar com ESC
        document.addEventListener('keydown', function closeLightbox(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
                document.removeEventListener('keydown', closeLightbox);
            }
        });
    });
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observar estatísticas para animação
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Validação de formulário em tempo real
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remover classes de erro anteriores
    field.classList.remove('error');
    
    // Validações específicas
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Email inválido';
        }
    }
    
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Telefone inválido';
        }
    }
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }
    
    // Aplicar resultado da validação
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
        
        // Mostrar mensagem de erro
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #e74c3c;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            `;
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
    } else {
        field.style.borderColor = '#27ae60';
        
        // Remover mensagem de erro
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// Loading suave da página
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Tooltip para preços
const prices = document.querySelectorAll('.price');

prices.forEach(price => {
    price.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Preço por porção';
        tooltip.style.cssText = `
            position: absolute;
            background: #2c3e50;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        price.style.position = 'relative';
        price.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
    });
    
    price.addEventListener('mouseleave', () => {
        const tooltip = price.querySelector('div');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Inicializar apenas o menu moderno ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // O menu já está sendo inicializado no início do arquivo
    // initChefPortrait(); // REMOVIDO
});

console.log('Site do Paulo o Cozinheiro carregado com sucesso! 🍳');

// Efeito de texto digitado na hero
const typedText = document.getElementById('typed-text');
const phrases = [
    'Chef Executivo',
    'Especialista em Alta Gastronomia',
    'Consultor Gastronômico',
    'Criador de Experiências Únicas'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 70;
let pauseTime = 1200;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 400);
        } else {
            setTimeout(typeEffect, typingSpeed / 2);
        }
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
        } else {
            setTimeout(typeEffect, typingSpeed);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typedText) typeEffect();
});

// Lightbox para imagens do cardápio
const menuImages = document.querySelectorAll('.menu-item-image img');
menuImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            cursor: pointer;
        `;
        const lightboxImg = document.createElement('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.cssText = `
            max-width: 95vw;
            max-height: 90vh;
            border-radius: 16px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.7);
            background: #fff;
        `;
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        document.addEventListener('keydown', function closeLightbox(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
                document.removeEventListener('keydown', closeLightbox);
            }
        });
    });
}); 