'use strict';

boardSetup();

function boardSetup() {
	var boards = document.querySelectorAll('.board');

	boards.forEach((board) => {
		if (!board.classList.contains("active")) {

			board.classList.add("active");
	
			
			if (board.dataset.border != undefined) {
				if (!isMobileDevice()) {
					board.style.border = `${board.dataset.border} solid white`;
				} else {
					board.style.border = `calc(${board.dataset.border} / 3) solid white`;

				}
			}
			
			if (!isMobileDevice()) {
				board.style.height = board.dataset.size;
				board.style.width = board.dataset.size;
			} else {
				board.style.height = `calc(${board.dataset.size} / 1.5)`;
				board.style.width = `calc(${board.dataset.size} / 1.5)`;
			}
			
			var position = board.getAttribute('data-pos');
			var rows = position.split('/');
			var squares = [];
			
			var color = 1;
			var c = "";
			
			for (var r = 1; r<=64;r++) {
				c = color % 2 == 0 ? "black" : "white";
			
				var square = document.createElement('div');
				square.style.height = "12.5%";
				square.style.width = "12.5%";
				if (c === "black") {
					square.style.backgroundColor = "#b58863";
				} else {
					square.style.backgroundColor = "#f0d9b5";
			
				}
				board.appendChild(square);
				squares.push(square);
			
				color++;
				if (color % 9 == 0) {
					color++;
				}
			}
			
			var i = 0;
			position.split("").forEach((l) => {
				if (!["1","2","3","4","5","6","7","8","/"].includes(l)) {
					color = l.toLowerCase() === l ? "b" : "w";
					var piece = document.createElement("div");
					piece.style.height = "100%";
					piece.style.width = "100%";
			
					piece.style.backgroundImage += `url(../pieces/${color}${l.toLowerCase()}.png)`;
					piece.style.backgroundSize = "100%";
					piece.style.backgroundRepeat = "no-repeat";
				
					squares[i].appendChild(piece);
				} else if (l!="/") {
					i += parseInt(l)-1;
				} else {
					i -= 1;
				}
				i++;
			});

			const currentLeft = parseFloat(window.getComputedStyle(board).getPropertyValue('left'));

			board.style.left = `${currentLeft-isOffscreen(board)}px`;
		}

	});
	
}


const moves = document.querySelectorAll(".move");
moves.forEach((m) => {
	m.addEventListener("mouseenter", () => {
		if (!m.classList.contains("hasBoard")) {
			if (!isMobileDevice()) {
				m.innerHTML = `${m.innerHTML}<div class="board" data-pos="${m.dataset.pos}" data-border="10px" data-size="25vh" style="position:absolute;top:calc(${m.offsetTop}px - 27vh);left:${m.offsetLeft}px"></div>`;
			} else {
				m.innerHTML = `${m.innerHTML}<div class="board" data-pos="${m.dataset.pos}" data-border="10px" data-size="25vh" style="position:absolute;top:calc(${m.offsetTop}px - 27vh + 70px);left:${m.offsetLeft}px"></div>`;

			}
			m.classList.add("hasBoard");
			boardSetup();
		}
	});
	m.addEventListener("mouseleave", () => {
		if (m.classList.contains("hasBoard")) {
			m.removeChild(m.children[0]);
			m.classList.remove("hasBoard");
			boardSetup();
		}
	});
});

function isOffscreen(element) {
	const rect = element.getBoundingClientRect();
	const windowWidth = document.documentElement.clientWidth-element.offsetWidth;

	
	return (
	  rect.left > windowWidth ? rect.left-windowWidth : 0
	);
  }



const descs = document.querySelectorAll(".desc");

descs.forEach((d) => {

	const rect = d.getBoundingClientRect();
	d.style.width = `${document.documentElement.clientWidth-rect.left}px`;

});



function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isMobileDevice() {
	return window.innerWidth < 768; // Assuming a width of less than 768 pixels means it's a mobile device
}