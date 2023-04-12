const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("animate-slidein");
		}
	});
});

function setupObserver() {
	document.querySelectorAll('h1, h2, .stack-offer').forEach(elem => {
		observer.observe(elem);
	});
}

document.addEventListener("DOMContentLoaded", function() {
	setupObserver();
});
setupObserver();
