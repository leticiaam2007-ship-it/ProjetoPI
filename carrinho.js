function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('carrinho', JSON.stringify(cart));
}

const listaCarrinho = document.getElementById('listaCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');

function renderCarrinho() {
  const carrinho = loadCart();
  listaCarrinho.innerHTML = '';

  let total = 0;

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = '<p>Carrinho vazio</p>';
    totalCarrinho.innerText = 'Total: R$ 0,00';
    return;
  }

  carrinho.forEach((item, index) => {
    total += item.preco;

    const div = document.createElement('div');
    div.classList.add('item-carrinho');

    div.innerHTML = `
      <strong>${item.nome}</strong><br>
      R$ ${item.preco.toFixed(2)}<br>
      <button class="remover" onclick="removerItem(${index})">
        Remover
      </button>
    `;

    listaCarrinho.appendChild(div);
  });

  totalCarrinho.innerText = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
  const carrinho = loadCart();
  carrinho.splice(index, 1);
  saveCart(carrinho);
  renderCarrinho();
}

// inicia
renderCarrinho();