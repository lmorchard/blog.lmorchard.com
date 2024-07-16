import "./vendor/lazyload.js";

// Set up the magical header that changes on scroll.
var HEADER_CHANGE_DISTANCE = 30;
window.addEventListener('scroll', function (e) {
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;
    if (distanceY > HEADER_CHANGE_DISTANCE) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// Activate lazyloading on needful elements
var toLazyLoad = document.querySelectorAll('.lazyload');
for (var idx = 0; idx < toLazyLoad.length; idx++) {
    lzld(toLazyLoad[idx]);
}
