const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const heroRadius = 10; // Размер главного героя
const heroSpeed = 6; // Скорость перемещения героя


// //Отрисовка квадратика на Canvas для контекстного меню
// function drawCuadro() {
//     ctx.fillStyle = 'orange';
//     ctx.fillRect(canvas.width - 95, canvas.height - 95, 95, 95); // Пример: квадратик для отображения меню
// }

// function drawSelectedMenuItem(text) {
//     ctx.fillRect(20, 20, 30, 30); // Повторное отображение квадрата
// }



// Обработчик события клика мыши
let menuVelue;
document.body.addEventListener('click', (e) => {
    // Если меню открыто и выбран пункт меню
    if (menu.style.display === 'block' && e.target.tagName === 'LI') {
        // Обработка выбора пункта меню
        console.log(`Выбран пункт: ${e.target.textContent}`);
        menuVelue = e.target.textContent;
        //drawSelectedMenuItem(e.target.textContent); // Вызов функции для отображения выбранного пункта
        menu.style.display = 'none';
    }

    else if  (menu2.style.display === 'block' && e.target.tagName === 'LI') {
        // Обработка выбора пункта меню
        console.log(`Выбран пункт: ${e.target.textContent}`);
        //drawSelectedMenuItem(e.target.textContent); // Вызов функции для отображения выбранного пункта
        menu2.style.display = 'none';
    }
});



//////////




let heroX = canvas.width / 2;
let heroY = 45;
let isMoving = false;
let targetX = heroX;
let targetY = heroY;



const mochilaX = canvas.width - 50;
const mochilaY = canvas.height - 55;
const mochilaRadius = 15;

const nfcX = canvas.width - 35;
const nfcY = 45;
const nfcRadius = 15;

// Функция для рисования главного героя на холсте
const heroImage = new Image();
heroImage.src = "stalker.jpg"; // Укажите путь к изображению




////////

let inZone = false; // Флаг для отслеживания нахождения в зоне
let inZone2 = false;

function drawHero() {
    const newWidth = 40;
    const newHeight = 64;
    ctx.drawImage(heroImage, heroX - newWidth / 2, heroY - newHeight / 2, newWidth, newHeight);
    
    
    // Проверка нахождения в зоне при каждом обновлении
    const isNowInZone = heroX > canvas.width - 95 && heroX < canvas.width && heroY > 0 && heroY < 120;

    if (isNowInZone && !inZone) {
        console.log('Главный герой вошел в зону NPC.');
        inZone = true;
    } else if (!isNowInZone && inZone) {
        console.log('Главный герой покинул зону NPC.');
        inZone = false;
    }

    const isNowInZone2 = heroX > canvas.width - 95 && heroX < canvas.width && heroY > canvas.height - 95 && heroY < canvas.height;

    if (isNowInZone2 && !inZone2) {
        console.log('Главный герой вошел в зону Рюкзака.');
        inZone2 = true;
    } else if (!isNowInZone2 && inZone2) {
        console.log('Главный герой покинул зону Рюкзака.');
        inZone2 = false;
    }
}



/////////// меню npc

const menu = document.getElementById('menu');
const menuItems = document.querySelectorAll('#menu ul li');

// Обработчик события нажатия правой кнопки мыши
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;


    let posCursor = x > canvas.width - 55 && x < canvas.width - 25 && y > 15 && y < 75;
    // Проверка, находится ли курсор в определенной области Canvas для отображения меню
    if (posCursor && inZone) { // Пример: область для меню
        // Позиционирование и отображение меню
        menu.style.display = 'block';
        menu.style.left = `${e.clientX}px`;
        menu.style.top = `${e.clientY}px`;
    }
});

//////////



// ///////// меню рюкзак

const menu2 = document.getElementById('menu2');
const menuItems2 = document.querySelectorAll('#menu2 ul li');

// Обработчик события нажатия правой кнопки мыши
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    let posCursor2 = x > canvas.width - 56 && x < canvas.width - 6 && y > canvas.height - 70 && y < canvas.height - 4;
    
    // canvas.width - 95, canvas.height - 95, 95, 95
    // Проверка, находится ли курсор в определенной области Canvas для отображения меню
    if (menuVelue === "Пункт 2" && posCursor2 && inZone2) { // Пример: область для меню
        // Позиционирование и отображение меню
        menu2.style.display = 'block';
        menu2.style.left = `${e.clientX}px`;
        menu2.style.top = `${e.clientY}px`;
    }
});


//////////






// NFC
const nfcImage = new Image();
nfcImage.src = "nfc.jpg"; // Укажите путь к изображению

function drawNfc() {
    const newWidth = 40;
    const newHeight = 64;
    ctx.drawImage(nfcImage, nfcX - newWidth / 2, nfcY - newHeight / 2, newWidth, newHeight);
}

// Mochila
const mochilaImage = new Image();
mochilaImage.src = "mochila.png";

function drawMochila() {
    ctx.drawImage(mochilaImage, mochilaX - mochilaRadius, mochilaY - mochilaRadius);
}



// Функция для очистки холста
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Функция для обновления состояния игры
function update() {
    clearCanvas();
    drawMochila();
    drawNfc();
    
    // drawCuadro();
    
    drawHero();
    moveHeroTowardsTarget();
    
}

// Функция для перемещения главного героя к целевой точке
function moveHeroTowardsTarget() {
    if (isMoving) {
        const deltaX = targetX - heroX;
        const deltaY = targetY - heroY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > heroSpeed) {
            const angle = Math.atan2(deltaY, deltaX);
            heroX += heroSpeed * Math.cos(angle);
            heroY += heroSpeed * Math.sin(angle);
        } else {
            heroX = targetX;
            heroY = targetY;
            isMoving = false;
        }
    }
}




// // Обработчик клика по холсту
function handleCanvasClick(e) {
    targetX = e.clientX - canvas.getBoundingClientRect().left;
    targetY = e.clientY - canvas.getBoundingClientRect().top;
    isMoving = true;
}


canvas.addEventListener('click', handleCanvasClick);


// Главный цикл игры
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
