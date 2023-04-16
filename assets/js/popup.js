function isClassOn(element, className) {
	if (element) {
		return element.className.includes(className);
	} else {
		console.log("isVisible: Non-existent element!")
	}
}
function isClassOnByName(name, className) {
	let element = document.getElementById(name);
	if (element) {
		return element.className.includes(className);
	} else {
		console.log("isPopupVisible: Element " + name + " does not exist!")
		return false;
	}
}
function toggleClass(element, className) {
	if (element) {
		element.className = isClassOn(element, className) ? element.className.replace(" " + className, "") : element.className + " " + className;
		return isClassOn(element, className);
	} else {
		console.log("toggleClass: Non-existent element!");
		return false;
	}
}
function togglePopupClass(popup) {
	return toggleClass(popup, "popup-visible");
}
function toggleScroll() {
	return toggleClass(document.documentElement, "no-scroll");
}
function togglePopup(name) {
	if (name) {
		let element = document.getElementById(name);
		if (isClassOn(element, "popup-no-scroll")) {
			toggleScroll();
		}
		togglePopupClass(element)
	} else {
		console.log("showPopup: You need to provide a name!");
	}
}

function addExitTrigger(elem) {
	if (elem) {
		elem.onclick = function() { 
			togglePopup("popup-" + elem.getAttribute("data-popup")); 
		};
	} else {
		console.log("addExitTrigger: Non-existent element!");
	}
}
function addExitTriggerAll() {
	for (const elem of document.querySelectorAll('.popup-exit')) {
		addExitTrigger(elem);
	}
}

function addOnLeaveIntent(name) {
	document.addEventListener('mouseout', e => {
	    if (!e.toElement 
		&& !e.relatedTarget 
		&& !isClassOnByName(name, "popup-shot-at-end") 
		&& !isClassOnByName(name, "popup-visible")) {
		togglePopup(name);
		toggleClass(document.getElementById(name), "popup-shot-at-end");
	    }
	});
}
function addOnLeaveIntentAll() {
	for (const elem of document.querySelectorAll(".popup-before-exit")) {
		addOnLeaveIntent(elem.id);
	}
}

function addOnEnd(name) {
	window.onscroll = function(ev) {
		if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight - 2) {
			if (
			   !isClassOnByName(name, "popup-shot-before-exit") 
			&& !isClassOnByName(name, "popup-visible")) {
				togglePopup(name);
				toggleClass(document.getElementById(name), "popup-shot-before-exit");
			}
		}
	};
}
function addOnEndAll() {
	for (const elem of document.querySelectorAll(".popup-at-end")) {
		addOnEnd(elem.id);
	}
}

function handleStartPopups() {
	for (const elem of document.querySelectorAll(".popup-on")) {
		togglePopup(elem.id);
	}
}

addExitTriggerAll();
addOnLeaveIntentAll();
addOnEndAll();
handleStartPopups();
