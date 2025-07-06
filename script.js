
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const convertBtn = document.getElementById('convert-btn');
const rateDisplay = document.getElementById('rate-display');
const resultDisplay = document.getElementById('result-display');
const errorMessage = document.getElementById('error-message');
const API_URL = 'https://currencyconverter.onrender.com/api/rates';


document.addEventListener('DOMContentLoaded', () => {
   
    amountInput.value = 1;
    fromCurrency.value = 'INR';
    toCurrency.value = 'USD';
    
    
    fetchExchangeRate();
});


convertBtn.addEventListener('click', fetchExchangeRate);
amountInput.addEventListener('input', updateResult);
fromCurrency.addEventListener('change', fetchExchangeRate);
toCurrency.addEventListener('change', fetchExchangeRate);


async function fetchExchangeRate() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    
    try {
        const response = await fetch(`${API_URL}?from=${from}&to=${to}`);
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message);
        }
        
      
        rateDisplay.textContent = `1 ${from} = ${data.rate.toFixed(6)} ${to}`;
        updateResult();
        
   
        errorMessage.style.display = 'none';
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        showError(error.message);
        
       
        if (from === 'INR' && to === 'USD') {
            rateDisplay.textContent = '1 INR = 0.012 USD (demo data)';
            updateResult();
        }
    }
}


function updateResult() {
    const amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = 'Please enter a valid amount';
        return;
    }
    
    const rateText = rateDisplay.textContent;
    if (!rateText.includes('=')) return;
    
    const rate = parseFloat(rateText.split('=')[1].trim().split(' ')[0]);
    const result = (amount * rate).toFixed(6);
    const toCurrencySymbol = rateText.split('=')[1].trim().split(' ')[1];
    
    resultDisplay.textContent = `${amount} ${fromCurrency.value} = ${result} ${toCurrencySymbol}`;
}


function showError(message) {
    errorMessage.textContent = `Error: ${message}`;
    errorMessage.style.display = 'block';
}