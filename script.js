//START SCREEN -----------------------------------------------------
let username = document.getElementById('usninput');
let usernameDisplay = document.getElementById('usn-display');
let enterUsn = document.getElementById('enter-usn');
let submitBtn = document.getElementById('submit-btn');
let startScreen = document.getElementById('start-screen');
let gameDisplay = document.getElementById('game-display');

var hp = 100;
var hunger = 100;
var hygiene = 100;
var mood = 100;
var money = 500;

submitBtn.addEventListener('click', function(){
    if(username.value === ''){
        enterUsn.style.display = 'block';
    } else {
        username = username.value;
        enterUsn.style.display = 'none';
        startScreen.style.display = 'none';
        startGame();
    }
});

function startGame(){
    gameDisplay.style.display = 'block';
    usernameDisplay.textContent = username;
    timerStart();
    checkCollision();
}

//GAME SCREEN -----------------------------------------------------
let hpBar = document.getElementById('hp-bar');
let hungerBar = document.getElementById('hunger-bar');
let hygieneBar = document.getElementById('hygiene-bar');
let moodBar = document.getElementById('mood-bar');
let moneyDisplay = document.getElementById('money-display');
let locationEl = document.getElementById('location-el');

let hpValue = document.getElementById('hp-value');
let hungerValue = document.getElementById('hunger-value');
let hygieneValue = document.getElementById('hygiene-value')
let moodValue = document.getElementById('mood-value');

let hpBtn = document.getElementById('hp-btn');
let hungerBtn = document.getElementById('hunger-btn');
let hygieneBtn = document.getElementById('hygiene-btn');
let moodBtn = document.getElementById('mood-btn');
let workBtn = document.getElementById('work-btn');
let workLateBtn = document.getElementById('worklate-btn');
let doctorBtn = document.getElementById('doctor-btn');
let gameBtn = document.getElementById('game-btn');
let gambleBtn = document.getElementById('gamble-btn');
let workoutBtn = document.getElementById('workout-btn');
let drinkBtn = document.getElementById('drink-btn');

const places = document.querySelectorAll('.place');
const buttons = document.querySelectorAll('.action-btn');


function timerStart(){
    setInterval(hpDown, 12000);
    setInterval(hungerDown, 1000);
    setInterval(hygieneDown, 3000);
    setInterval(moodDown, 2000);
    setInterval(statusCheck, 80);
    setInterval(checkCollision, 80);
}

function statusCheck(){
    if(hp > 100){
        hp = 100;
    } else if(hp < 0){
        gameOver();
    } 

    if(hunger > 100){
        hunger = 100;
    }else if(hunger < 0){
        hunger = 0;
    } 

    if(hygiene > 100){
        hygiene = 100;
    }else if(hygiene < 0){
        hygiene = 0;
    } 

    if(mood > 100){
        mood = 100;
    }else if(mood < 0){
        mood = 0;
    }

    updateStatus();
}

function hpDown(){
    hp--;
}

function hungerDown(){
    if(hunger > 0){
        hunger--;
    } else {
        hp--;
    };
}

function hygieneDown(){
    if(hygiene > 0){
        hygiene--;
    } else {
        hp--;
    };
}

function moodDown(){
    if(mood > 0){
        mood--;
    } else {
        hp--;
    };
}

function updateStatus(){
    hungerBar.style.width = hunger + '%';
    hungerValue.textContent = hunger;
    hygieneBar.style.width = hygiene + '%';
    hygieneValue.textContent = hygiene;
    moodBar.style.width = mood + '%';
    moodValue.textContent = mood;
    hpBar.style.width = hp + '%';
    hpValue.textContent = hp;
    moneyDisplay.textContent = money;
}

hpBtn.addEventListener('click', function(){
    hp += 30;
    showToast("Successfully slept through the night!", "+30 HP", "bg-success");
});

hungerBtn.addEventListener('click', function(){
    if(money >= 80){
        hunger += 100;
        money -= 80;
        showToast("You ate delicious food!", "+100 Hunger", "bg-success");
    } else {
        showToast("Not enough money to eat.", "Needed $80", "bg-danger");
    }
});

hygieneBtn.addEventListener('click', function(){    
    hygiene += 100;
    showToast("Successfully taken a shower!", "+100 Hygiene", "bg-success");
});

moodBtn.addEventListener('click', function(){
    if(money >= 75){
        mood += 50;
        money -= 75;
        showToast("The game was fun!", "-$75, +50 Mood", "bg-success");
    } else {
        showToast("Not enough money to play games.","Needed $75", "bg-danger");
    }
});

doctorBtn.addEventListener('click', function(){
    if(money > 1000){
        hp += 100;
        mood += 20;
        hunger += 50;
        money -= 1000;
        showToast("You feel better", "-$1000, +100 HP, +50 Hunger, +20 Mood", "bg-success");
    } else {
        showToast("Not enough money to see doctor.", "Needed $1000", "bg-danger");
    }
});

workBtn.addEventListener('click', function(){
    money += 300;
    mood -= 10;
    hp -= 2;
    showToast("You worked hard!", "+$300, -10 Mood, -2 HP", "bg-success");
});

workLateBtn.addEventListener('click', function(){
    money += 500;
    mood -= 12;
    hp -= 5;
    showToast("You worked extra hard!", "+$500, -12 Mood, -5 HP", "bg-success");
});

gambleBtn.addEventListener('click', function(){
    if(money < 500){
        showToast("Not enough money to gamble", "Needed $500", "bg-danger");
    } else {
        var x = Math.floor(Math.random() * 100);
        if(x <= 3){
            money += 10000;
            mood += 100;
            showToast("You won the gamble!", "+$10K, +100 Mood", "bg-success");
        } else {
            mood -= 8;
            money -= 500;
            showToast("You lost the gamble, of course", "-$500, -8 Mood", "bg-warning");
        }
    }
});

drinkBtn.addEventListener('click', function(){
    if(money >= 600){
        mood += 80;
        hp -= 5;
        money -= 600;
        showToast("That was some fine alcohol", "-$600, +80 Mood, -5 HP", "bg-success");
    } else {
        showToast("Not enough money to drink.", "Needed $600", "bg-danger");
    }
});

workoutBtn.addEventListener('click', function(){
    hp += 10;
    mood += 50;
    hygiene -= 40;
    showToast("You worked some sweat", "10 HP, +50 Mood, -40 Hygiene", "bg-success");
});

//GAME CONTROL
document.addEventListener('keydown', function(e) {
    const character = document.getElementById('character');
    const boundary = document.getElementsByClassName('display-area')[0];
    const speed = 30;

    let topPosition = parseInt(getComputedStyle(character).top) || 0;
    let leftPosition = parseInt(getComputedStyle(character).left) || 0;

    const boundTop = boundary.clientHeight - character.clientHeight;
    const boundLeft = boundary.clientWidth - character.clientWidth;

    switch (e.key.toLowerCase()) {
        case 'w': topPosition = Math.max(0, topPosition - speed); break;
        case 's': topPosition = Math.min(boundTop, topPosition + speed); break;
        case 'a': leftPosition = Math.max(0, leftPosition - speed); break;
        case 'd': leftPosition = Math.min(boundLeft, leftPosition + speed); break; 
    }

    character.style.left = leftPosition + 'px';
    character.style.top = topPosition + 'px';
});

function checkCollision() {
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.style.display = 'none';
    });

    document.querySelectorAll('.place').forEach(place => {
        if (isColliding(character, place)) {
            const placeType = place.dataset.place;
            const matchingBtns = document.querySelectorAll(`.action-btn[data-place="${placeType}"]`);
            locationEl.textContent = placeType;

            matchingBtns.forEach(btn => {
                btn.style.display = 'block';
            });
        }
    });
}

function isColliding(div1, div2) {
    const r1 = div1.getBoundingClientRect();
    const r2 = div2.getBoundingClientRect();
    
    return !(r1.right < r2.left || 
             r1.left > r2.right || 
             r1.bottom < r2.top || 
             r1.top > r2.bottom);
}

function showToast(message, status, color) {
    const toastEl = document.getElementById('game-toast');
    const toastMessage = document.getElementById('toast-message');
    const toastStatusMessage = document.getElementById('toast-status-message');

    toastMessage.innerText = message;
    toastStatusMessage.innerText = status;
    toastEl.className = `toast text-white w-100 ${color}`;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}
