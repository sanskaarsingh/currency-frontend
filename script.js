const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const convertBtn = document.getElementById('convert-btn');
const rateDisplay = document.getElementById('rate-display');
const resultDisplay = document.getElementById('result-display');
const errorMessage = document.getElementById('error-message');
const API_URL = '/api/rates';

// Initialize with empty displays
document.addEventListener('DOMContentLoaded', () => {
    amountInput.value = 1;
    fromCurrency.value = 'INR';
    toCurrency.value = 'USD';
    rateDisplay.textContent = '';
    resultDisplay.textContent = '';
});

// Only fetch and convert when button is clicked
convertBtn.addEventListener('click', async function() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = 'Please enter a valid amount';
        return;
    }

    try {
        const response = await fetch(`${API_URL}?from=${from}&to=${to}`);
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message);
        }
        
        const rate = data.rate;
        rateDisplay.textContent = `1 ${from} = ${rate.toFixed(6)} ${to}`;
        resultDisplay.textContent = `${amount} ${from} = ${(amount * rate).toFixed(6)} ${to}`;
        
        errorMessage.style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.style.display = 'block';
        
        // Fallback demo data only when specifically INR to USD
        if (from === 'INR' && to === 'USD') {
            rateDisplay.textContent = `1 INR = ${DEMO_RATE} USD (demo data)`;
            resultDisplay.textContent = `${amount} INR = ${(amount * DEMO_RATE).toFixed(6)} USD`;
        }
    }
});

// Remove these automatic conversion triggers:
// amountInput.addEventListener('input', updateResult);
// fromCurrency.addEventListener('change', fetchExchangeRate);
// toCurrency.addEventListener('change', fetchExchangeRate);
