document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Swiper
    const swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        loop: true,
    });

    // Inicializar AOS (Animações ao rolar a página)
    AOS.init();

    // Consumir API para serviços
    fetch('https://api.example.com/services')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os serviços');
            }
            return response.json();
        })
        .then(data => {
            const serviceContainer = document.getElementById('service-cards');
            data.services.forEach(service => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `<h3>${service.name}</h3><p>${service.description}</p>`;
                serviceContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
            document.getElementById('service-cards').innerHTML = '<p>Erro ao carregar os serviços. Tente novamente mais tarde.</p>';
        });

    // Consumir API para depoimentos
    fetch('https://api.example.com/testimonials')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os depoimentos');
            }
            return response.json();
        })
        .then(data => {
            const testimonialContainer = document.getElementById('testimonials');
            data.testimonials.forEach(testimonial => {
                const testimonialElement = document.createElement('div');
                testimonialElement.classList.add('testimonial');
                testimonialElement.innerHTML = `
                    <img src="https://via.placeholder.com/50" alt="${testimonial.name}">
                    <div>
                        <p>${testimonial.text}</p>
                        <h4>${testimonial.name}</h4>
                    </div>`;
                testimonialContainer.appendChild(testimonialElement);
            });
        })
        .catch(error => {
            console.error(error);
            document.getElementById('testimonials').innerHTML = '<p>Erro ao carregar os depoimentos. Tente novamente mais tarde.</p>';
        });
});
