const buyPrice = document.getElementById("buyPrice");
const quantity = document.getElementById("quantity");
const currentPrice = document.getElementById("currentPrice");
const metal = document.getElementById("metal");
const result = document.getElementById("result");
const installBtn = document.getElementById("installBtn");

// Load saved data
window.onload = () => {
  buyPrice.value = localStorage.getItem("buyPrice") || "";
  quantity.value = localStorage.getItem("quantity") || "";
  currentPrice.value = localStorage.getItem("currentPrice") || "";
  metal.value = localStorage.getItem("metal") || "Gold";
};

// Save data
function saveData() {
  localStorage.setItem("buyPrice", buyPrice.value);
  localStorage.setItem("quantity", quantity.value);
  localStorage.setItem("currentPrice", currentPrice.value);
  localStorage.setItem("metal", metal.value);
}

function calculate() {
  const bp = parseFloat(buyPrice.value);
  const qty = parseFloat(quantity.value);
  const cp = parseFloat(currentPrice.value);

  if (isNaN(bp) || isNaN(qty) || isNaN(cp)) {
    result.innerHTML = "Please enter all values correctly.";
    return;
  }

  saveData();

  const invested = bp * qty;
  const current = cp * qty;
  const diff = current - invested;
  const status = diff >= 0 ? "Profit" : "Loss";

  result.innerHTML = `
    <strong>${metal.value} Summary</strong><br>
    Invested: Rs ${invested.toFixed(2)}<br>
    Current Value: Rs ${current.toFixed(2)}<br>
    ${status}: Rs ${diff.toFixed(2)}
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
