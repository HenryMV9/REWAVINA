/* =========================================================
   REWAVINA
   Main Website JavaScript
========================================================= */


/* =========================================================
   HERO SLIDESHOW
========================================================= */

const slides =
    document.querySelectorAll(".hero-slide");

const dots =
    document.querySelectorAll(".slide-dot");

const nextButton =
    document.getElementById("nextSlide");

const prevButton =
    document.getElementById("prevSlide");


let currentSlide = 0;

let slideshowTimer;


/* ---------------------------------------------------------
   SHOW SLIDE
--------------------------------------------------------- */

function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("active");
    });


    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide = index;
}


/* ---------------------------------------------------------
   NEXT SLIDE
--------------------------------------------------------- */

function nextSlide() {

    let nextIndex =
        currentSlide + 1;

    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }

    showSlide(nextIndex);
}


/* ---------------------------------------------------------
   PREVIOUS SLIDE
--------------------------------------------------------- */

function previousSlide() {

    let previousIndex =
        currentSlide - 1;

    if (previousIndex < 0) {
        previousIndex = slides.length - 1;
    }

    showSlide(previousIndex);
}


/* ---------------------------------------------------------
   START SLIDESHOW
--------------------------------------------------------- */

function startSlideshow() {

    slideshowTimer = setInterval(() => {

        nextSlide();

    }, 5500);

}


/* ---------------------------------------------------------
   RESET SLIDESHOW TIMER
--------------------------------------------------------- */

function resetSlideshow() {

    clearInterval(slideshowTimer);

    startSlideshow();

}


/* ---------------------------------------------------------
   BUTTON CONTROLS
--------------------------------------------------------- */

nextButton.addEventListener("click", () => {

    nextSlide();

    resetSlideshow();

});


prevButton.addEventListener("click", () => {

    previousSlide();

    resetSlideshow();

});


/* ---------------------------------------------------------
   DOT CONTROLS
--------------------------------------------------------- */

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        resetSlideshow();

    });

});


/* Start slideshow */

startSlideshow();



/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuToggle =
    document.getElementById("mobileMenuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


mobileMenuToggle.addEventListener("click", () => {

    const isOpen =
        mobileMenu.classList.toggle("active");

    mobileMenuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* ---------------------------------------------------------
   CLOSE MOBILE MENU AFTER CLICK
--------------------------------------------------------- */

const mobileLinks =
    mobileMenu.querySelectorAll("a");

mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});



/* =========================================================
   DONATION AMOUNT BUTTONS
========================================================= */

const amountButtons =
    document.querySelectorAll(".amount-btn");

const selectedAmount =
    document.getElementById("selectedAmount");


let selectedDonation = 5000;


amountButtons.forEach((button) => {

    button.addEventListener("click", () => {

        amountButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");


        selectedDonation =
            Number(button.dataset.amount);


        selectedAmount.textContent =
            "₦" +
            selectedDonation.toLocaleString("en-NG");

    });

});



/* =========================================================
   PAYSTACK DONATION BUTTON
========================================================= */

const donateButton =
    document.getElementById("donateButton");


donateButton.addEventListener("click", () => {

    /*
    =========================================================
    PAYSTACK INTEGRATION

    THIS IS WHERE THE PAYSTACK PAYMENT CODE WILL GO.

    Example flow:

    const handler = PaystackPop.setup({
        key: "YOUR_PAYSTACK_PUBLIC_KEY",
        email: donorEmail,
        amount: selectedDonation * 100,
        currency: "NGN",

        callback: function(response) {
            console.log(response);
        },

        onClose: function() {
            console.log("Payment window closed");
        }
    });

    handler.openIframe();

    IMPORTANT:

    - Use only the PAYSTACK PUBLIC KEY in frontend code.
    - NEVER put your Paystack SECRET KEY in this file.
    - The Secret Key belongs on a secure backend/server.
    =========================================================
    */


    alert(
        `Thank you for supporting REWAVINA.\n\nSelected donation: ₦${selectedDonation.toLocaleString("en-NG")}\n\nPaystack payment integration will be connected here.`
    );

});



/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");

currentYear.textContent =
    new Date().getFullYear();



/* =========================================================
   PAUSE SLIDESHOW WHEN TAB IS HIDDEN
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            clearInterval(slideshowTimer);

        } else {

            startSlideshow();

        }

    }
);