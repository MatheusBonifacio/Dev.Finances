modal = {
  open() {
    //Abrir modal
    //Adicionar a class active no modal
    document.querySelector('.modal-overlay').classList.add('active');
  },
  close() {
    // fechar o modal
    // remover a class active do modal
    document.querySelector('.modal-overlay').classList.remove('active');
  },
};

// Eu preciso somar as entradas
// depois eu preciso somar saídas e
// remover das entradas o valor das saídas
// assim, eu terei o total

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || [];
  },

  set(transactions) {
    localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions));
  },
};

const Transaction = {
  all: Storage.get(''),
  //     [{
  //     description: 'Luz',
  //     amount: -11050,
  //     date: '10/01/2021',
  //   },
  //   {
  //     description: 'Website',
  //     amount: 150000,
  //     date: '15/01/2021',
  //   },
  //   {
  //     description: 'Escola',
  //     amount: -50000,
  //     date: '05/01/2021',
  //   },
  //   {
  //     description: 'Bike',
  //     amount: 500000,
  //     date: '18/02/2021',
  //   }],

  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },

  incomes() {
    // Somar as entradas
    let income = 0;
    //pegar todas as transações
    // para cada transação,
    Transaction.all.forEach((transaction) => {
      //se ela for maior que zero
      if (transaction.amount > 0) {
        //somar a uma variável e retornar a variável
        income += transaction.amount;
      }
    });
    return income;
  },
  expenses() {
    // Somar as saídas
    let expense = 0;
    //pegar todas as transações
    // para cada transação,
    Transaction.all.forEach((transaction) => {
      //se ela for menor que zero
      if (transaction.amount < 0) {
        //somar a uma variável e retornar a variável
        expense += transaction.amount;
      }
    });
    return expense;
  },
  total() {
    // Entradas - Saídas

    return Transaction.incomes() + Transaction.expenses();
  },
};

// Eu preciso pegar as minhas transações do meu
// objeto aqui no JS
// e colocar lá no HTML
// Ou...
// Substituir os dados do HTML com os dados do JS

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense';
    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação">
            </td>
        </tr>
        `;
    return html;
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes());
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses());
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total());
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = '';
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value.replace(/\,\./g, '')) * 100;

    return value;
  },

  formatDate(date) {
    const splittedDate = date.split('-');
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(value) {
    const signal = value < 0 ? '-' : '';
    const digits = String(value).replace(/\D/g, '');
    const decimal = Number(digits) / 100;
    const currency = decimal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return `${signal} ${currency}`;
  },
};

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();

    if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
      throw new Error('Por Favor, preencha todos os campos');
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();

    amount = Utils.formatAmount(amount);

    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  // saveTransaction(transaction){
  //     Transaction.add(transaction)
  // },

  clearFields() {
    Form.description.value = '';
    Form.amount.value = '';
    Form.date.value = '';
  },

  submit(event) {
    // verificar se todas as informações foram preenchidas
    event.preventDefault();

    try {
      Form.validateFields();
      // formatar os dados para salvar
      const transaction = Form.formatValues();
      // salvar
      Transaction.add(transaction);
      // apagar os dados do formulario
      Form.clearFields();
      // modal feche
      modal.close();
      // Atualizar a aplicação
      // App.reload() - Já tem um App.reload no add(transaction)
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });

    DOM.updateBalance();

    Storage.set(Transaction.all);
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();
