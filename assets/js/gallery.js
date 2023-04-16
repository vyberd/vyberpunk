function initGalleries() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 10,
		pagination: {
			el: '.swiper-pagination',
		},
		breakpoints: {
			640: {
				slidesPerView: 3,
				spaceBetween: 20
			}
		}
	});
}
window.addEventListener("DOMContentLoaded", function () {
	initGalleries();
});
initGalleries();
