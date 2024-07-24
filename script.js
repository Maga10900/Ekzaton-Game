let score = 0;
let pointsPerClick = 1;
let upgradeCost = 100;
let hourlyIncome = 100000;

let cards = [
    { id: 1, name: "Usdad Shir", image: "EkzatonPH.jpg", level: 0, income: 5, upgradeCost: 50, startPrice: 100 },
    { id: 2, name: "Ekzaton Krali", image: "EkzatonPH.jpg", level: 0, income: 10, upgradeCost: 100, startPrice: 200 },
];

const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('click-button');
const upgradeButton = document.getElementById('upgrade-button');
const incomeDisplay = document.getElementById('income');
const gameTitle = document.getElementById('game-title');
const cardsContainer = document.getElementById('cards');
const cardsButton = document.getElementById('cards-button');
const cardsModal = document.getElementById('cards-modal');
const closeModal = document.getElementById('close-modal');

// Dil məlumatları
const translations = {
    az: {
        title: 'Ekzaton MinTap',
        score: 'Xal: ',
        upgrade: '+1 Xal Artırma ',
        income: 'Saatlıq Gəlir: ',
        card: 'Kart: ',
        cardUpgrade: 'Yeniləmə: ',
        cardsButton: 'Kartlara Bax',
    },
    en: {
        title: 'Ekzaton MinTap',
        score: 'Score: ',
        upgrade: '+1 Point Upgrade ',
        income: 'Hourly Income: ',
        card: 'Card: ',
        cardUpgrade: 'Upgrade: ',
        cardsButton: 'View Cards',
    },
    ru: {
        title: 'Ekzaton MinTap',
        score: 'Счёт: ',
        upgrade: ' +1 Очко  ',
        income: 'Часовой доход: ',
        card: 'Карта: ',
        cardUpgrade: 'Обновить: ',
        cardsButton: 'Посмотри на карты',
    }
};

function setLanguage(lang) {
    document.getElementById('lang-az').classList.remove('active');
    document.getElementById('lang-en').classList.remove('active');
    document.getElementById('lang-ru').classList.remove('active');
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    const trans = translations[lang];
    gameTitle.textContent = trans.title;
    scoreDisplay.textContent = `${trans.score}${formatNumber(score)}`;
    upgradeButton.textContent = `${trans.upgrade}${formatNumber(upgradeCost)}`;
    incomeDisplay.textContent = `${trans.income}${formatNumber(hourlyIncome)}`;
    cardsButton.textContent = trans.cardsButton;
    renderCards(lang);
}

function renderCards(lang) {
    const trans = translations[lang];
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        const cardImg = document.createElement('img');
        cardImg.src = `Images/${card.image}`; // Şəkil yolunu düzəldin
        cardImg.alt = card.name;
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        const cardName = document.createElement('p');
        cardName.textContent = `${trans.card} ${card.name}`;
        
        const cardLevel = document.createElement('p');
        cardLevel.textContent = `Level: ${card.level}`;
        
        const cardIncome = document.createElement('p');
        cardIncome.textContent = `Income: ${card.income}/hour`;
        
        const cardUpgradeCost = document.createElement('p');
        cardUpgradeCost.textContent = `${trans.cardUpgrade} ${card.upgradeCost}`;
        
        const cardUpgradeButton = document.createElement('button');
        cardUpgradeButton.textContent = `${trans.cardUpgrade}`;
        cardUpgradeButton.addEventListener('click', () => upgradeCard(card.id));
        
        cardContent.appendChild(cardName);
        cardContent.appendChild(cardLevel);
        cardContent.appendChild(cardIncome);
        cardContent.appendChild(cardUpgradeCost);
        cardContent.appendChild(cardUpgradeButton);
        
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardContent);
        
        cardsContainer.appendChild(cardDiv);
    });
}

function upgradeCard(cardId) {
    const card = cards.find(c => c.id === cardId);
    if (score >= card.upgradeCost) {
        score -= card.upgradeCost;
        card.level++;
        hourlyIncome += card.income;
        card.income += card.level * 5;
        card.upgradeCost *= 2;
        updateDisplay();
    }
}

function updateHourlyIncome() {
    hourlyIncome = cards.reduce((sum, card) => sum + card.income, 0);
}

function updateDisplay() {
    const lang = document.querySelector('.language-selector .active').id.split('-')[1];
    const trans = translations[lang];
    scoreDisplay.textContent = `${trans.score}${formatNumber(score)}`;
    incomeDisplay.textContent = `${trans.income}${formatNumber(hourlyIncome)}`;
    upgradeButton.textContent = `${trans.upgrade}${formatNumber(upgradeCost)}`;
    renderCards(lang);
}

function checkUpgradeAvailability() {
    if (score >= upgradeCost) {
        upgradeButton.disabled = false;
    } else {
        upgradeButton.disabled = true;
    }
}

function calculateUpgradeCost(level) {
    return Math.floor(100 * Math.pow(3.5, level));
}

function formatNumber(number) {
    if (number >= 1e9) return (number / 1e9).toFixed(1) + 'B';
    if (number >= 1e6) return (number / 1e6).toFixed(1) + 'M';
    if (number >= 1e4) return (number / 1e3).toFixed(1) + 'K';
    return number;
}

function animateClick(event, points) {
    const animationElement = document.createElement('div');
    animationElement.textContent = `+${points}`;
    animationElement.className = 'click-animation';
    animationElement.style.left = `${event.clientX}px`;
    animationElement.style.top = `${event.clientY}px`;
    document.body.appendChild(animationElement);

    setTimeout(() => {
        animationElement.remove();
    }, 2000);
}

clickButton.addEventListener('click', (event) => {
    score += pointsPerClick;
    animateClick(event, pointsPerClick);
    updateDisplay();
    animateButton(event);
    checkUpgradeAvailability();
});

upgradeButton.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        pointsPerClick++;
        upgradeCost = calculateUpgradeCost(pointsPerClick);
        updateDisplay();
        checkUpgradeAvailability();
    }
});

cardsButton.addEventListener('click', () => {
    cardsModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cardsModal.style.display = 'none';
});

function animateButton(event) {
    const rect = clickButton.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 5;
    const rotateY = (x - centerX) / 5;

    clickButton.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    setTimeout(() => {
        clickButton.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }, 200);
}

document.getElementById('lang-az').addEventListener('click', () => setLanguage('az'));
document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
document.getElementById('lang-ru').addEventListener('click', () => setLanguage('ru'));

setLanguage('az');

// Saatlıq gəlir qazanılması
setInterval(() => {
    let secondIncome = hourlyIncome / 3600; // Saatlıq gəliri saniyeye bölmək
    score += Math.floor(secondIncome); // Hər saniye gəliri xal əlavə etmək
    updateDisplay();
}, 1000);