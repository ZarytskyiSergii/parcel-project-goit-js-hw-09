import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const inputDate = document.querySelector("input[type='text']");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(inputDate, options);

const startButton = document.querySelector("[data-start]");

let intervalId = null;


startButton.addEventListener("click", () => {

   

  clearInterval(intervalId);
  const endDate = new Date(inputDate.value).getTime();
  const now = new Date().getTime(); 

    
     
    if (endDate <= new Date().getTime()) {
    startButton.disabled = true;
  Notiflix.Notify.warning("Please choose a future date."); 
  return;
    }
    
startButton.disabled = false;
  
  intervalId = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) { 
      clearInterval(intervalId); 
      Notiflix.Notify.warning("Timer has ended."); 
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(distance);

    const daysEl = document.querySelector("[data-days]");
    const hoursEl = document.querySelector("[data-hours]");
    const minutesEl = document.querySelector("[data-minutes]");
    const secondsEl = document.querySelector("[data-seconds]");

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) /second);

  return { days, hours, minutes, seconds };
};



