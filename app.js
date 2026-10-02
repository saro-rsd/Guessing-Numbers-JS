let randomNumber = Math.floor(Math.random() * 10) + 1;
const input = document.getElementById("guessNumber");
const p1 = document.getElementById("p1");
const mystery = document.getElementById("mystery");
const chips = document.getElementById("chips");
let tries = 0;

for (let i = 1; i <= 10; i++) {
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = i;
    b.style.color = "var(--paper)";
    b.style.backgroundColor = "var(--lightblue)";
    b.onclick = () => { input.value = i; markChip(); };
    chips.appendChild(b);
}


input.addEventListener("input", markChip);
input.addEventListener("keydown", e => { if (e.key === "Enter") btnSubmitOnAction(); });

function btnSubmitOnAction() {
    const guessNumber = parseInt(input.value, 10);

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 10) {
        Swal.fire({ icon: "error", title: "Oops...", text: "Enter a number from 1 to 10." });
        return;
    }
    tries++;

    if (guessNumber === randomNumber) {
        mystery.textContent = randomNumber;
        p1.textContent = "Correct! You got it in " + tries + (tries === 1 ? " try." : " tries.");
        Swal.fire({ icon: "success", title: "You got it!", text: "The number was " + randomNumber + "." });
        document.getElementById("correctImage").style.display = "block";
    } else if (guessNumber < randomNumber) {
        p1.textContent = guessNumber + " is too low. Try higher.";
        Swal.fire({ icon: "error", title: "Oops...", text: "Your guess is too low!" });
        document.getElementById("wrongImage").style.display = "none";
    } else {
        p1.textContent = guessNumber + " is too high. Try lower.";
        Swal.fire({ icon: "error", title: "Oops...", text: "Your guess is too high!" });
        document.getElementById("wrongImage").style.display = "block";
    }
}

function newGame() {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    tries = 0;
    input.value = "";
    p1.textContent = "";
    mystery.textContent = "?";
    markChip();
}