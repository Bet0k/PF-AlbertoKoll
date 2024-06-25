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

        totalAmountElement.innerHTML = `<span class="total-amount">Monto total: ${totalAmount}$</span>`;
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
        }
    }

    // Guardar cambios en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));

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

        totalAmountElement.innerHTML = `<span class="total-amount">Monto total: ${totalAmount}$</span>`;

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

function finalizePurchase() {
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    if (totalAmount > 0) {
        alert(`Tu monto total a pagar es de: ${totalAmount}$ 💸\n\nLos métodos de pago son:\n💳  Tarjeta de crédito / débito\n💵  Efectivo en locales\n🏦  Transferencia Bancaria\n\nLuego coordinaremos el envío! 🚚✈️\n¡Que las disfrutes! ❤️`);
        localStorage.clear();
        window.location.href = '../pages/buyCards.html';
    } else {
        alert("No tenés cartas seleccionadas! Por favor, seleccioná al menos una");
    }
}