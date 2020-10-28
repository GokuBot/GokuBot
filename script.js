const recognition = new webkitSpeechRecognition();
recognition.continous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 2;
recognition.rate = 1.5;
let speech = new SpeechSynthesisUtterance();
let navBar;
const speakBtn = document.querySelector("#speakBtn");

let NavItem = `<li class="nav-item">
<a class="nav-link active" href="#">SampleLink</a>
</li>`;
// random greeting message returns
function greetingMessage() {
  // messages array declared
  let messages = [
    "hello sir",
    "whatsup sir",
    "howz your day maam",
    "jai shree ram",
    "jai mata di",
  ];
  // random index generated of messages array
  let index = Math.floor(Math.random() * messages.length);
  // random message from the messages array return
  return messages[index];
}

function getCurrentDay() {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let newDate = new Date();
  let index = newDate.getDay();
  return days[index];
}
function returnNumber(numberText){
  if (numberText === 'to') {
    return 2
  }
  let arr = ['zero' , 'one','two','three','four','five','six','seven','eight','nine'];
  let index = arr.indexOf(numberText);
  return index


}

speakBtn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (e) => {
  const str = e.results[0][0]["transcript"];
  console.log(str);
  speech.text = str;
  //   window.speechSynthesis.speak(speech);

  const arr = str.split(" ");

  try {
    // if we speak "hello" then we fetch a random greeting message from thr greetingMessage function
  if (arr.includes("hello")) {
    // set the text to the greetingMessage
    speech.text = greetingMessage();
    // speak the random greeting message
    window.speechSynthesis.speak(speech);
  }
  if (
    arr.includes("currentday") ||
    (arr.includes("current") && arr.includes("day"))
  ) {
    let currentDay = getCurrentDay();
    let currentDayText = "today is " + currentDay;
    speech.text = currentDayText;
    window.speechSynthesis.speak(speech);
  }

 
  
  if (arr.includes("header") && arr.includes('create')) {
    speech.text = `Header added successfully with  ${arr[arr.length-2]} links`;
    window.speechSynthesis.speak(speech);
    navBar = document.createElement("ul");
    navBar.classList.add("nav");
    navBar.classList.add("justify-content-center");
    let navElements = returnNumber(arr[arr.length-2]);
    for (let i = 0; i < navElements; i++) {
      navBar.innerHTML+=NavItem;
    }
  document.querySelector('.container').appendChild(navBar);
  }
  // change header link text of number two to contect
  if(arr.includes('change') && arr.includes('header') ){
    if(arr.includes('text') ){
      let linkNumber=returnNumber(arr[arr.length-3]);
      navBar.children[linkNumber].children[0].innerText=arr[arr.length-1]

    }
    // change header link color of all to red
  else if(arr.includes('colour') && arr.includes('all')){
    for(let i =0; i<navBar.children.length; i++){
      navBar.children[i].children[0].style.color=arr[arr.length-1]
    }
  }
  }
  // else {
  //   speech.text='sorry i dont understand';
  // window.speechSynthesis.speak(speech)
  // }
} catch (error) {
  speech.text='sorry i dont understand';
  window.speechSynthesis.speak(speech)
  console.log('catch is executed')
}
};
