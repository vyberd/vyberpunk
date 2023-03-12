const toggleBurger = () => {
	let burgerIcon = document.getElementById('burger');
	let dropMenu = document.getElementById('navbar');
	burgerIcon.classList.toggle('is-active');
	dropMenu.classList.toggle('is-active');
};

document.getElementById("burger").onclick = toggleBurger;
