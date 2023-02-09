(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("load", windowLoad);
    document.body.classList.add("loader");
    function windowLoad() {
        if (document.querySelector(".main-slider")) new Swiper(".main-slider", {
            speed: 2e3,
            effect: "fade",
            autoplay: {
                delay: 3e3
            },
            pagination: {
                el: ".bullets__items",
                type: "bullets",
                clickable: true
            }
        });
        document.addEventListener("click", documentActions);
        function documentActions(e) {
            const targetElement = e.target;
            if (targetElement.closest(".nav-popular__item")) {
                const tabNavItem = targetElement.closest(".nav-popular__item");
                if (!tabNavItem.classList.contains("active")) {
                    const activeTabNavItem = document.querySelector(".nav-popular__item.active");
                    activeTabNavItem.classList.remove("active");
                    tabNavItem.classList.add("active");
                    const tabItem = document.querySelectorAll(".popular__tab");
                    const activeTabItem = document.querySelector(".popular__tab.active");
                    activeTabItem.classList.remove("active");
                    tabItem[getIndex(tabNavItem)].classList.add("active");
                }
            }
        }
        function getIndex(el) {
            return Array.from(el.parentNode.children).indexOf(el);
        }
        const items = document.querySelectorAll("[data-item]");
        const options = {
            threshold: .2
        };
        const callback = entries => {
            entries.forEach((entry => {
                if (entry.isIntersecting) entry.target.classList.add("active");
            }));
        };
        const observer = new IntersectionObserver(callback, options);
        items.forEach((item => {
            observer.observe(item);
        }));
    }
    window["FLS"] = true;
    isWebp();
})();