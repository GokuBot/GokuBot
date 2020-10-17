const recognition = new webkitSpeechRecognition();
recognition.continous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 2;
let speech = new SpeechSynthesisUtterance();

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
  if (arr.includes("increase")) {
    speech.text = `Font Size Increased`;
    window.speechSynthesis.speak(speech);
    startBtn.style.fontSize = "3rem";
  }
  if (arr.includes("decrease")) {
    speech.text = `Font Size Decreased`;
    window.speechSynthesis.speak(speech);
    startBtn.style.fontSize = "1rem";
  }
  if (arr.includes("red")) {
    speech.text = `Color changed to Red`;
    window.speechSynthesis.speak(speech);
    startBtn.style.color = "red";
  }
  if (arr.includes("blue")) {
    speech.text = `Color changed to Blue`;
    window.speechSynthesis.speak(speech);
    startBtn.style.color = "blue";
  }
};
