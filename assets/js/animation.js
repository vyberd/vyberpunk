const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("animate-slidein");
		}
	});
});

function setupObserver() {
	document.querySelectorAll('h1, h2, .stack-offer, .slide-up').forEach(elem => {
		if (!elem.classList.contains("animate-off")) {
			observer.observe(elem);
		}
	});
}

document.addEventListener("DOMContentLoaded", function() {
	setupObserver();
});
setupObserver();
