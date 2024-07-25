let score = 0;
let pointsPerClick = 1;
let upgradeCost = 100;
let hourlyIncome = 359;
let level = 1;
let levelThreshold = 50000;
let levelReward = 15000;
let accumulatedScore = 0;

let cards = [
    { id: 1, name: "Ekzaton Manager", image: "NFT_1.jpg", level: 0, income: 100, upgradeCost: 1000},
    { id: 2, name: "Ekzaton Leader", image: "NFT_2.jpg", level: 0, income: 350, upgradeCost: 5000},
    { id: 3, name: "Ekzaton Banker", image: "NFT_3.jpg", level: 0, income: 500, upgradeCost: 15000},
    { id: 4, name: "Ekzaton Advizor", image: "NFT_4.jpg", level: 0, income: 150, upgradeCost: 2500},
    { id: 5, name: "Ekzaton Community", image: "NFT_5.jpg", level: 0, income: 1500, upgradeCost: 50000},
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
const progressBarFill = document.getElementById('progress-bar-fill');
const levelInfo = document.getElementById('level-info');

const translations = {
    az: {
        title: 'Ekzaton MinTap',
        score: 'Xal: ',
        upgrade: '+1 Xal Artırma ',
        income: 'Saatlıq Gəlir: ',
        card: 'Kart: ',
        cardUpgrade: 'Yeniləmə: ',
        cardsButton: 'Kartlara Bax',
        levelInfo: 'Səviyyə: ',
    },
    en: {
        title: 'Ekzaton MinTap',
        score: 'Score: ',
        upgrade: '+1 Point Upgrade ',
        income: 'Hourly Income: ',
        card: 'Card: ',
        cardUpgrade: 'Upgrade: ',
        cardsButton: 'View Cards',
        levelInfo: 'Level: ',
    },
    ru: {
        title: 'Ekzaton MinTap',
        score: 'Счёт: ',
        upgrade: ' +1 Очко  ',
        income: 'Часовой доход: ',
        card: 'Карта: ',
        cardUpgrade: 'Обновить: ',
        cardsButton: 'Посмотри на карты',
        levelInfo: 'Уровень: ',
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
    levelInfo.textContent = `${trans.levelInfo}${level} (${formatNumber(score)} / ${formatNumber(levelThreshold)} Xal)`;
    renderCards(lang);
}

function renderCards(lang) {
    const trans = translations[lang];
    cardsContainer.innerHTML = '';
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        const cardImg = document.createElement('img');
        cardImg.src = `Images/${card.image}`;
        cardImg.alt = card.name;
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        const cardName = document.createElement('p');
        cardName.textContent = `${trans.card} ${card.name}`;
        
        const cardLevel = document.createElement('p');
        cardLevel.textContent = `Level: ${card.level}`;
        
        const cardIncome = document.createElement('p');
        cardIncome.textContent = `Income: ${formatNumber(card.income)}/hour`;
        
        const cardUpgradeCost = document.createElement('p');
        cardUpgradeCost.textContent = `${trans.cardUpgrade} ${formatNumber(card.upgradeCost)}`;
        
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

function updateDisplay() {
    const lang = document.querySelector('.language-selector .active').id.split('-')[1];
    const trans = translations[lang];
    scoreDisplay.textContent = `${trans.score}${formatNumber(score)}`;
    incomeDisplay.textContent = `${trans.income}${formatNumber(hourlyIncome)}`;
    upgradeButton.textContent = `${trans.upgrade}${formatNumber(upgradeCost)}`;
    levelInfo.textContent = `${trans.levelInfo}${level} (${formatNumber(score)} / ${formatNumber(levelThreshold)} Xal)`;
    updateProgressBar();
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
    if (number < 1e4) return number.toString(); // 1,000 - 9,999 formatında
    if (number >= 1e33) return (number / 1e33).toFixed(1) + 'AG'; // AG
    if (number >= 1e30) return (number / 1e30).toFixed(1) + 'AF'; // AF
    if (number >= 1e27) return (number / 1e27).toFixed(1) + 'AD'; // AD
    if (number >= 1e24) return (number / 1e24).toFixed(1) + 'AC'; // AC
    if (number >= 1e21) return (number / 1e21).toFixed(1) + 'AB'; // AB
    if (number >= 1e18) return (number / 1e18).toFixed(1) + 'A'; // A
    if (number >= 1e15) return (number / 1e15).toFixed(1) + 'Q'; // Quadrillion
    if (number >= 1e12) return (number / 1e12).toFixed(1) + 'T'; // Trillion
    if (number >= 1e9) return (number / 1e9).toFixed(1) + 'B'; // Billion
    if (number >= 1e6) return (number / 1e6).toFixed(1) + 'M'; // Million
    if (number >= 1e4) return (number / 1e3).toFixed(1) + 'K'; // Thousand
    return number.toString(); // Format smaller numbers
}

function updateProgressBar() {
    const progress = (score / levelThreshold) * 100;
    progressBarFill.style.width = `${progress}%`;

    if (score >= levelThreshold) {
        level++;
        score += levelReward;
        levelThreshold *= 5;
        levelReward *= 2;
        updateDisplay();
    }
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

setInterval(() => {
    let secondIncome = hourlyIncome / 3600;
    accumulatedScore += secondIncome;
    score += Math.floor(accumulatedScore);
    accumulatedScore -= Math.floor(accumulatedScore); // Tam hissəni çıxırıq
    updateDisplay();
}, 1000);