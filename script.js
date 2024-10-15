// Inicializando o Swiper para o carrossel principal
var mainSwiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    // },

    keyboard: {
        enabled: true,
    },
    a11y: {
        prevSlideMessage: 'Slide anterior',
        nextSlideMessage: 'Próximo slide',
        firstSlideMessage: 'Este é o primeiro slide',
        lastSlideMessage: 'Este é o último slide',
    },
});

// Inicializando o Swiper para os depoimentos
var testimonialSwiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: true,
    loop: true,
    spaceBetween: 20,
    keyboard: true,
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
});

// Animação de fade-in ao rolar a página
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toggle do menu mobile
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
    } else {
    navbarCollapse.classList.remove('show');

    }
});

// Fechar o menu mobile ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link'); 

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');

            console.log("existe nav collapse")
        }
    });
});

// Lazy loading para imagens
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores que não suportam lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Adicionar funcionalidade de busca
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Implemente a lógica de busca aqui
    console.log(`Pesquisando por: ${searchTerm}`);
    // Limpar o campo de busca
    searchInput.value = '';
});

// Adicionar interatividade aos produtos
const productCategories = document.querySelectorAll('.product-category');

productCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Implemente a lógica para exibir mais detalhes ou redirecionar para a página da categoria
        console.log(`Categoria clicada: ${category.querySelector('h3').textContent}`);
    });
});

// Implementar um sistema de notificações
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Exemplo de uso da notificação
document.querySelector('.whatsapp-btn').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Iniciando conversa no WhatsApp...');
});

