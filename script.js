const recognition = new webkitSpeechRecognition();
recognition.continous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 2;
recognition.rate = 1.5;
let speech = new SpeechSynthesisUtterance();
let NavItem = `<li class="nav-item">
<a class="nav-link active" href="#">SampleLink</a>
</li>`;
// let NavText = `<ul class="nav">
// <li class="nav-item">
//   <a class="nav-link active" href="#">SampleLink</a>
// </li>
// <li class="nav-item">
//   <a class="nav-link" href="#">SampleLink</a>
// </li>
// <li class="nav-item">
//   <a class="nav-link" href="#">SampleLink</a>
// </li>

<<<<<<< Updated upstream
=======
// </ul>`;
// const startBtn = document.querySelector("#startBtn");
const speakBtn = document.querySelector("#speakBtn");

function addNavbar() {
  // let NavBar = document.createElement("Navbar");
  // NavBar.innerHTML = NavText;
  // document.querySelector(".container").appendChild(NavBar);
  // NavBar.firstElementChild.classList.add("justify-content-center");
}

>>>>>>> Stashed changes
function greeting() {
  return "HELLO FROM GOKU";
}

const startBtn = document.querySelector("#startBtn");
const speakBtn = document.querySelector("#speakBtn");

speakBtn.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (e) => {
  const str = e.results[0][0]["transcript"];
  console.log(str);
  speech.text = str;
  //   window.speechSynthesis.speak(speech);

  const arr = str.split(" ");

  if (arr.includes("hello")) {
    speech.text = greeting();
    window.speechSynthesis.speak(speech);
  }
  if (arr.includes("header") && arr.includes("create")) {
    speech.text = "header created successfully";
    window.speechSynthesis.speak(speech);
    let navBar = document.createElement("ul");
    navBar.classList.add("nav");
    navBar.classList.add("justify-content-center");
    let navElements = parseInt(arr[arr.length - 2]);
    for (let i = 0; i < navElements; i++) {
      navBar.appendChild(NavItem);
    }
  }
};
