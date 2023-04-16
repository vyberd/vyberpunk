var youtube = document.querySelectorAll(".youtube");
for (var i = 0; i < youtube.length; i++) {
	var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.id +"/maxresdefault.jpg";
	var image = new Image();
	image.src = source;
	image.addEventListener("load", 
		function() {
			youtube[i].appendChild(image);
		}(i) 
	);
	youtube[i].addEventListener("click", function() {
		var iframe = document.createElement("iframe");
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "");
		iframe.setAttribute("allow", "autoplay");
		iframe.setAttribute("src", "https://www.youtube-nocookie.com/embed/" + this.dataset.id + "?rel=0&showinfo=0&autoplay=1");
		this.innerHTML = "";
		this.appendChild(iframe);
	});	
};
