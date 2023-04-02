function addToCart(item) {
	var cart = JSON.parse(localStorage.getItem("cart")) || {};
	
	if (cart[item.id]) {
		cart[item.id].quantity += 1;
	} else {
		cart[item.id] = {
			id: item.product.id,
			name: item.product.name,
			price: item.product.price,
			quantity: 1
		};
	}
	
	localStorage.setItem("cart", JSON.stringify(cart));
	
	document.getElementById("cart-count").innerHTML = Object.keys(cart).length;
}

function displayCart() {
	var cart = JSON.parse(localStorage.getItem("cart")) || {};
	
	var cartContainer = document.getElementById("cart-container");
	
	cartContainer.innerHTML = "";
	
	for (var key in cart) {
		if (cart.hasOwnProperty(key)) {
			var item = cart[key];
			var itemContainer = document.createElement("div");
			itemContainer.innerHTML = item.name + " x " + item.quantity + " - $" + (item.price * item.quantity).toFixed(2);
			cartContainer.appendChild(itemContainer);
		}
	}
}
