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
		var formatter = new Intl.NumberFormat("hu-HU", {
			style: "currency", 
			currency: "HUF",
			minimumFractionDigits: 0
		});		

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
						itemContainer.innerHTML += "<span class=\"strikethrough\">" + formatter.format(catalog[key].price)  + "</span> ";
					}
					itemContainer.innerHTML += formatter.format(actualPrice) + " = <strong>" + formatter.format(item.quantity * actualPrice) + "</strong>"
					cartContainer.appendChild(itemContainer);
					totalPrice += item.quantity * actualPrice;
					realPrice += item.quantity * catalog[key].price;
				}
			}
		}
		if (realPrice != finalPrice) {	
			var realPriceElem = document.getElementById("real-price");
			realPriceElem.innerHTML = formatter.format(realPrice);
		}

		var finalPrice = document.getElementById("final-price");
		finalPrice.innerHTML = formatter.format(totalPrice);
		
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
