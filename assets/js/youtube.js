function initYoutube() {
	var youtube = document.querySelectorAll(".youtube");
	for (var i = 0; i < youtube.length; i++) {
		youtube[i].addEventListener("click", function handler() {
			var video = document.createElement("iframe");
			video.setAttribute("frameborder", "0");
			video.setAttribute("allowfullscreen", "");
			video.setAttribute("allow", "autoplay");
			video.setAttribute("src", "https://www.youtube-nocookie.com/embed/" + this.dataset.id + "?rel=0&showinfo=0&autoplay=1");
			video.classList.add("video");

			var videoCol = document.createElement("div");
			videoCol.classList.add("column");			
			videoCol.appendChild(video);

			var chatCol = document.createElement("div");
			if (this.dataset.chat.toLowerCase() === "true") {
				var chat = document.createElement("iframe");
				chat.classList.add("chat");
				chat.setAttribute("src", "https://www.youtube.com/live_chat?embed_domain=" + this.dataset.embeddomain + "&v=" + this.dataset.id)
				chat.setAttribute("frameborder", "0")
				chatCol.classList.add("column");		
				chatCol.classList.add("is-one-quarter");
				chatCol.appendChild(chat);
			}
			var columns = document.createElement("div");
			columns.classList.add("columns")
			columns.classList.add("is-vcentered")
			columns.appendChild(videoCol);
			columns.appendChild(chatCol);
			this.innerHTML = "";
			this.appendChild(columns);
			this.removeEventListener("click", handler);
		});	
	};
}
document.addEventListener("DOMContentLoaded", initYoutube);
initYoutube();
