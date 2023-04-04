async function getCatalog() {
	return await (await fetch("/catalog.json")).json();
}

function getCart() {
	return JSON.parse(localStorage.getItem("cart")) || {};
}

function setCart(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

async function addToCart(id) {
	var catalog = await getCatalog();
	var cart = getCart();
	if (id in catalog) {
		if (cart[id]) {
			cart[id].quantity += 1;
		} else {
			cart[id] = {
				quantity: 1
			};
		}
		setCart(cart);
	}
}

function clearCart() {
	localStorage.removeItem("cart");
}

function changeQuantity(id, change) {
	var cart = getCart();
	console.log(id);
	if (cart[id]) {
		if (cart[id].quantity + change > 0) {
			cart[id].quantity += change;
		}
	}
	setCart(cart);
}

async function displayCart() {
	var catalog = await getCatalog();	
	
	var cartContainer = document.getElementById("cart-items");
	if (cartContainer != null) {
		cartContainer.innerHTML = "";
		
		var totalPrice = 0;
		var cart = JSON.parse(localStorage.getItem("cart")) || {};
		for (var key in cart) {
			if (Object.hasOwn(cart, key)) {
				if (key in catalog) {
					var item = cart[key];
					var itemContainer = document.createElement("div");
					itemContainer.classList.add("cart-item")
					itemContainer.innerHTML = catalog[key].name + ": <p class=\"cart-action\" id=\"quantity-minus\" data-id=\"" + key + "\">-</p> " + item.quantity + " <p class=\"cart-action\" id=\"quantity-plus\" data-id=\"" + key + "\">+</p> " + " x ";
					var actualPrice = catalog[key].price;
					if ("discountedPrice" in catalog[key]) {
						actualPrice = catalog[key].discountedPrice;
						itemContainer.innerHTML += "<span class=\"strikethrough\">" + catalog[key].price  + "Ft</span> ";
					}
					itemContainer.innerHTML += actualPrice + "Ft = <strong>" + (item.quantity * actualPrice) + "Ft</strong>"
					cartContainer.appendChild(itemContainer);
					totalPrice += item.quantity * actualPrice;
				}
			}
		}
		
		var finalPrice = document.getElementById("final-price");
		finalPrice.innerHTML = totalPrice + "Ft";
		
		document.querySelectorAll("#quantity-minus").forEach(function(elem) {
			elem.addEventListener("click", function() {
				changeQuantity(elem.getAttribute("data-id"), -1);
				displayCart();
			});
		});
		document.querySelectorAll("#quantity-plus").forEach(function(elem) {
			elem.addEventListener("click", function() {
				changeQuantity(elem.getAttribute("data-id"), +1);
				displayCart();
			});
		});
	} else {
		console.log("displayCart: Can't display cart, no container.")
	}
}

window.addEventListener("DOMContentLoaded", displayCart);
window.addEventListener("DOMContentLoaded", function() {
	var paymentForm = document.getElementById("payment-form");
	if (paymentForm) {
		paymentForm.addEventListener("submit", clearCart);
	} else {
		console.log("on DOMContentLoaded: no payment-form, probably not on checkout.")
	}
	document.querySelectorAll(".buy").forEach(elem => {
		elem.addEventListener("click", function() {
			addToCart(elem.dataset.id);
		});
	});
});
