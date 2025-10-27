import './sass/main.scss';

const form = document.getElementById('form');
const tipResult = document.getElementById('tip-result');
const totalResult = document.getElementById('total-result');
const resetBtn = document.getElementById('reset');

function calculateTip() {
    const bill = parseFloat(form.bill.value) || 0;
    const tipPercent = parseFloat(form.tip.value) || 0;
    const people = parseFloat(form.people.value) || 1;

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

// Event listeners
form.addEventListener('change', calculateTip);
resetBtn.addEventListener('click', resetForm);