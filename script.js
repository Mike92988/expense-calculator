const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTrans =JSON.parse(localStorage.getItem('transactions'))

// const dummyTrans = [
//     { id: 1, text: "Flowers", amount: -25 },
//     { id: 2, text: "Salary", amount: 420 },
//     { id: 3, text: "Lunch", amount: -15 },
//     { id: 4, text: "Groceries", amount: -85 }
// ];

let transactions = localStorage.getItem('transactions') !== null ? localStorageTrans : [];

function addTransaction(e) {
    e.preventDefault()
    if(text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add Text and/or Amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }

        transactions.push(transaction)

        addTransactionDom(transaction);
        updateValues();
        updateLocalStorage()

        text.value = '';
        amount.value = ''
    }
}

//Generate random id 
function generateID() {
    return Math.floor(Math.random() * 420)
}

//Add transactions to DOM list

function addTransactionDom(transaction) {
    //Get Sign

    const sign = transaction.amount < 0 ? '-' : '+'

    const item = document.createElement('li')

    //Adds class based on value

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick ="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item)
}

//Update the balance, income, and expenses
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0)
    .toFixed(2);


    const income = amounts.filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2)
   
    const expense = 
    (amounts.filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1) .toFixed(2)
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}


function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage()

    init()
}

//Update local storage trans

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}


//Init app 
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDom)
    updateValues()
}
init();

form.addEventListener('submit', addTransaction)