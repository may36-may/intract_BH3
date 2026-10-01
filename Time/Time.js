let aimDay = new Date(2026,10, 14);

function setSpringFes() {
    aimDay = new Date(2026, 5, 27);
    const title = document.querySelector("h1");
    title.textContent = "2026年周年庆倒计时";
}

setInterval(() => {
    const now = new Date();
    const dt = Math.ceil((aimDay - now) / 1000);
    if (dt <= 0) { setSpringFes(); return; }
    flipAllCards(dt);
}, 1000);

const days_tens = document.querySelector("[data-days-tens]");
const days_ones = document.querySelector("[data-days-ones]");
const hours_tens = document.querySelector("[data-hours-tens]");
const hours_ones = document.querySelector("[data-hours-ones]");
const minutes_tens = document.querySelector("[data-minutes-tens]");
const minutes_ones = document.querySelector("[data-minutes-ones]");
const seconds_tens = document.querySelector("[data-seconds-tens]");
const seconds_ones = document.querySelector("[data-seconds-ones]");

function flipAllCards(time) {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600) % 24;
    const days = Math.floor(time / 86400);

    flip(days_tens, Math.floor(days / 10));
    flip(days_ones, days % 10);
    flip(hours_tens, Math.floor(hours / 10));
    flip(hours_ones, hours % 10);
    flip(minutes_tens, Math.floor(minutes / 10));
    flip(minutes_ones, minutes % 10);
    flip(seconds_tens, Math.floor(seconds / 10));
    flip(seconds_ones, seconds % 10);
}

function flip(flipCard, newNumber) {
    const topHalf = flipCard.querySelector(".top");
    const bottomHalf = flipCard.querySelector(".bottom");
    const startNumber = parseInt(topHalf.textContent);
    if (newNumber === startNumber) return;

    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    topHalf.textContent = startNumber;
    bottomHalf.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = newNumber;

    topFlip.addEventListener("animationstart", e => {
        topHalf.textContent = newNumber;
    });

    topFlip.addEventListener("animationend", e => {
        topFlip.remove();
    });

    bottomFlip.addEventListener("animationend", e => {
        bottomHalf.textContent = newNumber;
        bottomFlip.remove();
    });
    flipCard.append(topFlip, bottomFlip);
}