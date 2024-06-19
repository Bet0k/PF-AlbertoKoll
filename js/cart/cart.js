document.addEventListener('DOMContentLoaded', () => {
    const cartRoot = document.getElementById('cart-root');
    const totalAmountElement = document.getElementById('total-amount');

    // Traigo el carrito y el total del localStorage
    let cart = JSON.parse(localStorage.getItem('cart'));
    let totalAmount = parseFloat(localStorage.getItem('totalAmount'));
    
    if (cart && cart.length > 0) {
        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${item.description}</h3>
                <img src="${item.image}" alt="${item.description}" class="product-img">
                <h4>Precio: ${item.price}$</h4>
                <h5>Cantidad: <span class="quantity">${item.quantity}</span></h5>
                <button class="remove-btn" data-index="${index}">Eliminar</button>
            `;
            cartRoot.appendChild(card);
        });

        totalAmountElement.innerHTML = `<span class="total-amount">Monto total: ${totalAmount}$</span>`;

    } else {
        cartRoot.innerText = 'No hay productos en el carrito.';
    }

    // Agregar evento a los botones de eliminar
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            //event.target --> elemento que disparó el evento
            //dateset --> accede a los atributos de data
            //index --> posición del producto en el carrito
            const index = event.target.dataset.index;
            const item = cart[index];
            if (item.quantity > 1) {
                const quantityToRemove = prompt(`Tienes ${item.quantity} unidades de este producto. ¿Cuántas deseas eliminar?`, '1');
                if (quantityToRemove !== null) {
                    removeFromCart(index, parseInt(quantityToRemove));
                }
            } else {
                removeFromCart(index, 1);
            }
        });
    });
});

function removeFromCart(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let totalAmount = parseFloat(localStorage.getItem('totalAmount'));

    const item = cart[index];
    const itemTotalPrice = item.price * quantity;

    if (quantity >= item.quantity) {
        // Eliminar el item del carrito
        cart.splice(index, 1);
    } else {
        // Actualizar la cantidad del item
        item.quantity -= quantity;
    }

//Actualizar el totalAmount
    totalAmount -= itemTotalPrice;

//Guardar cambios en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2)); //Lo formatea en 2 si o si

// Recargar la página para actualizar la vista
    window.location.reload();
}

function finalizePurchase(){
    if(localStorage.getItem('totalAmount') > 0){
        alert(`Tu monto total a pagar es de: ${localStorage.getItem('totalAmount')}$ 💸\n\nLos métodos de pago son:\n💳  Tarjeta de crédito / débito\n💵  Efectivo en locales\n🏦  Transferencia Bancaria\n\nLuego coordinaremos el envío! 🚚✈️\n¡Que las disfrutes! ❤️`);
        localStorage.clear();
        window.location.href = '../pages/buyCards.html';
    }
    else{
        alert("No tenés cartas seleccionadas! Por favor, seleccioná al menos una")
    }

}
