// Задание 1.
console.log("Задание 1");

const btn = document.querySelector(".btn-svg");
const svg = document.querySelector(".btn-svg svg");
const itemSvg1 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
</svg>`;
const itemSvg2 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
<path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
</svg>`;
let count = 1;
function toggleSvg() {
  if (count === 1) {
    btn.querySelector("svg").remove();
    btn.insertAdjacentHTML("beforeend", itemSvg2);
    count++;
  } else {
    btn.querySelector("svg").remove();
    btn.insertAdjacentHTML("beforeend", itemSvg1);
    count--;
  }
}

btn.addEventListener("click", toggleSvg);

// Задание 2
console.log("Задание 2");
const btnScreen = document.querySelector(".get-screen__btn");

const alertScreen = () => {
  const width = window.screen.width;
  const height = window.screen.height;
  alert(`ширина: ${width} , высота: ${height}`);
};

btnScreen.addEventListener("click", alertScreen);

// ================================================ //
// Задание 3
console.log("Задание 3");

const INPUT_MSG = document.getElementById("msg");
const SEND_MSG_BTN = document.getElementById("sendMsgBtn");
const SEND_GEO_BTN = document.getElementById("sendGeoBtn");
const WRAP_MSG = document.querySelector(".message-wrap");
const WS_URL = "wss://echo-ws-service.herokuapp.com";
let websocket;

const messageText = (text, addClass) =>
  `<div class="message-text ${addClass}">${String(text)}</div>`;

const outputMessage = (txt, addClass) => {
  if (txt !== "" && txt.trim().length) {
    WRAP_MSG.insertAdjacentHTML("afterbegin", messageText(txt, addClass));
  }
};

websocket = new WebSocket(WS_URL);

const sendMessage = (message) => {
  websocket.onopen = function () {
    console.log("CONNECTED");
  };

  websocket.onclose = function () {
    console.log("DISCONNECTED");
  };

  websocket.onmessage = function (evt) {
    outputMessage(evt.data);
  };

  websocket.onerror = function (evt) {
    outputMessage(evt.data, "error");
  };
  websocket.send(message);
};
const error = () => {
  console.log("Невозможно получить ваше местоположение");
};

const success = (position) => {
  console.log("position", position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  let mapLink = `<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}" target="_blank">Ссылка на карту</a>`
  WRAP_MSG.insertAdjacentHTML("afterbegin", messageText(mapLink, "client"));
};

SEND_GEO_BTN.addEventListener("click", () => {
  if (!navigator.geolocation) {
    console.log("Geolocation не поддерживается вашим браузером");
  } else {
    console.log("Определение местоположения…");
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

SEND_MSG_BTN.addEventListener("click", () => {
  outputMessage(INPUT_MSG.value, "client");
  sendMessage(INPUT_MSG.value);
  INPUT_MSG.value = "";
});
