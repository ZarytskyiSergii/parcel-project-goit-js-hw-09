
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}

const startButton = document.querySelector("[data-start]");
startButton.addEventListener("click", () => {
  startButton.disabled = true; 
  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
});

const stopButton = document.querySelector("[data-stop]");
stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
  startButton.disabled = false; 
});