document.addEventListener('DOMContentLoaded', () => {
    const cartRoot = document.getElementById('cart-root');
    const totalAmountElement = document.getElementById('total-amount');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    if (cart.length > 0) {
        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('cardCart');
            card.innerHTML = `
                <img src='${item.image}' alt='${item.description}' class='product-img'>
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <h4>Precio: ${item.price}$</h4>
                    <div class="quantity-container">
                        <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                    </div>
                </div>
            `;
            cartRoot.appendChild(card);
        });

        totalAmountElement.innerHTML = `<span class="total-amount">Monto total: ${totalAmount.toFixed(2)}$</span>`;
    } else {
        cartRoot.innerText = 'No hay productos en el carrito.';
    }

    // Agregar evento a los botones de cambiar cantidad
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            const action = event.target.dataset.action;
            updateQuantity(index, action);
        });
    });
});

function updateQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    const item = cart[index];

    if (action === 'increase') {
        item.quantity += 1;
        totalAmount += item.price;
    } else if (action === 'decrease') {
        if (item.quantity > 1) {
            item.quantity -= 1;
            totalAmount -= item.price;
        } else {
            totalAmount -= item.price;
            cart.splice(index, 1);
            window.location.reload();
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', totalAmount);

    // Actualizar la vista sin recargar la página
    updateCartView();
}

function updateCartView() {
    const cartRoot = document.getElementById('cart-root');
    const totalAmountElement = document.getElementById('total-amount');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    // Limpiar el contenido actual
    cartRoot.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('cardCart');
            card.innerHTML = `
                <img src='${item.image}' alt='${item.description}' class='product-img'>
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <h4>Precio: ${item.price}$</h4>
                    <div class="quantity-container">
                        <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                    </div>
                </div>
            `;
            cartRoot.appendChild(card);
        });

        totalAmountElement.innerHTML = `<span class="total-amount">Monto total: ${totalAmount.toFixed(2)}$</span>`;

        // Re-agregar eventos a los botones de cambiar cantidad
        const quantityButtons = document.querySelectorAll('.quantity-btn');
        quantityButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                const action = event.target.dataset.action;
                updateQuantity(index, action);
            });
        });
    } else {
        cartRoot.innerText = 'No hay productos en el carrito.';
    }
}

document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    if (totalAmount > 0) {
        const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
        const finalModal = new bootstrap.Modal(document.getElementById('purchaseConfirmationModal'));
        paymentModal.hide();
        finalModal.show();

        document.getElementById('exitBuy').onclick = function() {
            localStorage.clear();
            window.location.href = '../pages/buyCards.html';
        };
    } else {
        const noCardsModal = new bootstrap.Modal(document.getElementById('noCardsModal'));
        noCardsModal.show();
    }
});

function finalizePurchase() {
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    if (totalAmount > 0) {
        const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
        paymentModal.show();
    } else {
        const noCardsModal = new bootstrap.Modal(document.getElementById('noCardsModal'));
        noCardsModal.show();
    }
}