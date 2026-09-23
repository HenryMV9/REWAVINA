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

if (nextButton) {

nextButton.addEventListener("click", () => {

    nextSlide();

    resetSlideshow();

});

}


if (prevButton) {

prevButton.addEventListener("click", () => {

    previousSlide();

    resetSlideshow();

});

}


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


if (mobileMenuToggle && mobileMenu) {

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

}

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
   DONATION AMOUNT SELECTION
========================================================= */

const amountButtons =
    document.querySelectorAll(".amount-btn");

const customAmountInput =
    document.getElementById("customAmount");

const selectedAmountDisplay =
    document.getElementById("selectedAmount");

const donateButton =
    document.getElementById("donateButton");


const MIN_DONATION = 100;

let selectedDonation = 5000;


/* ---------------------------------------------------------
   FORMAT NAIRA
--------------------------------------------------------- */

function formatNaira(amount) {

    return "₦" +
        Number(amount).toLocaleString("en-NG");

}


/* ---------------------------------------------------------
   UPDATE SELECTED AMOUNT DISPLAY
--------------------------------------------------------- */

function updateSelectedAmount(amount) {

    selectedDonation = Number(amount);

    if (selectedAmountDisplay) {

        selectedAmountDisplay.textContent =
            formatNaira(selectedDonation);

    }

}


/* ---------------------------------------------------------
   PRESET DONATION BUTTONS
--------------------------------------------------------- */

amountButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /* Remove active state */

        amountButtons.forEach((item) => {

            item.classList.remove("active");

        });


        /* Activate selected preset */

        button.classList.add("active");


        /* Clear custom amount */

        if (customAmountInput) {

            customAmountInput.value = "";

        }


        /* Get preset value */

        const amount =
            Number(button.dataset.amount);


        /* Update selected amount */

        updateSelectedAmount(amount);

    });

});


/* ---------------------------------------------------------
   CUSTOM DONATION INPUT
--------------------------------------------------------- */

if (customAmountInput) {

    customAmountInput.addEventListener("input", () => {

        const customValue =
            Number(customAmountInput.value);


        /*
           When the user starts entering a custom amount,
           remove the active state from the preset buttons.
        */

        if (customAmountInput.value !== "") {

            amountButtons.forEach((button) => {

                button.classList.remove("active");

            });

        }


        /*
           Only update the selected amount once the
           custom amount reaches the minimum.
        */

        if (
            Number.isFinite(customValue) &&
            customValue >= MIN_DONATION
        ) {

            updateSelectedAmount(customValue);

        }

    });

}


/* =========================================================
   DONATE BUTTON
========================================================= */

if (donateButton) {

    donateButton.addEventListener("click", () => {

        /*
        -----------------------------------------------------
        IMPORTANT FIX

        Read the custom amount AGAIN when Donate is clicked.

        This guarantees that a custom value takes priority
        over the previously selected preset amount.
        -----------------------------------------------------
        */

        let donationAmount = selectedDonation;


        /* Check custom amount first */

        if (
            customAmountInput &&
            customAmountInput.value.trim() !== ""
        ) {

            const customValue =
                Number(customAmountInput.value);


            /* Validate custom amount */

            if (
                !Number.isFinite(customValue) ||
                customValue < MIN_DONATION
            ) {

                alert(
                    "Please enter a valid donation amount of at least ₦100."
                );

                customAmountInput.focus();

                return;

            }


            /*
               CUSTOM AMOUNT IS NOW THE
               AUTHORITATIVE DONATION AMOUNT
            */

            donationAmount = customValue;

        }


        /* Final validation */

        if (
            !Number.isFinite(donationAmount) ||
            donationAmount < MIN_DONATION
        ) {

            alert(
                "Please select or enter a valid donation amount."
            );

            return;

        }


        /* Keep the displayed amount accurate */

        updateSelectedAmount(donationAmount);


        /*
        =====================================================
        PAYSTACK INTEGRATION WILL GO HERE

        When Paystack is connected, use:

            amount: donationAmount * 100

        Example:

        const handler = PaystackPop.setup({
            key: "YOUR_PAYSTACK_PUBLIC_KEY",
            email: donorEmail,
            amount: donationAmount * 100,
            currency: "NGN",

            callback: function(response) {
                console.log(response);
            },

            onClose: function() {
                console.log("Payment window closed");
            }
        });

        handler.openIframe();

        NEVER put your Paystack SECRET KEY in this file.
        =====================================================
        */


        /* Temporary testing */

        alert(
            "Donation Amount: " +
            formatNaira(donationAmount)
        );

    });

}





/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

currentYear.textContent =
    new Date().getFullYear();

}



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