let currentTab = 0;

function showTab(n) {
	const tabs = document.querySelectorAll('.tab-pane');
	tabs[n].classList.add('is-active');
	if (n == 0) {
		document.getElementById('prevBtn').style.visibility = 'hidden';
	} else {
		document.getElementById('prevBtn').style.visibility = 'visible';
	}
	if (n == tabs.length - 1) {
		document.getElementById('nextBtn').style.display = 'none';
		document.getElementById('submitBtn').style.display = 'inline';
		document.getElementById('submitBtn').style.visibility = 'visible';
	} else {
		document.getElementById('submitBtn').style.display = 'none';
		document.getElementById('nextBtn').style.display = 'inline';
		document.getElementById('nextBtn').style.visibility = 'visible';
	}
	const tabLinks = document.querySelectorAll('.tab-link');
	for (let i = 0; i < tabLinks.length; i++) {
		tabLinks[i].classList.remove('is-active');
	}
	tabLinks[n].classList.add('is-active');
	currentTab = n;
}

function nextTab() {
	const tabs = document.querySelectorAll('.tab-pane');
	if (currentTab < tabs.length - 1) {
		tabs[currentTab].classList.remove('is-active');
		showTab(currentTab + 1);
	}
}

function prevTab() {
	const tabs = document.querySelectorAll('.tab-pane');
	if (currentTab > 0) {
		tabs[currentTab].classList.remove('is-active');
		showTab(currentTab - 1);
	}
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

	showTab(currentTab);
});
