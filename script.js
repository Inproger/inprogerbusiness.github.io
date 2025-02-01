let money = 0;
let clickCount = 0;
let passiveIncome = 0;
let clickValue = 1;  // Başlangıçtaki tıklama değeri
let investments = {
    market: { cost: 500, income: 5, level: 0 },
    tech: { cost: 2000, income: 20, level: 0 },
    logistics: { cost: 5000, income: 50, level: 0 },
    transportation: { cost: 10000, income: 100, level: 0 },
    oil: { cost: 20000, income: 200, level: 0 }
};

// Oyun başladığında kayıtlı verileri yükle
function loadGame() {
    let savedMoney = localStorage.getItem("money");
    let savedClickCount = localStorage.getItem("clickCount");
    let savedPassiveIncome = localStorage.getItem("passiveIncome");
    let savedInvestments = JSON.parse(localStorage.getItem("investments"));
    
    if (savedMoney !== null) {
        money = parseFloat(savedMoney);
        clickCount = parseInt(savedClickCount);
        passiveIncome = parseFloat(savedPassiveIncome);
        investments = savedInvestments || investments;
        updateMoneyDisplay();
        updatePassiveIncomeDisplay();
        updateClickValueDisplay();
    }
}

// Oyunu kaydet
function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("passiveIncome", passiveIncome);
    localStorage.setItem("investments", JSON.stringify(investments));
}

// Pasif geliri ve yatırımları her 2 saniyede kaydet
function updatePassiveIncomeHourly() {
    setInterval(() => {
        money += passiveIncome;
        saveGame();  // Her 2 saniyede bir kaydet
        updateMoneyDisplay();
        updatePassiveIncomeDisplay();
    }, 2000); // Her 2 saniye başı (2000 ms)
}

// Oyun başlatma ve giriş ekranını kaldırma
function startGame() {
    let ceoName = document.getElementById("ceoName").value;
    let companyName = document.getElementById("companyName").value;

    if (ceoName === "" || companyName === "") {
        alert("Lütfen CEO ismi ve şirket ismi girin!");
        return;
    }

    // Şirket adı ve CEO ismini kaydet
    localStorage.setItem("companyName", companyName);
    localStorage.setItem("ceoName", ceoName);

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gamePanel").classList.remove("hidden");

    document.getElementById("gameTitle").innerText = `${companyName} Yönetimi`;

    loadGame();  // Kayıtlı verileri yükle

    updatePassiveIncomeHourly();  // Pasif gelir her 2 saniyede kaydedilecek ve artacak
}

// Tıklayarak para kazanma fonksiyonu
function earnMoney() {
    clickCount++;

    // Tıklama değerini güncelleme (100 tıklama = 1$, sonraki tıklamalar 1.50$, sonra artan miktar)
    if (clickCount <= 100) {
        money += clickValue;
    } else if (clickCount <= 300) {
        money += 1.50;
    } else {
        money += 1.75; // Sonraki tıklamalar %50 artmış değer
    }

    updateMoneyDisplay();
    updateClickValueDisplay();
}

// Para miktarını güncelle
function updateMoneyDisplay() {
    document.getElementById("money").innerText = money.toFixed(2);
}

// Tıklama değerini güncelle
function updateClickValueDisplay() {
    if (clickCount <= 100) {
        clickValue = 1;
    } else if (clickCount <= 300) {
        clickValue = 1.50;
    } else {
        clickValue = 1.75; // Sonraki tıklamalar %50 artmış değer
    }
    document.getElementById("clickValue").innerText = `${clickValue}$`;
}

// Pasif gelir değerini güncelle
function updatePassiveIncomeDisplay() {
    document.getElementById("passiveIncome").innerText = `${passiveIncome}$/saat`;
}

// Yatırım yapma fonksiyonu
function buyInvestment(type) {
    if (money >= investments[type].cost) {
        money -= investments[type].cost;
        passiveIncome += investments[type].income;
        investments[type].level++;

        // Yeni fiyatlar ve gelir
        investments[type].cost = Math.floor(investments[type].cost * 1.2);
        investments[type].income = Math.floor(investments[type].income * 1.1);

        updateMoneyDisplay();
        updatePassiveIncomeDisplay();
        alert(`${type} yatırımı başarılı! Gelirinizi arttırdınız.`);
        saveGame();  // Yatırım sonrası oyunu kaydet
    } else {
        alert("Yeterli paranız yok!");
    }
}

// Menü içeriklerini gizleyip gösterme fonksiyonu
function toggleMenu(menuType) {
    let menuContent = document.getElementById(menuType);

    // Eğer menü içerik gizliyse, aç ve diğerlerini kapat
    if (menuContent.classList.contains("hidden")) {
        hideAllMenus();
        menuContent.classList.remove("hidden");
    } else {
        menuContent.classList.add("hidden");
    }
}

// Tüm menü içeriklerini gizle
function hideAllMenus() {
    let allMenus = document.querySelectorAll(".menuContent");
    allMenus.forEach(menu => {
        menu.classList.add("hidden");
    });
}

// Sayfa yüklendiğinde oyun bilgilerini yükle
window.onload = function() {
    let ceoName = localStorage.getItem("ceoName");
    let companyName = localStorage.getItem("companyName");

    if (ceoName && companyName) {
        // Eğer CEO ve şirket ismi kaydedilmişse, giriş ekranını atla
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gamePanel").classList.remove("hidden");

        document.getElementById("gameTitle").innerText = `${companyName} Yönetimi`;
        loadGame();
        updatePassiveIncomeHourly();  // Pasif gelir her 2 saniyede kaydedilecek ve artacak
    } else {
        // Eğer CEO ve şirket ismi yoksa, giriş ekranını göster
        document.getElementById("startScreen").style.display = "block";
        document.getElementById("gamePanel").classList.add("hidden");
    }
}
