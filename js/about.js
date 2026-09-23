/* =========================================================
   REWAVINA — ABOUT PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuToggle =
    document.getElementById("mobileMenuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


/* Make sure the elements exist */

if (mobileMenuToggle && mobileMenu) {

    mobileMenuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("active");


        mobileMenuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    /* Close menu when a navigation link is clicked */

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
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}