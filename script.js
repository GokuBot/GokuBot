const recognition = new webkitSpeechRecognition();
recognition.continous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 2;
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

let Navbar,
  logo,
  logoImageSize = "80px";
isLogoAdded = false;
let collapseNavBar;
let collapseButton = `<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
`;

let navLink = `<li class="nav-item">
<a class="nav-link" href="#">Link</a>
</li>`;
let searchBar = `
<form class="form-inline my-2 my-lg-0">
  <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
</form>`;
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

function check(text) {
  return speechResult.includes(text);
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
function returnCapitalized(text) {
  return text
    .toLowerCase()
    .replace(/^[a-zA-z]|\s(.)/gi, (L) => L.toUpperCase());
}
function botSpeak(speechText) {
  speech.text = speechText;
  window.speechSynthesis.speak(speech);
}
// choice = 1 : 1 based indexing
// choice = 0 : 0 based indexing
function returnNumber(numberText, choice) {
  if (numberText === "to") {
    if (choice == 0) {
      return 1;
    }
    return 2;
  }
  if (numberText === "for") {
    if (choice === 1) {
      return 4;
    }
    return 3;
  }
  let arr = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let index = arr.indexOf(numberText);
  if (choice == 0) {
    index--;
  }

  return index;
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
      Navbar.classList.add("navbar-expand-lg");

      mainSection.appendChild(Navbar);
      let navName = check("header") ? "header" : "navbar";
      botSpeak(`${navName} created Successfully`);
    }
  }

  //  ADD BRAND LOGO
  if (check("add")) {
    if (check("logo") && check("brand") && speechResult.length === 3) {
      if (isLogoAdded === true) {
        botSpeak("Logo already added");
        return;
      }
      isLogoAdded = true;
      logo = document.createElement("a");
      logo.classList.add("navbar-brand");
      let logoImg = document.createElement("img");
      logoImg.src = "../images/LogoImage.png";
      logoImg.setAttribute("height", logoImageSize);
      // logoImg.setAttribute("width", "50px");
      logo.appendChild(logoImg);
      Navbar.appendChild(logo);
      Navbar.innerHTML += collapseButton;
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
        let logoP = document.createElement('span')
        for (let i = 0; i < logoText.length; i++) {

          logoP.innerText += returnCapitalized(logoText[i]);
        }
        document.querySelector(
          ".navbar-brand").appendChild(logoP)
        botSpeak("logo text added successfully");
      }
      console.log(logoText);
    }
    if (check("header") && check("links")) {
      let linksNumber = speechResult[1];
      let navElements;
      if (isNaN(linksNumber)) {
        navElements = returnNumber(linksNumber, 1);
      } else {
        navElements = parseInt(linksNumber);
      }
      if (linksNumber > 6 || linksNumber === 0) {
        botSpeak(
          "Sorry sir.Please provide minimum 1 or maximum 5 header links"
        );
      }
      collapseNavBar = document.createElement("div");
      collapseNavBar.classList.add("collapse");
      collapseNavBar.classList.add("navbar-collapse");
      let navList = document.createElement("ul");
      navList.classList.add("navbar-nav");
      navList.classList.add("mr-auto");
      for (let i = 0; i < navElements; i++) {
        navList.innerHTML += navLink;
      }
      collapseNavBar.appendChild(navList);
      Navbar.appendChild(collapseNavBar);
      botSpeak(`${navElements} header links added successfully`);
    }
    if (check("search") && check("bar")) {
      collapseNavBar.innerHTML += searchBar;
      botSpeak("Search bar added successfully");
    }
  }
  //UPDATE HEADER
  if (check("change") || check("update") || check("modify")) {
    if (check("header") || check("navbar")) {
      if (check("logo") && check("text")) {
        var logoText = speechResult.slice(5, speechResult.length);
        if (logoText.length > 2 || logoText == 0) {
          botSpeak(
            "Sorry sir.Please provide logo text of minimum 1 word or maximum 2 words"
          );
        } else {
          let logo = document.querySelector(".navbar-brand");
          let logoImg = document.createElement("img");
          logoImg.src = "../images/LogoImage.png";
          logoImg.setAttribute("height", logoImageSize);
          // logoImg.setAttribute("width", "50px");
          logo.innerHTML = "";
          logo.appendChild(logoImg);
          for (let i = 0; i < logoText.length; i++) {
            document.querySelector(
              ".navbar-brand"
            ).innerHTML += returnCapitalized(logoText[i]);
          }
          botSpeak("logo text added successfully");
        }
      }
      if (check("header") && (check("link") || check("linked"))) {
        let linksNumber = speechResult[3];
        let navLinks = document.querySelector(".navbar-nav").children.length;
        let navLinksNumber;
        if (isNaN(linksNumber)) {
          navLinksNumber = returnNumber(linksNumber, 0);
        } else {
          navLinksNumber = parseInt(linksNumber);
          navLinksNumber--;
        }

        if (navLinksNumber > navLinks || navLinksNumber < 0) {
          botSpeak("Sorry sir Please provide header link number in range");
          return;
        }

        document.querySelector(".navbar-nav").children[
          navLinksNumber
        ].children[0].innerText = returnCapitalized(
          speechResult[speechResult.length - 1]
        );
        botSpeak(
          `Header link ${linksNumber} changed to ${returnCapitalized(
            speechResult[speechResult.length - 1]
          )} successfully`
        );
      }
      if (check("background")) {

        let backgroundColour = speechResult.slice(4, speechResult.length).join("")

        document.querySelector(".navbar").style.backgroundColor = backgroundColour
        botSpeak(`header background changed to ${backgroundColour} successfully`)
      }
      if (check("logo") && check("colour")) {
        let colour = speechResult.slice(5, speechResult.length).join("")
        document.querySelector(".navbar-brand").style.color = colour
        console.log(colour)
        console.log(document.querySelector(".navbar-brand").style)
        botSpeak(`logo text colour change to ${colour} successfully`)

      }
    }
  }
};
