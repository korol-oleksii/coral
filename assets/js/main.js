//ініціалізуємо fancybox v5xx
Fancybox.bind('[data-fancybox]', {
    Thumbs : {
        type: "classic"//робимо класичні мініатюри (modern)
    },
});

//init header slider
const mainSlider = new Swiper('.main-slider', {
    // loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

//init products slider
const productSlider = new Swiper('.product-slider', {
    slidesPerView: 4,
    direction: getDirection(),
    navigation: {
        nextEl: '.card-button-next',
        prevEl: '.card-button-prev',
    },
    on: {
        resize: function () {
            productSlider.changeDirection(getDirection());
        },
    },
});

function getDirection() {
    let windowWidth = window.innerWidth;
    let direction = window.innerWidth <= 600 ? 'vertical' : 'horizontal';

    return direction;
}