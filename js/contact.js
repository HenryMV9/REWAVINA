/* =========================================================
   REWAVINA — CONTACT PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
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


    /* Close menu when a link is clicked */

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

}



/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formNotice =
    document.getElementById("formNotice");


if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        /*
        =====================================================
        TEMPORARY FORM BEHAVIOUR

        The form is currently frontend-only.

        Later, this can be connected to:

        - A backend API
        - EmailJS
        - Formspree
        - Your own Node.js backend
        - Another secure email service

        We will connect it properly when the organization
        provides the official Gmail address.

        =====================================================
        */


        formNotice.textContent =
            "Thank you for reaching out. Your message form is ready to be connected to REWAVINA's official email.";

        contactForm.reset();

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