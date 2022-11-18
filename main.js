const author = document.getElementById('author');
const topBox = document.getElementById('top-box');
const cryptox = document.getElementById('cryptox');
const iconbox = document.getElementById('iconbox');
const cryinfo = document.getElementById('cryinfo');

async function getImg() {
	try {
		const res = await fetch(
			'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
		);
		const data = await res.json();
		setBackground(data);
		setAutor(data);
		coins();
	} catch (err) {
		backupImg();
	}
}

function setBackground(data) {
	document.body.style.backgroundImage = `url('${data.urls.regular}')`;
}

function setAutor(data) {
	author.innerText = `By: ${data.user.name}`;
}

function backupImg() {
	document.body.style.backgroundImage = "url('images/mountain.jpeg";
	author.innerText = 'By: Kabi Acharya';
}

async function coins() {
	try {
		const res = await fetch(
			'https://api.coingecko.com/api/v3/coins/dogecoin'
		);
		if (!res.ok) {
			throw Error('Something went wrong');
		}
		const data = await res.json();
		renderCoins(data);
	} catch (err) {
		console.error(err);
	}
}

function renderCoins(data) {
	iconbox.innerHTML = `<div d-flex flex-row> <img class="m-3 me-1 mb-2" src="${data.image.small}">
	<h2 class="text-capitalize" id="nameCoin">${data.id}</h2></div>`;

	iconbox.innerHTML += `
		<div id="cryinfo">
		<h2>🎯: ${data.market_data.current_price.usd}</h2>
		<h2>📈: ${data.market_data.high_24h.usd}</h2>
		<h2>📉: ${data.market_data.low_24h.usd}</h2></div>`;
}

getImg();
