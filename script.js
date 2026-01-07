const buyPrice = document.getElementById("buyPrice");
const amount = document.getElementById("amount");
const currentPrice = document.getElementById("currentPrice");
const metal = document.getElementById("metal");
const result = document.getElementById("result");
const installBtn = document.getElementById("installBtn");

const TOLA_GRAMS = 11.66;

// Load saved data
window.onload = () => {
  buyPrice.value = localStorage.getItem("buyPrice") || "";
  amount.value = localStorage.getItem("amount") || "";
  currentPrice.value = localStorage.getItem("currentPrice") || "";
  metal.value = localStorage.getItem("metal") || "Silver";
};

// Save data
function saveData() {
  localStorage.setItem("buyPrice", buyPrice.value);
  localStorage.setItem("amount", amount.value);
  localStorage.setItem("currentPrice", currentPrice.value);
  localStorage.setItem("metal", metal.value);
}

function calculate() {
  const purchasePerTola = parseFloat(buyPrice.value);
  const investedAmount = parseFloat(amount.value);
  const currentPerTola = parseFloat(currentPrice.value);

  if (
    isNaN(purchasePerTola) ||
    isNaN(investedAmount) ||
    isNaN(currentPerTola)
  ) {
    result.innerHTML = "Please enter all values correctly.";
    return;
  }

  saveData();

  // Core bullion logic
  const tolasOwned = investedAmount / purchasePerTola;
  const gramsOwned = tolasOwned * TOLA_GRAMS;
  const currentWorth = tolasOwned * currentPerTola;
  const profitLoss = currentWorth - investedAmount;

  const status = profitLoss >= 0 ? "Profit" : "Loss";

  result.innerHTML = `
    <strong>${metal.value} Investment Summary</strong><br>
    Tolas Owned: ${tolasOwned.toFixed(4)}<br>
    Grams Owned: ${gramsOwned.toFixed(2)} g<br>
    Invested Amount: Rs ${investedAmount.toFixed(2)}<br>
    Current Value: Rs ${currentWorth.toFixed(2)}<br>
    ${status}: Rs ${profitLoss.toFixed(2)}
  `;
}

// Install PWA
let deferredPrompt;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block";
});

installBtn.addEventListener("click", () => {
  deferredPrompt.prompt();
});
