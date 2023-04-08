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
	var currentPos = 0;
	var finalPos = 0;
	tabLinks.forEach(elem => {
		elem.classList.remove('is-active');
		if (tabLinks[currentTab] == elem) {
			finalPos = currentPos;
		} else {
			currentPos += elem.offsetWidth;
		}
	});
	document.querySelector(".tabs").scrollLeft = finalPos;
	tabLinks[currentTab].classList.add('is-active');
}

function nextTab() {
	window.scrollTo(0, 0);
	showTab(currentTab + 1);
}

function prevTab() {
	window.scrollTo(0, 0);
	showTab(currentTab - 1);
}

function handleRadioGroups() {
	var handledNames = [];
	document.querySelectorAll("input[type=radio]").forEach(radio => {
		if (!handledNames.includes(radio.name)) {
			handledNames.push(radio.name);
			var checked = document.querySelector("input[name=" + radio.name + "]:checked");
			if (checked) {
				var field = document.querySelector("input[type=text]#" + radio.name);
				document.querySelectorAll("input[type=hidden]#" + radio.name).forEach(hidden => {
					if (field && checked == document.querySelector("input[name=" + radio.name + "][value=other]")) {
						hidden.value = field.value;
					} else {
						hidden.value = checked.value;
					}
				});
			}
		}
	});
}

function debugForm() {
	var formData = new FormData(document.querySelector("#questionnaire-form"));
	for (const [key, value] of formData) {
		console.log(key, ": ", value)
	}
}

window.addEventListener("DOMContentLoaded", function () {
	const prevBtn = document.getElementById('prevBtn');
	prevBtn.addEventListener('click', prevTab);

	const nextBtn = document.getElementById('nextBtn');
	nextBtn.addEventListener('click', nextTab);

	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', function () {
		handleRadioGroups();
		document.querySelector("#questionnaire-form").submit();
	});

	document.querySelectorAll('.tab-link').forEach(elem => {
		elem.addEventListener("click", function () {
			showTab(parseInt(elem.getAttribute("data-id")));
		});
	});
	showTab(currentTab);
});
