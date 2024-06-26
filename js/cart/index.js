let totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
let arrayPokemon = JSON.parse(localStorage.getItem('cart')) || [];
const root = document.querySelector('#root');

// Objetos
class Pokemon {
    constructor(name, description, image, price, quantity = 1) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }
}

// Productos en stock
const Products = [{
        id: 1,
        name: "Pikachu",
        price: 950,
        description: "Pikachu Gen 151",
        type: "electric",
        image: '../images/buyCards/pikachu.webp',
        quantity: 1
    },
    {
        id: 2,
        name: "Charmander",
        price: 950,
        description: "Charmander Gen 151",
        type: "fire",
        image: '../images/buyCards/charmander.webp',
        quantity: 1
    },
    {
        id: 3,
        name: "Squirtle",
        price: 950,
        description: "Squirtle Gen 151",
        type: "water",
        image: '../images/buyCards/squirtle.webp',
        quantity: 1
    },
    {
        id: 4,
        name: "Bulbasaur",
        price: 950,
        description: "Bulbasaur Gen 151",
        type: "grass",
        image: '../images/buyCards/bulbasaur.webp',
        quantity: 1
    },
    {
        id: 5,
        name: "Eevee",
        price: 950,
        description: "Eevee Gen 151",
        type: "normal",
        image: '../images/buyCards/eevee.webp',
        quantity: 1
    },
    {
        id: 6,
        name: "Alakazam EX FullArt",
        price: 3000,
        description: "Alakazam EX Full Art Gen 151",
        type: "psychic",
        image: '../images/buyCards/alakazam-fullart.webp',
        quantity: 1
    },
    {
        id: 7,
        name: "Mewtwo",
        price: 1050,
        description: "Mewtwo Gen 151",
        type: "psychic",
        image: '../images/buyCards/mewtwo.webp',
        quantity: 1
    },
    {
        id: 8,
        name: "Vaporeon",
        price: 950,
        description: "Vaporeon Gen 151",
        type: "water",
        image: '../images/buyCards/vaporeon.webp',
        quantity: 1
    },
    {
        id: 9,
        name: "Snorlax",
        price: 950,
        description: "Snorlax Gen 151",
        type: "normal",
        image: '../images/buyCards/snorlax.webp',
        quantity: 1
    },
    {
        id: 10,
        name: "Snorlax FullArt",
        price: 3000,
        description: "Snorlax Full Art Gen 151",
        type: "normal",
        image: '../images/buyCards/snorlax-fullart.webp',
        quantity: 1
    },
    {
        id: 11,
        name: "Kabutops",
        price: 800,
        description: "Kabutops Gen 151",
        type: "fighting",
        image: '../images/buyCards/kabutops.webp',
        quantity: 1
    },
    {
        id: 12,
        name: "Blastoise EX",
        price: 3500,
        description: "Blastoise EX Gen 151",
        type: "water",
        image: '../images/buyCards/blastoise.webp',
        quantity: 1
    },
    {
        id: 13,
        name: "Charizard EX",
        price: 3500,
        description: "Charizard EX Gen 151",
        type: "fire",
        image: '../images/buyCards/charizard.webp',
        quantity: 1
    },
    {
        id: 14,
        name: "Venusaur EX",
        price: 3500,
        description: "Venusaur EX Gen 151",
        type: "grass",
        image: '../images/buyCards/venusaur.webp',
        quantity: 1
    },
    {
        id: 15,
        name: "Mew EX",
        price: 3250,
        description: "Mew EX Gen 151",
        type: "psychic",
        image: '../images/buyCards/mew.webp',
        quantity: 1
    },
    {
        id: 16,
        name: "Ekans",
        price: 500,
        description: "Ekans Gen 151",
        type: "poison",
        image: '../images/buyCards/ekans.webp',
        quantity: 1
    },
];

// Crear los productos
const createProducts = (maxPrice) => {
    root.innerHTML = '';

    Products.forEach(product => {
        if (!maxPrice || product.price <= maxPrice) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src='${product.image}' alt='${product.description}' class='product-img'>
                <h3>${product.name}</h3>
                <h4>${product.description}</h4>
                <h5>Precio: ${product.price}$</h5>
                <button id='${product.id}' class='button'>Agregar al carrito</button>
            `;
            root.appendChild(card);
        }
    });

    loadEvents();
};

// Mostrar modal
const showModal = (modalId, message) => {
    const modalBody = document.querySelector(`${modalId} .modal-body`);
    modalBody.innerHTML = message;
    const modal = new bootstrap.Modal(document.querySelector(modalId));
    modal.show();
};

// Botón de agregar al carrito
const loadEvents = () => {
    const buttons = document.querySelectorAll('.button');
    for (const button of buttons) {
        button.addEventListener('click', () => {
            const selectedProduct = Products.find(product => product.id === Number(button.id));
            if (selectedProduct) {
                const existingPokemon = arrayPokemon.find(pokemon => pokemon.name === selectedProduct.name);
                if (!existingPokemon) {
                    totalAmount += selectedProduct.price;
                    arrayPokemon.push(new Pokemon(selectedProduct.name, selectedProduct.description, selectedProduct.image, selectedProduct.price, selectedProduct.quantity));
                } else {
                    totalAmount += selectedProduct.price;
                    existingPokemon.quantity += 1;
                }
                localStorage.setItem('cart', JSON.stringify(arrayPokemon));
                localStorage.setItem('totalAmount', totalAmount);
                updateCartNumber();
                showModal('#addToCartModal', `
                    <div class="modal-content-wrapper">
                        <div>
                            ${selectedProduct.name}<br>
                            ${selectedProduct.price}$<br><br>
                            Monto total actual: ${totalAmount}$
                        </div>
                        <img src='${selectedProduct.image}' alt='${selectedProduct.description}' class='product-thumbnail'>
                    </div>
                `);
            }
        });
    }
};

// Botón de filtrado
const filterButton = document.createElement('button');
filterButton.id = 'filterButton';
filterButton.classList.add('filter-button');
filterButton.innerText = 'Filtrar Precio';
root.parentNode.insertBefore(filterButton, root);

filterButton.addEventListener('click', () => {
    const filterPriceModal = new bootstrap.Modal(document.getElementById('filterPriceModal'));
    filterPriceModal.show();
});

document.getElementById('applyFilter').addEventListener('click', () => {
    const maxPrice = document.getElementById('maxPrice').value;
    createProducts(maxPrice ? Number(maxPrice) : null);
    const filterPriceModal = bootstrap.Modal.getInstance(document.getElementById('filterPriceModal'));
    filterPriceModal.hide();
});

document.getElementById('deleteFilter').addEventListener('click', () =>{
    const maxPrice = 0
    createProducts(maxPrice ? Number(maxPrice) : null);
    const filterPriceModal = bootstrap.Modal.getInstance(document.getElementById('filterPriceModal'));
    filterPriceModal.hide();
})



// Botón de finalizar compra desde la imagen
document.addEventListener('DOMContentLoaded', function() {
    const finalizeButton = document.getElementById("cart-img");
    finalizeButton.addEventListener('click', () => {
        if (totalAmount > 0) {
            localStorage.setItem('totalAmount', totalAmount);
            window.location.href = '../pages/cart.html';
        } else {
            showModal('#emptyCartModal', `Para pasar a la finalización de la compra, por favor, añadí al menos una carta.`);
            createProducts();
        }
    });
});

// Actualizar el span del carrito
const cartNumberElement = document.getElementById("cart-count");

function updateCartNumber() {
    let actualCartNumber = arrayPokemon.reduce((total, pokemon) => total + pokemon.quantity, 0);
    cartNumberElement.innerText = actualCartNumber;
}

// Llamo a la función para crear los productos
createProducts();
updateCartNumber();