// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
   const synth = window.speechSynthesis;
   const playBtn = document.getElementsByTagName('button')[0];
   const inputTxt = document.getElementById('text-to-speak');
   const voiceSelect = document.querySelector('select');
   const smileImg = document.getElementsByTagName('img')[0];

   const smilingOpenImgPath = './assets/images/smiling-open.png';
   const smilingImgPath = './assets/images/smiling.png';

   let voices = [];

   populateVoiceList();

   if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
   }

   playBtn.addEventListener('click', () => {
      smileImg.src = smilingOpenImgPath;

      const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
      utterThis.addEventListener('end', () => {
         smileImg.src = smilingImgPath;
      })

      const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      for (let i = 0; i < voices.length; i++) {
         if (voices[i].name === selectedOption) {
            utterThis.voice = voices[i];
         }
      }

      synth.speak(utterThis);

   });

   function populateVoiceList() {
      voices = synth.getVoices();

      for (let i = 0; i < voices.length; i++) {
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
}
