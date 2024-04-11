const thumbsSlider = new Swiper(".thumbsSlider", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
const swiper2 = new Swiper(".main-slider", {
    loop: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: thumbsSlider,
    },
});


const galeryBlocks = document.querySelectorAll('.galery-block');
galeryBlocks.forEach(galeryBlock => {
    const thumbsSliderEl = galeryBlock.querySelector('.thumbs-galery-slider');
    const thumbsSlider = new Swiper(thumbsSliderEl, {
        spaceBetween: 10,
        slidesPerView: 3,
        watchSlidesProgress: true,
        breakpoints: {
            // when window width is >= 640px
            768: {
                slidesPerView: 6,
                spaceBetween: 32
            }
        }
    });

    const mainSliderEl = galeryBlock.querySelector('.main-galery-slider');
    const nextArrow = mainSliderEl.querySelector(".swiper-button-next");
    const prevArrow = mainSliderEl.querySelector(".swiper-button-prev");
    const mainSlider = new Swiper(mainSliderEl, {
        speed: 500,
        loop: true,
        spaceBetween: 10,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: nextArrow,
            prevEl: prevArrow,
        },
        thumbs: {
            swiper: thumbsSlider,
        },
    });
})




$(document).ready(function () {
    function expandParents(menuItem) {
        const parentMenuItem = menuItem.parent().closest('li.has-submenu');
        if (parentMenuItem.length) {
            const submenu = parentMenuItem.children('ul');
            if (submenu.length) {
                submenu.show();
                expandParents(parentMenuItem);
            }
        }
    }
    $('.database-menu-list a').click(function (e) {
        e.preventDefault();
        const submenu = $(this).siblings('ul');
        submenu.stop().slideToggle();
        e.stopPropagation();
        if (submenu.length) {
            $(this).toggleClass('open')
        } else {
            const menuItem = e.target;
            const parentLi = menuItem.closest('li');
            $('li.active').removeClass('active');
            $(parentLi).addClass('active');
        }
    });

    // expandParents($('[data-el]'))
    // const parentLi = $('[data-el]').closest('li');
    // $(parentLi).addClass('active');

    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
});




document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.click-plate')) {
        const clickPlate = target.closest('.click-plate');
        const databaseMenu = clickPlate.closest('.database__menu');
        clickPlate.classList.toggle('active');
        databaseMenu.classList.toggle('active');
    }
})