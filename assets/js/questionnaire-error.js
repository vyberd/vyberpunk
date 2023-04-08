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

window.addEventListener("DOMContentLoaded", function () {
	const cleanError = findGetParameter("mauticError").replace(/<\/?[^>]+(>|$)/g, "");
	var displayedError = "Ismeretlen hiba!"
	if (cleanError.includes("required")) {
		displayedError = "Egy kötelező mezőt kihagytál!";
	}
	document.querySelector("#displayed-error-msg").innerHTML = displayedError;
	document.querySelector("#error-msg").innerHTML = "`" + cleanError + "`";
});
