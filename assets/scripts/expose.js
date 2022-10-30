// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const hornSelect = document.getElementById("horn-select");
  const image = document.getElementsByTagName("img")[0];
  const audio = document.querySelector("audio");
  const playSoundButton = document.querySelector("button");
  const volBar = document.getElementById("volume");

  hornSelect.addEventListener("change", () => {
    let sound = hornSelect.value;
    let imgPath = "assets/images/";
    image.src = imgPath + sound + ".svg";
    let soundPath = "assets/audio/";
    audio.src = soundPath + sound + ".mp3";

    
  });

  playSoundButton.addEventListener("click", () => {
    audio.play();
    if(hornSelect.value == "party-horn"){
      showConfetti();
    }
  }); 

  volBar.addEventListener('change', () => {
    let value = volBar.value;
    audio.volume = value / 100;
    let icon = document.getElementsByTagName('img')[1];
    let iconPath = "/assets/icons/volume-level-";
    if (value == 0) {
      icon.src = iconPath + "0" + ".svg";
    } else if (value < 33) {
      icon.src = iconPath + "1" + ".svg";
    } else if (value < 66) {
      icon.src = iconPath + "2" + ".svg";
    } else {
      icon.src = iconPath + "3" + ".svg";
    }
 })

 function showConfetti() {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({
    confettiColors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',], 
    confettiRadius: 6,
    confettiNumber: 500,
  });
  jsConfetti.clearCanvas()
 }
}