function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

window.addEventListener("DOMContentLoaded", function() {
	var msg = "Ismeretlen válasz. (init)"
	switch (findGetParameter("redirect_status")) {
		case "succeeded":
			msg = "Sikeres rendelés!";
			break;
		case "requires_payment_method":
			msg = "Még nem adtad meg a vásárlási adataid... (\"Hát te meg ki vagy, honnan jöttél?\")";
			break;	
		case "requires_action":
			msg = "Még el kell fogadnod a vásárlást...";
			break;	
		case "processing":
			msg = "A rendelésed feldolgozás alatt...";
			break;	
		case "canceled":
			msg = "A rendelésed megszakítottad.";
			break;	
		default: 
			var msg = "Ismeretlen válasz. (" + findGetParameter("redirect_status") + ")";
			break;
	}
	document.getElementById("response-title").innerHTML = msg;
})
