let totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;
let arrayPokemon = JSON.parse(localStorage.getItem('cart')) || [];
const root = document.querySelector('#root');
const spinnerContainer = document.getElementById('spinner-container');

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

// Función para obtener cartas desde la API
const getCardsFromAPI = async (query = '', pageSize = 12) => {
	try {
		const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=${query}&pageSize=${pageSize}`);
		const {
			data
		} = await response.json();
		if (data.length === 0) {
			searchModalError()
		} else {
			return data;
		}
	} catch (error) {
		searchModalError()
	}
};

// Crear los productos desde la API
const createProductsFromAPI = async (query = '', pageSize = 12) => {
	showSpinner();
	root.innerHTML = '';
	const cards = await getCardsFromAPI(query, pageSize);
	cards.forEach(card => {
		const cardElement = document.createElement('div');
		cardElement.classList.add('card');
		const price = card.cardmarket ? card.cardmarket.prices.averageSellPrice : 0;
		const isOutOfStock = price === 0;

		cardElement.innerHTML = `
            <img src='${card.images.small}' alt='${card.name}' class='product-img'>
            <h3>${card.name}</h3>
            <h4>${card.set.name}</h4>
            <h5>Precio: ${price ? price + '$' : 'N/A'}</h5>
            <button id='${card.id}' class='button ${isOutOfStock ? 'out-of-stock' : ''}' ${isOutOfStock ? 'disabled' : ''}>
               ${isOutOfStock ? 'Sin stock' : 'Agregar al carrito'}
            </button>
        `;
		root.appendChild(cardElement);
	});
	loadEvents(cards);
	hideSpinner();
};

// Mostrar modal
const showModal = (modalId, message) => {
	const modalBody = document.querySelector(`${modalId} .modal-body`);
	modalBody.innerHTML = message;
	const modal = new bootstrap.Modal(document.querySelector(modalId));
	modal.show();
};

// Botón de agregar al carrito
const loadEvents = (cards) => {
	const buttons = document.querySelectorAll('.button');
	for (const button of buttons) {
		button.addEventListener('click', () => {
			const selectedCard = cards.find(card => card.id === button.id);
			if (selectedCard) {
				const price = selectedCard.cardmarket ? selectedCard.cardmarket.prices.averageSellPrice : 0;
				const existingPokemon = arrayPokemon.find(pokemon => pokemon.name === selectedCard.name);
				if (!existingPokemon) {
					totalAmount += price;
					arrayPokemon.push(new Pokemon(selectedCard.name, selectedCard.set.name, selectedCard.images.small, price, 1));
				} else {
					totalAmount += price;
					existingPokemon.quantity += 1;
				}
				localStorage.setItem('cart', JSON.stringify(arrayPokemon));
				localStorage.setItem('totalAmount', totalAmount.toFixed(2));
				updateCartNumber();
				showModal('#addToCartModal', `
                    <div class="modal-content-wrapper">
                        <div>
                            ${selectedCard.name}<br>
                            ${price}$<br><br>
                            Monto total actual: ${totalAmount.toFixed(2)}$
                        </div>
                        <img src='${selectedCard.images.small}' alt='${selectedCard.name}' class='product-thumbnail'>
                    </div>
                `);
			}
		});
	}
};

// Evento de búsqueda
document.getElementById('searchButton').addEventListener('click', () => {
	const query = document.getElementById('searchInput').value.trim();
	if (query) {
		createProductsFromAPI(`name:"${query}"`, 30);
	} else {
		createProductsFromAPI();
	}
});

// Botón de finalizar compra desde la imagen del carrito
document.addEventListener('DOMContentLoaded', function() {
	const finalizeButton = document.getElementById("cart-img");
	finalizeButton.addEventListener('click', () => {
		if (totalAmount > 0) {
			localStorage.setItem('totalAmount', totalAmount.toFixed(2));
			window.location.href = '../pages/cart.html';
		} else {
			showModal('#emptyCartModal', `Para pasar a la finalización de la compra, por favor, añadí al menos una carta.`);
			createProductsFromAPI();
		}
	});
});

// Actualizar el span del carrito
const cartNumberElement = document.getElementById("cart-count");

function updateCartNumber() {
	let actualCartNumber = arrayPokemon.reduce((total, pokemon) => total + pokemon.quantity, 0);
	cartNumberElement.innerText = actualCartNumber;
}

// Función para mostrar el spinner
function showSpinner() {
	spinnerContainer.style.display = 'flex'; // Mostrar el contenedor
}

// Función para ocultar el spinner
function hideSpinner() {
	spinnerContainer.style.display = 'none'; // Ocultar el contenedor
}

//Funcion modal error
function searchModalError() {
	document.querySelector('#searchInput').value = '';
		createProductsFromAPI()
		return showModal('#cardNotFound', `
			<div class="modal-content-wrapper">
				<p>No pudimos encontrar cartas con tu búsqueda. Por favor intentá nuevamente con otra carta</p>
			</div>
		`);
}

// Llamo a la función para crear los productos
createProductsFromAPI();
updateCartNumber();