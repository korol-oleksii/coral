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
    return windowWidth <= 600 ? 'vertical' : 'horizontal';
}

//open dropMenu
function toggleDropMenu() {
    let toggleDropButton = document.querySelectorAll('[data-drop]');
    
    for (let a = 0; a < toggleDropButton.length; a++) {
        let dataDrop = toggleDropButton[a].getAttribute('data-drop');

        toggleDropButton[a].onclick = function () {
            this.classList.toggle('is-active');

            let toggleDropBox = document.querySelectorAll(`[data-drop-box="${dataDrop}"]`)[0];
            toggleDropBox.classList.toggle('is-hidden');
            toggleDropBox.classList.toggle('is-active');
        }
        document.querySelector('.overlay').addEventListener('click', function(){
            this.classList.remove('is-active');
        });
    }
}
toggleDropMenu();

//scroll to up
document.querySelector('.btn-scroll-top').addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});