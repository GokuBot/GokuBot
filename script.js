var recognition = new webkitSpeechRecognition();

recognition.continous = true;
recognition.lang = "en-US";

recognition.interimResults = false;
recognition.maxAlternatives = 2;
recognition.rate = 1.1;

let speech = new SpeechSynthesisUtterance();
let allVoices;
window.speechSynthesis.onvoiceschanged = function () {
  allVoices = window.speechSynthesis.getVoices();

  // 0 -> jarvis voice
  speech.voice = allVoices[0];
};
let speechResult;
const speakBtn = document.querySelector("#speakBtn");
speakBtn.addEventListener("click", () => {
  recognition.start();
});

function botSpeak(speechText) {
  speech.text = speechText;
  window.speechSynthesis.speak(speech);
}

let gender = "Sir";
// let gender = "Mam";

let Navbar, logo;

let emptyNav = `<nav class="navbar navbar-light bg-light"></nav>`;
let navLink = `<li class="nav-item">
<a class="nav-link" href="#">Link</a>
</li>`;

let mainSection = document.querySelector(".mainSection");

// random greeting message returns
function greetingMessage() {
  // messages array declared
  let messages = [
    `Hello ${gender}, How may i help u ? `,
    `Good morning ${gender}, I hope you are having a wonderful day`,
    `Good morning ${gender}, I hope you enjoyed your weekend`,
    `Good morning ${gender}, I hope you are having a great week`,
    `Good morning ${gender}, I hope you are doing well`,
    `Good morning ${gender}, I hope you have coffee already`,
    `Good morning ${gender}, I hope you have your attendance more than 75%`,
  ];
  // random index generated of messages array
  let index = Math.floor(Math.random() * messages.length);
  // random message from the messages array return
  return messages[index];
}

// </ul>`;
// const startBtn = document.querySelector("#startBtn");
const speakBtn = document.querySelector("#speakBtn");

function check(text) {
  return speechResult.includes(text);
}

recognition.onresult = (e) => {
  const str = e.results[0][0]["transcript"];
  console.log(str);
  speech.text = str;
  speechResult = str.split(" ");
  // STARTING COMMANDS
  if (check("hello")) {
    botSpeak(greetingMessage());
  }
  if (check("current") && check("day")) {
    botSpeak(`Today is ${getCurrentDay()}`);
  }

  //HEADER COMMANDS

  // CREATE HEADER / NAVBAR
  if (check("header") || check("navbar")) {
    if (check("create")) {
      Navbar = document.createElement("nav");
      Navbar.classList.add("navbar");

      mainSection.appendChild(Navbar);
      let navName = check("header") ? "header" : "navbar";
      botSpeak(`${navName} created Successfully`);
    }
  }
  //  ADD BRAND LOGO
  if (check("add")) {
    if (check("logo") && check("brand")) {
      logo = document.createElement("a");
      logo.classList.add("navbar-brand");
      let logoImg = document.createElement("img");
      logoImg.src = "../images/logo.png";
      logoImg.setAttribute("height", "80px");
      // logoImg.setAttribute("width", "50px");
      logo.appendChild(logoImg);
      Navbar.appendChild(logo);
      botSpeak("Logo added Successfully");
    }
    // ADD LOGO TEXT
    if (check("logo") && check("text")) {
      var logoText = speechResult.slice(4, speechResult.length);
      if (logoText.length > 2 || logoText == 0) {
        botSpeak(
          "Sorry sir.Please provide logo text of minimum 1 word or maximum 2 words"
        );
      } else {
        for (let i = 0; i < logoText.length; i++) {
          logo.innerHTML += logoText[i];
        }
        botSpeak("logo text added successfully");
      }
      console.log(logoText);
    }
  }
};
