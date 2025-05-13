const countryCodeSelect = document.getElementById("country-code");
const phoneNumberInput = document.getElementById("phone-number");
const fullNumberDisplay = document.getElementById("full-number");

function updateFullNumber() {
  const code = countryCodeSelect.value;
  const number = phoneNumberInput.value.trim();
  if (number) {
    fullNumberDisplay.textContent = code + " " + number;
  } else {
    fullNumberDisplay.textContent = "";
  }
}

countryCodeSelect.addEventListener("change", updateFullNumber);
phoneNumberInput.addEventListener("input", updateFullNumber);
