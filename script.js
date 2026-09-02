/* =====================================================
   HOTEL EVENTO
   Main JavaScript
   ===================================================== */

/* ================= MOBILE MENU ================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });
    });

    document.addEventListener("click", (event) => {
        if (
            navMenu.classList.contains("open") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        }
    });
}

/* ================= ACTIVE NAV LINK ================= */

const sections = document.querySelectorAll("main section[id]");

if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            "#" + entry.target.id
                        ) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        navObserver.observe(section);
    });
}

/* ================= NAVBAR SCROLL ================= */

const navbar = document.querySelector(".navbar");

if (navbar) {
    const updateNavbar = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    };

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();
}

/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".about-image, " +
    ".room-card, " +
    ".restaurant-content, " +
    ".restaurant-image, " +
    ".events-content, " +
    ".contact-content, " +
    ".map-container, " +
    ".final-cta"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}

/* ================= FOOD PHOTOGRAPHY CAROUSEL ================= */

const foodTrack = document.querySelector(".food-carousel-track");
const foodSlides = document.querySelectorAll(".food-slide");
const foodPrev = document.querySelector(".food-carousel-prev");
const foodNext = document.querySelector(".food-carousel-next");
const foodDots = document.querySelector(".food-carousel-dots");

if (
    foodTrack &&
    foodSlides.length &&
    foodPrev &&
    foodNext &&
    foodDots
) {
    let currentFoodIndex = 0;

    const updateFoodDots = () => {
        const dots = document.querySelectorAll(".food-carousel-dot");

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "active",
                index === currentFoodIndex
            );
        });
    };

    const goToFoodSlide = (index) => {
        currentFoodIndex =
            (index + foodSlides.length) % foodSlides.length;

        foodTrack.scrollTo({
            left: foodTrack.clientWidth * currentFoodIndex,
            behavior: "smooth"
        });

        updateFoodDots();
    };

    foodSlides.forEach((_, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "food-carousel-dot";
        dot.setAttribute(
            "aria-label",
            `Show food image ${index + 1}`
        );

        dot.addEventListener("click", () => {
            goToFoodSlide(index);
        });

        foodDots.appendChild(dot);
    });

    foodPrev.addEventListener("click", () => {
        goToFoodSlide(currentFoodIndex - 1);
    });

    foodNext.addEventListener("click", () => {
        goToFoodSlide(currentFoodIndex + 1);
    });

    foodTrack.addEventListener(
        "scroll",
        () => {
            const index = Math.round(
                foodTrack.scrollLeft / foodTrack.clientWidth
            );

            if (
                index >= 0 &&
                index < foodSlides.length &&
                index !== currentFoodIndex
            ) {
                currentFoodIndex = index;
                updateFoodDots();
            }
        },
        { passive: true }
    );

    foodTrack.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            goToFoodSlide(currentFoodIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            goToFoodSlide(currentFoodIndex + 1);
        }
    });

    updateFoodDots();
}
