const bells = new Audio('./sounds/bell.wav'); 
const session = document.querySelector('.minutes'); 
const getSecond = document.querySelector(".seconds");
const startBtn = document.querySelector('.btn-start'); 
const resetBtn = document.querySelector('.btn-reset'); 
const pauseBtn = document.querySelector('.btn-pause'); 
let myInterval; 
let state = true;
//scroll
let totalSeconds = 15 * 60;
let count = 15;
const scroll = (event) => {
    if (event.deltaY < 0 && count < 120) {
      // Scrolling up
      count++;
      totalSeconds = Number.parseInt(count) * 60;
    } else if (event.deltaY > 0 && count > 15){
      // Scrolling down
      count--;
      totalSeconds = Number.parseInt(count) * 60;
    }
    session.innerHTML = count;
  };

window.addEventListener('wheel', scroll);
// const sessionAmount = Number.parseInt(count.textContent);
// let totalSeconds = count * 60;




//app timer
const appTimer = () => {
    startBtn.style.display = "none";
    pauseBtn.style.display = "unset";
    resetBtn.style.display = "unset";
    window.removeEventListener('wheel', scroll);
    if(state) {
      state = false;
    //   clearInterval(myInterval);
    const updateSeconds = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');
      
        totalSeconds--;
      
        let minutesLeft = Math.floor(totalSeconds/60);
        let secondsLeft = totalSeconds % 60;
      
        if(secondsLeft < 10) {
          secondDiv.textContent = '0' + secondsLeft;
        } else {
          secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`
      
        if(minutesLeft === 0 && secondsLeft === 0) {
          bells.play()
          clearInterval(myInterval);
        }
      }
      myInterval = setInterval(updateSeconds, 1000);
    }
  }
  
  //Start
  startBtn.addEventListener('click', appTimer);

  //Pause
  pauseBtn.addEventListener("click", () => {
    state = true;
    if(pauseBtn.innerHTML === "pause"){
        pauseBtn.innerHTML = "resume";
        clearInterval(myInterval);
    }else if(pauseBtn.innerHTML === "resume"){
         appTimer();
         pauseBtn.innerHTML = "pause";
    }
  })

  //Reset
  resetBtn.addEventListener('click', () => {
    state = true;
    clearInterval(myInterval);
    window.addEventListener('wheel', scroll);
    totalSeconds = 15 * 60;
    session.innerHTML = "15";
    document.querySelector(".seconds").innerHTML = "00";
    startBtn.style.display = "unset";
    pauseBtn.style.display = "none";
    resetBtn.style.display = "none";
  })