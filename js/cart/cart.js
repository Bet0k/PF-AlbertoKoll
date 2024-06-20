document.addEventListener('DOMContentLoaded', () => {
    const cartRoot = document.getElementById('cart-root');
    const totalAmountElement = document.getElementById('total-amount');

    // Traigo el carrito y el total del localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
    
    if (cart.length > 0) {
        cart.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('cardCart');
            card.innerHTML = `
                <img src='${item.image}' alt='${item.description}' class='product-img'>
                <h3>${item.name}</h3>
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
            const index = event.target.dataset.index;
            const item = cart[index];
            let quantityToRemove = prompt(`Tienes ${item.quantity} unidades de este producto. ¿Cuántas deseas eliminar?`, '1');

            //La idea es: validar que el número sea entero, nada de 1.5, 1-5, etc.
            //Luego lo pasa a INT base 10

            if (!isValidInteger(quantityToRemove)) {
                alert('Por favor, ingresa un número entero válido.');
                return;
            }

            quantityToRemove = parseInt(quantityToRemove, 10);

            if (quantityToRemove > item.quantity) {
                alert(`No posees esa cantidad de este producto.\nPor favor ingresa un número igual o menor a ${item.quantity}.`);
                return;
            }
            else if(quantityToRemove == 0){
                alert("El número que ingresas para eliminar una cantidad de cartas debe ser mayor a 0.")
            }
            removeFromCart(index, quantityToRemove);
        });
    });
});

function isValidInteger(input) {
    //^\d+$: verifica que desde el inicio (^) hasta el final ($) de la cadena solo haya dígitos (\d) y al menos uno (+).
    // ^ indica el comienzo de la cadena.
    // \d coincide con cualquier dígito (equivalente a [0-9]).
    // + indica que el dígito puede aparecer una o más veces.
    // $ indica el final de la cadena.
    return /^\d+$/.test(input);

}

function removeFromCart(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

    const item = cart[index];
    const itemTotalPrice = item.price * quantity;
    
    if (quantity >= item.quantity) {
        cart.splice(index, 1);
    } else {
        item.quantity -= quantity;
    }

    // Actualizar el totalAmount
    totalAmount -= itemTotalPrice;

    // Guardar cambios en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));

    // Recargar la página para actualizar la vista (esto podría mejorarse con una actualización dinámica)
    window.location.reload();
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
