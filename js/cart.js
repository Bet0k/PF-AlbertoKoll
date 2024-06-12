let totalAmount = 0;
let arrayPokemon = [];
const root = document.querySelector('#root');

//Objetos
class Pokemon {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

//Productos en stock
const Products = [
    {
        id: 1,
        name: "Pikachu",
        price: 950,
        description: "Pikachu Gen 151",
        type: "electric",
        image: '../images/buyCards/pikachu.webp'
    },
    {
        id: 2,
        name: "Charmander",
        price: 950,
        description: "Charmander Gen 151",
        type: "fire",
        image: '../images/buyCards/charmander.webp'
    },
    {
        id: 3,
        name: "Squirtle",
        price: 950,
        description: "Squirtle Gen 151",
        type: "water",
        image: '../images/buyCards/squirtle.webp'
    },
    {
        id: 4,
        name: "Bulbasaur",
        price: 950,
        description: "Bulbasaur Gen 151",
        type: "grass",
        image: '../images/buyCards/bulbasaur.webp'
    },
    {
        id: 5,
        name: "Eevee",
        price: 950,
        description: "Eevee Gen 151",
        type: "normal",
        image: '../images/buyCards/eevee.webp'
    },
    {
        id: 6,
        name: "Alakazam EX Full Art",
        price: 3000,
        description: "Alakazam EX Full Art Gen 151",
        type: "physich",
        image: '../images/buyCards/alakazam-fullart.webp'
    },
    {
        id: 7,
        name: "Mewtwo",
        price: 1050,
        description: "Mewtwo Gen 151",
        type: "physich",
        image: '../images/buyCards/mewtwo.webp'
    },
    {
        id: 8,
        name: "Vaporeon",
        price: 950,
        description: "Vaporeon Gen 151",
        type: "water",
        image: '../images/buyCards/vaporeon.webp'
    },
    {
        id: 9,
        name: "Snorlax",
        price: 950,
        description: "Snorlax Gen 151",
        type: "normal",
        image: '../images/buyCards/snorlax.webp'
    },
    {
        id: 10,
        name: "Snorlax Full Art",
        price: 3000,
        description: "Snorlax Full Art Gen 151",
        type: "normal",
        image: '../images/buyCards/snorlax-fullart.webp'
    },
    {
        id: 11,
        name: "Hitmonchan",
        price: 800,
        description: "Hitmonchan Gen 151",
        type: "fighting",
        image: '../images/buyCards/hitmonchan.webp'
    }
];

//Eventos, botón de agregar al carrito y finalizar
const loadEvents = () => {
    const buttons = document.querySelectorAll('.button'); 
    for (const button of buttons) {
        button.addEventListener('click', () => {
            const selectedProduct = Products.find(product => product.id === Number(button.id));
            if (selectedProduct) {
                totalAmount += selectedProduct.price;
                arrayPokemon.push(new Pokemon(selectedProduct.name, selectedProduct.description));
                alert(`Agregaste al carrito: ${selectedProduct.name}\nValor: ${selectedProduct.price}$\nMonto actual: ${totalAmount}$`);
                updateCartNumber()
            }
        });
    }
    document.getElementById('finishButton').addEventListener('click', () => {
        if(totalAmount > 0){
            const cartContents = arrayPokemon.map(pokemon => `${pokemon.description}`).join('\n');
            alert(`El carrito contiene:\n${cartContents}`);
            alert(`Tu monto total a pagar es de: ${totalAmount}$ 💸\n\nLos métodos de pago son:\n💳  Tarjeta de crédito / débito\n💵  Efectivo en locales\n🏦  Transferencia Bancaria\n\nLuego coordinaremos el envío! 🚚✈️\n¡Que las disfrutes! ❤️`);
            totalAmount = 0;
            arrayPokemon = [];
            updateCartNumber()
        }
        else{
            alert(`No añadiste cartas al carrito.\nPara finalizar la compra, por favor, selecciona al menos una carta.`);
        }

});
};

//Creo los elementos
const createProducts = () => {
    Products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src='${product.image}' alt='${product.description}' class='product-img'>
            <h3>${product.name}</h3>
            <h4>${product.description}</h4>
            <h5>${product.price}$</h5>
            <button id='${product.id}' class='button'>Agregar al carrito</button>
        `;
        root.appendChild(card);
    });
    
//Botón de finalizar compra
const finalizeButton = document.createElement('button');
finalizeButton.id = 'finishButton';
finalizeButton.classList.add('finalize-button');
finalizeButton.innerText = 'Finalizar Compra';
root.appendChild(finalizeButton);

    loadEvents();
};

createProducts();


//Actualizar el span del carrito
const cartNumberElement = document.getElementById("cart-count")
function updateCartNumber(){
    let actualCartNumber = arrayPokemon.length
    console.log(actualCartNumber)
    cartNumberElement.innerText = actualCartNumber
}