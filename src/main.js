import './sass/main.scss';

const form = document.getElementById('form');
const tipResult = document.getElementById('tip-result');
const totalResult = document.getElementById('total-result');
const resetBtn = document.getElementById('reset');
const error = document.getElementById('error');

const customTipInput = document.getElementById('custom');
const tipRadios = document.querySelectorAll('input[name="tip"]');

tipRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        customTipInput.value = '';
        customTipInput.classList.remove('success');
    });
});

customTipInput.addEventListener('input', () => {
    tipRadios.forEach(radio => radio.checked = false);
});

function calculateTip() {
    enableReset();

    const bill = parseFloat(form.bill.value.trim()) || 0;
    const people = parseFloat(form.people.value.trim()) || 0;

    if (people <= 0 || bill < 0) {
        return;
    }

    let tipPercent = 0;

    const selectedRadio = form.querySelector('input[name="tip"]:checked');
    const customTip = parseFloat(form.custom?.value);

    if (selectedRadio) {
        tipPercent = parseFloat(selectedRadio.value);
    } else if (customTip > 0) {
        tipPercent = customTip;
    }

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

    clearUI();
    disableReset();
}

function validateUI(e) {
    const value = parseFloat(e.target.value.trim());

    if (value > 0) {
        renderSuccess(e.target);
    } else {
        e.target.classList.remove('success');
    }

    if (e.target.name === 'people') {
        if (value <= 0) {
            renderError();
        } else {
            clearError();
        }
    }
}

function renderError() {
    form.people.classList.add('error');
    error.setAttribute('aria-hidden', 'false');
    error.classList.remove('is-hidden');
}

function clearError() {
    form.people.classList.remove('error');
    error.setAttribute('aria-hidden', 'true');
    error.classList.add('is-hidden');
}

function renderSuccess(el) {
    el.classList.remove('error');
    el.classList.add('success');
}

function clearSuccess() {
    form.querySelectorAll('input[type="number"]').forEach(input => input.classList.remove('success'));
}

function clearUI() {
    tipResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';

    clearSuccess();
    clearError();
}

function disableReset() {
    resetBtn.disabled = true;
}

function enableReset() {
    resetBtn.disabled = false;
}

// Event listeners
form.addEventListener('input', calculateTip);
form.querySelectorAll('input[type="number"]').forEach(input => input.addEventListener('blur', validateUI));
resetBtn.addEventListener('click', resetForm);
document.addEventListener('DOMContentLoaded', disableReset);