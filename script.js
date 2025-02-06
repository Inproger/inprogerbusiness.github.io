let money = 0;
let clickCount = 0;
let passiveIncome = 0;
let clickValue = 1;
let investments = {
    market: { cost: 450, income: 5, level: 0 },
    tech: { cost: 2000, income: 20, level: 0 },
    logistics: { cost: 15000, income: 150, level: 0 },
    transportation: { cost: 30000, income: 300, level: 0 },
    oil: { cost: 50000, income: 500, level: 0 }
};

// Kullanıcı giriş yaptı mı kontrol et
function checkLogin() {
    let savedEmail = localStorage.getItem("email");
    let savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gamePanel").classList.remove("hidden");
        loadGame();
    }
}

// Kullanıcı giriş yaparsa bilgileri kaydet ve oyunu başlat
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Lütfen Gmail ve Parola girin!");
        return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gamePanel").classList.remove("hidden");

    loadGame();

    setInterval(() => {
        money += passiveIncome;
        updateMoneyDisplay();
    }, 3600000); // 1 saat
}

// Çıkış yap ve bilgileri temizle
function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    location.reload();
}

// Oyun bilgilerini yükle
function loadGame() {
    let savedMoney = localStorage.getItem("money");
    let savedClickCount = localStorage.getItem("clickCount");
    let savedPassiveIncome = localStorage.getItem("passiveIncome");
    let savedInvestments = JSON.parse(localStorage.getItem("investments"));

    if (savedMoney !== null) {
        money = parseFloat(savedMoney);
        clickCount = parseInt(savedClickCount);
        passiveIncome = parseFloat(savedPassiveIncome);
        investments = savedInvestments;
        updateMoneyDisplay();
        updatePassiveIncomeDisplay();
        updateClickValueDisplay();
    }
}

// Oyun otomatik olarak her 2 saniyede bir kaydedilecek
setInterval(saveGame, 2000);

function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("passiveIncome", passiveIncome);
    localStorage.setItem("investments", JSON.stringify(investments));
}

// Diğer oyun fonksiyonları (para kazanma, menü geçişleri vb.) aynı şekilde devam eder

window.onload = function() {
    checkLogin();
}
