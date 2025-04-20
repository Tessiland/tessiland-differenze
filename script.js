let found = 0;
let timeLeft = 90;
const max = 7;
const timer = document.getElementById("timer");
const status = document.getElementById("status");
const hitboxes = document.querySelectorAll(".hitbox");
const restartBtn = document.getElementById("restart");

function startGame() {
  let interval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      status.innerHTML = "⏱️ Tempo scaduto!";
      restartBtn.style.display = "inline-block";
      hitboxes.forEach(hb => hb.style.pointerEvents = "none");
    }
  }, 1000);

  hitboxes.forEach(hb => {
    hb.addEventListener("click", () => {
      if (!hb.classList.contains("found")) {
        hb.classList.add("found");
        found++;
        updateStatus();
        if (found === max) {
          clearInterval(interval);
        }
      }
    });
  });
}

function updateStatus() {
  if (found >= max) {
    const parola = secretWords[Math.floor(Math.random() * secretWords.length)];
    status.innerHTML = `
      🎉 Hai trovato tutte le differenze!<br>
      Scrivi nei commenti della live:<br>
      <strong>Il tuo nome + un'emoji che ti rappresenta + la parola segreta:</strong><br><br>
      <strong>Parola segreta: <span style='font-size:22px;'>${parola}</span></strong>
    `;
  } else {
    status.textContent = "Differenze trovate: " + found + " su " + max;
  }
}

restartBtn.addEventListener("click", () => {
  location.reload();
});

window.onload = startGame;
