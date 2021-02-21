modal = {
    open(){
      //Abrir modal
      //Adicionar a class active no modal
      document
      .querySelector('.modal-overlay')
      .classList
      .add('active')

    },
    close(){
      // fechar o modal
      // remover a class active do modal
      document
      .querySelector('.modal-overlay')
      .classList.
      remove('active')
    }
  }

  const transactions = [
      {
        id: 1,
        description: 'Luz',
        amount: -11050,
        date: '23/01/2021',
      },
      {
        id: 2,
        description: 'Website',
        amount: -150000,
        date: '23/01/2021',
      },
      {
        id: 3,
        description: 'Escola',
        amount: -50000,
        date: '23/01/2021',
      },
]


  // Eu preciso somar as entradas
  // depois eu preciso somar saídas e 
  // remover das entradas o valor das saídas
  // assim, eu terei o total



const Transaction = {
    incomes(){
        // Somar as entradas

    },
    expenses(){
        // Somar as saídas

    },
    total(){
        // Entradas - Saídas

    }
}

// Eu preciso pegar as minhas transações do meu
// objeto aqui no JS
// e colocar lá no HTML
// Ou...
// Substituir os dados do HTML com os dados do JS

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
 
        DOM.transactionsContainer.appendChild(tr)

    },

    innerHTMLTransaction(transaction){
        
        const html = `
        <tr>
            <td class="description">${transaction.description}</td>
            <td class="expense">${transaction.amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
        </tr>
        `
        return html

}
}



transactions.forEach(function (transaction) {
    DOM.addTransaction(transaction)
})