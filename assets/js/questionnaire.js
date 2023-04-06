let currentTab = 0;

function showTab(n) {
	currentTab = n;

	prev = document.querySelector("#prevBtn");
	next = document.querySelector("#nextBtn");
	submit = document.querySelector("#submitBtn");

	const tabs = document.querySelectorAll('.tab-pane');
	tabs.forEach(tab => {
		tab.classList.remove("is-active");
	});
	tabs[currentTab].classList.add('is-active');

	if (currentTab == 0) {
		document.getElementById('prevBtn').style.visibility = 'hidden';
	} else {
		document.getElementById('prevBtn').style.visibility = 'visible';
	}
	if (currentTab == tabs.length - 1) {
		next.style.display = 'none';
		submit.style.display = 'inline';
		submit.style.visibility = 'visible';
	} else {
		submit.style.display = 'none';
		next.style.display = 'inline';
		next.style.visibility = 'visible';
	}

	const tabLinks = document.querySelectorAll('.tab-link');
	tabLinks.forEach(elem => {
		elem.classList.remove('is-active');
	});
	tabLinks[currentTab].classList.add('is-active');
}

function nextTab() {
	showTab(currentTab + 1);
}

function prevTab() {
	showTab(currentTab - 1);
}

window.addEventListener("DOMContentLoaded", function () {
	const prevBtn = document.getElementById('prevBtn');
	prevBtn.addEventListener('click', prevTab);

	const nextBtn = document.getElementById('nextBtn');
	nextBtn.addEventListener('click', nextTab);

	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', function () {
		document.querySelector("#myForm").submit();
	});

	document.querySelectorAll('.tab-link').forEach(elem => {
		elem.addEventListener("click", function () {
			showTab(parseInt(elem.getAttribute("data-id")));
		});
	});
	showTab(currentTab);
});
