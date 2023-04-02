async function getCatalog() {
	return await (await fetch("/catalog.json")).json();
}

async function addToCart(id) {
	var catalog = await getCatalog();
	console.log(catalog);
	var cart = JSON.parse(localStorage.getItem("cart")) || {};
	if (id in catalog) {
		if (cart[id]) {
			cart[id].quantity += 1;
		} else {
			cart[id] = {
				quantity: 1
			};
		}
		localStorage.setItem("cart", JSON.stringify(cart));
	}
}

function clearCart() {
	localStorage.removeItem("cart");
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
					itemContainer.innerHTML = key + ": " + item.quantity + " x ";
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
	} else {
		console.log("displayCart: Can't display cart, no container.")
	}
}

window.addEventListener("DOMContentLoaded", displayCart);
window.addEventListener("DOMContentLoaded", function() {
	document.getElementById("payment-form").addEventListener("submit", clearCart);
});
