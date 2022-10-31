// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
   const hornSelect = document.getElementById('horn-select');
   const image = document.getElementsByTagName('img')[0];
   const playBtn = document.getElementsByTagName('button')[0];
   const volumeBar = document.getElementById('volume');
   const audioEle = document.getElementsByTagName('audio')[0];
   let showConfetti = false;
   const jsConfetti = new JSConfetti();

   hornSelect.addEventListener('change', () => {
      let selectedSound = hornSelect.value;

      let soundName;
      switch (selectedSound) {
         case 'air-horn':
            soundName = 'air-horn';
            showConfetti = false;
            break;
         case 'car-horn' :
            soundName = 'car-horn';
            showConfetti = false;
            break;
         case 'party-horn':
            soundName = 'party-horn';
            showConfetti = true;
            break;
      }

      setImage(soundName);
      setSound(soundName);
   });

   playBtn.addEventListener('click', () => {
      audioEle.play();

      if (showConfetti) {
         jsConfetti.addConfetti({
            confettiColors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',], confettiRadius: 6,
         })
         jsConfetti.clearCanvas()
      }
   });

   volumeBar.addEventListener('change', () => {
      let val = volumeBar.value;

      audioEle.volume = val / 100;
      if (val == 0) {
         setIcon(0);
      } else if (val < 33) {
         setIcon(1)
      } else if (val < 66) {
         setIcon(2);
      } else {
         setIcon(3);
      }
   })

   function setImage(sound) {
      let imagePath = './assets/images/';
      image.src = imagePath + sound + '.svg';
      image.alt = 'sound-level' + sound;
   }

   function setIcon(volumeLevel) {
      let iconImg = document.getElementsByTagName('img')[1];
      let iconPath = './assets/icons/volume-level-';
      iconImg.src = iconPath + volumeLevel + '.svg';
   }

   function setSound(soundName) {
      let path = './assets/audio/';
      audioEle.src = path + soundName + '.mp3';
   }

   function css(element, style) {
      for (const property in style) {
         element.style[property] = style[property];
      }
   }
}

