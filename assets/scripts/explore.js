// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const synth = window.speechSynthesis;
  const speakBtn = document.querySelector("button");
  const inputTxt = document.getElementById("text-to-speak");
  const smileIcon = document.getElementsByTagName("img")[0];
  const voiceSelect = document.querySelector("select");
  const smileOpenPath = "assets/images/smiling-open.png";
  const smileShutPath = "assets/images/smiling.png";

  let voices = [];

  function populateVoiceList() {
    voices = synth.getVoices();

    for (let i = 0; i < voices.length ; i++) {
      const option = document.createElement('option');
      option.textContent = `${voices[i].name} (${voices[i].lang})`;

      if (voices[i].default) {
        option.textContent += ' — DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  speakBtn.addEventListener('click', () => {
    smileIcon.src = smileOpenPath;
  
    const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    utterThis.addEventListener("end", () => {
      smileIcon.src = smileShutPath;
    })
    for (let i = 0; i < voices.length ; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    synth.speak(utterThis);
  
  });

  

}