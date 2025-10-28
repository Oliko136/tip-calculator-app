import './sass/main.scss';

const form = document.getElementById('form');
const tipResult = document.getElementById('tip-result');
const totalResult = document.getElementById('total-result');
const resetBtn = document.getElementById('reset');

function calculateTip() {
    const bill = parseFloat(form.bill.value) || 0;
    const people = parseFloat(form.people.value) || 1;

    let tipPercent = 0;

    const selectedRadio = form.querySelector('input[name="tip"]:checked');
    const customTip = parseFloat(form.custom?.value);

    clearTipUI();

    if (selectedRadio) {
        tipPercent = parseFloat(selectedRadio.value);
    } else if (customTip > 0) {
        tipPercent = customTip;
    }

    if (people <= 0) return;

    const tipAmount = (bill * (tipPercent / 100)) / people;
    const total = (bill / people) + tipAmount;

    renderResults(tipAmount, total);
}

function renderResults(tipAmount, total) {
    tipResult.textContent = `$${tipAmount.toFixed(2)}`;
    totalResult.textContent = `$${total.toFixed(2)}`;
}

function resetForm() {
    form.reset();

    tipResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
}

function clearTipUI() {
    const customTipInput = document.getElementById('custom');
    const tipRadios = document.querySelectorAll('input[name="tip"]');

    tipRadios.forEach(radio => {
        radio.addEventListener('change', () => customTipInput.value = '');
    });

    customTipInput.addEventListener('input', () => {
        tipRadios.forEach(radio => radio.checked = false);
    });
}

// Event listeners
form.addEventListener('input', calculateTip);
resetBtn.addEventListener('click', resetForm);