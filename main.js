"use strict";

const move = document.querySelector(".moves");
const timer = document.querySelector(".timer");
const cards = document.querySelector(".cards");
const button = document.querySelector(".btn");

// Suffle cards
function suffle () {
	const imgArray = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
	imgArray.sort(() => {
		return Math.random() > 0.5 ? 1 : -1;
	});
	cards.querySelectorAll("img").forEach((img, i) => {
		img.src = `/assets/img-${imgArray[i]}.png`;
	});
};

(function () {
	suffle();
	let tick = 30;
	let moves = 0;
	let times = 0;
	let matchingCard = [];
	let matchedCards = [];
	let matchingImg = [];
	let imgElement  = [];
	cards.addEventListener('click', function (e) {
		const card = e.target.closest('.thecard');
		// Guard clause
		if (!card) return ;
		const img = card.querySelector('img').src;
		// Timer
		if (moves === 0) {
		const timeOut = setInterval(() => {
		tick--;
		timer.textContent = tick;
		if (tick == 0) {
			clearInterval(timeOut);
			cards.style.pointerEvents = 'none';
		};
	}, 1000);

	}
	moves++;
	move.textContent = moves;
	times++;
	card.classList.add('flip')
		matchingCard.push(img);
		imgElement.push(card);
		if (times === 2) {
			// Check if two cards matches 
			if (matchingCard[0] === matchingCard[1]) {
				times = 0;
				matchedCards = matchingCard[0];
				matchingCard = [];
				matchingImg = [...imgElement];
				imgElement = [];
				matchingImg.forEach(x => {
					x.style.pointerEvents = 'none';
				});
			} else {
				setTimeout(() => {
					imgElement.forEach(x => {
						x.classList.remove('flip')
						imgElement = [];
					});
				}, 800);
				times = 0;
				matchingCard = [];
				matchingImg = [];

			};
		};
	});

	button.addEventListener('click', () => {
		cards.style.pointerEvents = 'auto';
		cards.querySelectorAll('.thecard')
		.forEach(x => {
			x.style.pointerEvents = 'auto';
			if (x.classList.contains('flip')) x.classList.remove('flip')
		});
		suffle();
		tick = 30;
		moves = 0;
		times = 0;
		timer.textContent = tick;
		move.textContent = moves;
		matchingCard = [];
		matchedCards = [];
		matchingImg = [];
		imgElement  = [];
	});
})();