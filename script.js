const STORAGE_KEY = "quizzingScoreBoard";
const plus10 = document.getElementById("plus10");
const plus15 = document.getElementById("plus15");
const minus = document.getElementById("minus");
const plus102 = document.getElementById("plus102");
const plus152 = document.getElementById("plus152");
const minus2 = document.getElementById("minus2");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const marginEl = document.getElementById("margin");
const differenceEl = document.getElementById("difference");
const resetButton = document.getElementById("reset");

function saveState() {
    const state = {
        score1: parseInt(score1.innerHTML, 10),
        score2: parseInt(score2.innerHTML, 10),
        team1: input1.value,
        team2: input2.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        return;
    }

    try {
        const state = JSON.parse(saved);
        score1.innerHTML = state.score1 != null ? state.score1 : score1.innerHTML;
        score2.innerHTML = state.score2 != null ? state.score2 : score2.innerHTML;
        input1.value = state.team1 != null ? state.team1 : input1.value;
        input2.value = state.team2 != null ? state.team2 : input2.value;
    } catch (error) {
        console.warn("Failed to load saved score state:", error);
    }
}

function getTeamName(inputEl, fallback) {
    return inputEl.value.trim() || fallback;
}

function updateScore(element, delta) {
    element.innerHTML = parseInt(element.innerHTML, 10) + delta;
    saveState();
}

plus10.onclick = function() {
    updateScore(score1, 10);
};
plus15.onclick = function() {
    updateScore(score1, 15);
};
minus.onclick = function() {
    updateScore(score1, -5);
};
plus102.onclick = function() {
    updateScore(score2, 10);
};
plus152.onclick = function() {
    updateScore(score2, 15);
};
minus2.onclick = function() {
    updateScore(score2, -5);
};

input1.oninput = saveState;
input2.oninput = saveState;

function changeColor() {
    const scoreValue1 = parseInt(score1.innerHTML, 10);
    const scoreValue2 = parseInt(score2.innerHTML, 10);

    if (scoreValue1 > scoreValue2) {
        score1.style.color = "green";
        score2.style.color = "red";
    } else if (scoreValue1 < scoreValue2) {
        score1.style.color = "red";
        score2.style.color = "green";
    } else {
        score1.style.color = "black";
        score2.style.color = "black";
    }
}

setInterval(changeColor, 100);

function margin() {
    const scoreValue1 = parseInt(score1.innerHTML, 10);
    const scoreValue2 = parseInt(score2.innerHTML, 10);
    const difference = Math.abs(scoreValue1 - scoreValue2);

    if (scoreValue1 > scoreValue2) {
        marginEl.innerHTML = getTeamName(input1, "Home team") + " is leading by";
    } else if (scoreValue1 < scoreValue2) {
        marginEl.innerHTML = getTeamName(input2, "Away team") + " is leading by";
    } else {
        marginEl.innerHTML = "The teams are tied";
    }

    differenceEl.innerHTML = difference;
}

setInterval(margin, 100);

resetButton.onclick = function() {
    score1.innerHTML = "0";
    score2.innerHTML = "0";
    saveState();
};

loadState();
margin();
changeColor();
