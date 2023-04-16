async function getCatalog() {
	return await (await fetch("/catalog.json")).json();
}

function getCart() {
	return JSON.parse(localStorage.getItem("cart")) || {};
}

function isCartEmpty() {
	return Object.keys(getCart()).length == 0;
}

function setCart(cart) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

async function addToCart(id) {
	changeQuantity(id, 1);
}

function clearCart() {
	localStorage.removeItem("cart");
}

async function changeQuantity(id, change) {
	var catalog = await getCatalog();
	if (id in catalog) {
		var cart = await getCart();
		if (cart[id]) {
			if (cart[id].quantity + change >= 0 && (cart[id].quantity + change <= catalog[id].maxAmount || !catalog[id].maxAmount)) {
				cart[id].quantity += change;
			}
		} else {
			cart[id] = {
				quantity: change
			};
		}
		setCart(cart);
	}
}

async function displayCart() {
	var catalog = await getCatalog();	
	
	var cartContainer = document.getElementById("cart-items");
	if (cartContainer != null) {
		cartContainer.innerHTML = "";

		var totalPrice = 0;
		var realPrice = 0;
		var cart = JSON.parse(localStorage.getItem("cart")) || {};
		for (var key in cart) {
			if (Object.hasOwn(cart, key)) {
				var item = cart[key];
				if (key in catalog && item.quantity > 0) {
					var itemContainer = document.createElement("div");
					itemContainer.classList.add("cart-item")
					itemContainer.innerHTML = "<strong>" + catalog[key].name + "</strong><br/> <p class=\"cart-action\" id=\"quantity-minus\" data-id=\"" + key + "\">-</p> " + item.quantity + " <p class=\"cart-action\" id=\"quantity-plus\" data-id=\"" + key + "\">+</p> " + " x ";
					var actualPrice = catalog[key].price;
					if ("discountedPrice" in catalog[key]) {
						actualPrice = catalog[key].discountedPrice;
						itemContainer.innerHTML += "<span class=\"strikethrough\">" + formatPrice(catalog[key].price)  + "</span> ";
					}
					itemContainer.innerHTML += formatPrice(actualPrice) + " = <strong>" + formatPrice(item.quantity * actualPrice) + "</strong>"
					cartContainer.appendChild(itemContainer);
					totalPrice += item.quantity * actualPrice;
					realPrice += item.quantity * catalog[key].price;
				}
			}
		}
		if (realPrice != finalPrice) {	
			var realPriceElem = document.getElementById("real-price");
			realPriceElem.innerHTML = formatPrice(realPrice);
		}

		var finalPrice = document.getElementById("final-price");
		finalPrice.innerHTML = formatPrice(totalPrice);
		
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

function setupPaymentClear() {
	var paymentForm = document.getElementById("payment-form");
	if (paymentForm) {
		paymentForm.addEventListener("submit", clearCart);
	} else {
		console.log("on DOMContentLoaded: no payment-form, probably not on checkout.")
	}
}

function formatPrice(price) {
	var formatter = new Intl.NumberFormat("hu-HU", {
		style: "currency", 
		currency: "HUF",
		minimumFractionDigits: 0
	});		
	return formatter.format(price);
}

async function setupBuyButtons() {
	document.querySelectorAll(".buy").forEach(elem => {
		elem.addEventListener("click", function() {
			addToCart(elem.dataset.id);
		});
	});
	var catalog = await getCatalog();
	document.querySelectorAll("#origPrice").forEach(elem => {
		var id = elem.getAttribute("data-id");
		if (id in catalog) {
			price = catalog[id].price;
			elem.innerHTML = formatPrice(price);
		}
	});
	document.querySelectorAll("#price").forEach(elem => {
		var id = elem.getAttribute("data-id");
		if (id in catalog) {
			if (catalog[id].discountedPrice) {
				document.querySelectorAll("#origPrice").forEach(elem => {
					var id = elem.getAttribute("data-id");
					elem.classList.add("strikethrough");
				});
				price = catalog[id].discountedPrice;
				elem.innerHTML = formatPrice(price);
			}
		}
	});
	document.querySelectorAll("#discountPercentage").forEach(elem => {
		var id = elem.getAttribute("data-id");
		if (id in catalog) {
			if (catalog[id].discountedPrice) {
				percentage = Math.round((1 - catalog[id].discountedPrice / catalog[id].price) * 100);
				elem.innerHTML = percentage + "%";
			}
		}
	});
	document.querySelectorAll(".stack-total").forEach(elem => {
		var total = 0;
		var id = elem.getAttribute("data-id");
		Array.from(document.querySelector(".stack-offer ul").children).forEach(child => {
			total += parseInt(child.querySelector(".priceShow").innerHTML);
		});
		elem.innerHTML = formatPrice(total);
	});
	document.querySelectorAll(".priceShow").forEach(elem => {
		elem.innerHTML = formatPrice(elem.innerHTML);
	});
	if (!isCartEmpty()) {
		document.querySelectorAll(".finish-cart").forEach(elem => {
			elem.parentElement.style.display = "block";
		});
	}
}

window.addEventListener("DOMContentLoaded", displayCart);
window.addEventListener("DOMContentLoaded", function() {
	setupPaymentClear();
	setupBuyButtons();
});
