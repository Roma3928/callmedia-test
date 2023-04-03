"use strict";

const sliderControler = () => {
    let currentSlider = false;

    function sliderInit() {
        if (!currentSlider) {
            currentSlider = new Swiper(".effect__inner", {
                slidesPerView: "auto",
                spaceBetween: 15,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    998: {
                        slidesPerView: "auto",
                        spaceBetween: 25,
                    },
                },
            });
        }
    }

    function sliderDestroy() {
        if (currentSlider) {
            currentSlider.destroy();
            console.log(currentSlider);
            currentSlider = false;
        }
    }

    function resizeHandlerSlider() {
        if (document.body.clientWidth <= 1243) {

            const slider = document.getElementById("slider");

            slider.classList.add("swiper");
            slider.querySelector(".effect__stages").classList.add("swiper-wrapper");
            slider.querySelectorAll(".effect__stage").forEach(slide => {
                slide.classList.add("swiper-slide");
            })

            sliderInit();
        }
        else {
            sliderDestroy();
        }

    }

    resizeHandlerSlider();
}

const timerControler = () => {
    function timerInit() {
        let currentTime = new Date();
        let remainingHours = 23 - currentTime.getHours(),
            remainingMinutes = 60 - currentTime.getMinutes(),
            remainingSeconds = 60 - currentTime.getSeconds();

        if (remainingHours.toString().length < 2) remainingHours = `0${remainingHours}`
        if (remainingMinutes.toString().length < 2) remainingMinutes = `0${remainingMinutes}`
        if (remainingSeconds.toString().length < 2) remainingSeconds = `0${remainingSeconds}`


        document.getElementById("hours").textContent = remainingHours;
        document.getElementById("minutes").textContent = remainingMinutes;
        document.getElementById("seconds").textContent = remainingSeconds;
    }

    setInterval(timerInit, 1000);
}

const alertControler = () => {
    const alertModals = document.querySelectorAll(".alert-modal");
    const alertCloseBtns = document.querySelectorAll(".alert-modal__close-icon");

    function showRandomAlert() {
        let total = Math.round(Math.random() * (alertModals.length - 1));
        alertModals[total].classList.add("alert-modal__active");
    }

    function closeAlert() {
        alertModals.forEach(alertModal => {
            if (alertModal.classList.contains("alert-modal__active")) {
                alertModal.classList.remove("alert-modal__active");
            }
        })
    }

    function alertInit() {
        alertCloseBtns.forEach(alertCloseBtn => {
            alertCloseBtn.addEventListener("click", () => {
                closeAlert();
            })
        })

        let show = setTimeout(() => { setInterval(showRandomAlert, 10000); }, 2000);
        let close = setInterval(closeAlert, 10000);

        if (document.body.clientWidth <= 768) {
            clearTimeout(show);
            clearInterval(close);
        }
    }

    alertInit();

}

const popUpControler = () => {
    const popUp = document.querySelector(".pop-up");

    window.addEventListener("mouseout", event => {
        if (event.toElement === null) popUp.classList.add("pop-up__active");
    })

    popUp.addEventListener("click", (event) => {
        if (event.target == popUp) popUp.classList.remove("pop-up__active");
    })
}

document.addEventListener('DOMContentLoaded', () => {
    sliderControler();
    timerControler();
    alertControler();
    popUpControler();
});