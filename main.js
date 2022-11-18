const author = document.getElementById('author');
const topBox = document.getElementById('top-box');
const cryptox = document.getElementById('cryptox');
const iconbox = document.getElementById('iconbox');
const cryinfo = document.getElementById('cryinfo');
const currentTime = document.getElementById('currentTime');
const weather = document.getElementById('weather');

async function render() {
	const res = await fetch(
		'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
	);
	const data = await res.json();
	setBackground(data);
	setAutor(data);
	coins();
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
	iconbox.innerHTML = `<div class="d-flex align-items-center m-2"> <img class="me-2" src="${data.image.small}">
	<h2 class="text-capitalize" id="nameCoin">${data.id}</h2></div>`;

	iconbox.innerHTML += `
		<div class="m-4 mt-1" id="cryinfo">
		<h2 class="mb-2">🎯: ${data.market_data.current_price.usd}</h2>
		<h2 class="mb-2">📈: ${data.market_data.high_24h.usd}</h2>
		<h2 class="mb-2">📉: ${data.market_data.low_24h.usd}</h2></div>`;
}

function renderTime() {
	const today = new Date();
	const time = today.toLocaleTimeString('en-us', { timeStyle: 'short' });
	currentTime.innerHTML = `<h2 id="timeTitle">${time}</h2>`;
}

setInterval(() => {
	renderTime();
}, 1000);

function getLocation() {
	navigator.geolocation.getCurrentPosition((position) => {
		getWeather(position.coords.latitude, position.coords.longitude);
	});
}

async function getWeather(lat, lon) {
	console.log(lat, lon);
	const res = await fetch(
		`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`
	);
	const data = await res.json();
	// setWeather(data);
	console.log(data);
}

function setWeather() {
	getLocation();
	weather.innerHTML = `<div> <img src="${weather.icon}.png"> </div>`;
}

render();
