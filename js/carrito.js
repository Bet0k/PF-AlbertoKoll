alert("Bienvenido! 😄\n\nEl precio de las cartas varía según la cantidad de cartas que quieras comprar 💲💲\n\nA continuación te dejamos la lista de precios y vos seleccioná la opción que quieras 👀\nCuando selecciones la opción de 'Terminar transacción', vas a elegir el método de pago 🙌");

let totalAmount = 0;
let arrayPokemon = [];

class Pokemon {
    constructor(name, generation) {
        this.name = name;
        this.generation = generation;
    }
}

function showMenu(totalAmount) {
    let menu = "Ingresá la opción que quieras.\n1️⃣  1 Carta --> 950$\n2️⃣  2 Cartas --> 1700$\n3️⃣  3 Cartas --> 2500$\n4️⃣  4 Cartas --> 3300$\n5️⃣  Reiniciar Carrito\n0️⃣  Terminar transacción";
    if (totalAmount > 0) {
        menu += "\n\n Tu total actual es de: " + totalAmount + "$";
    }
    return prompt(menu);
}

function addPokemon(quantity) {
    for (let i = 0; i < quantity; i++) {
        let pokeName = prompt('Ingresa el nombre del Pokémon que queres la carta: ');
        let pokeGeneration = prompt('Ingresá la generación de la carta Pokémon: ');
        let pokemonToBuy = new Pokemon(pokeName, pokeGeneration);
        arrayPokemon.push(pokemonToBuy);
    }
}

function selectedOption(option, totalAmount) {
    switch(option) {
        case "1":
            addPokemon(1);
            return totalAmount + 950;
        case "2":
            addPokemon(2);
            return totalAmount + 1700;
        case "3":
            addPokemon(3);
            return totalAmount + 2500;
        case "4":
            addPokemon(4);
            return totalAmount + 3300;
        case "5":
            totalAmount = 0;
            arrayPokemon = [];
            alert("Borramos todo lo seleccionado! Tu carrito vuelve a ser: " + totalAmount + "$");
            return totalAmount;
        default:
            alert("Elegiste una opción que no es válida! 🤔\nSi queres seguir comprando estas increíbles cartas, seleccioná una opción disponible!");
            return totalAmount;
    }
}

let option = showMenu(totalAmount);

while(option != "0") {
    totalAmount = selectedOption(option, totalAmount);
    option = showMenu(totalAmount);
}

if(totalAmount <= 0) {
    alert("No seleccionaste cartas! ☹️\nSi querés volver a tener el menú, por favor recargá la página.");
} else {
    let pokemonList = arrayPokemon.map(pokemon => `${pokemon.name} | Generación: ${pokemon.generation}`).join('\n');

    alert(`El/Los Pokémon que elegiste es/son:\n${pokemonList}`);

    alert("Tu monto total a pagar es de: " + totalAmount + "$ 💸\n\nLos métodos de pago son:\n💳  Tarjeta de crédito / débito\n💵  Efectivo en locales\n🏦  Transferencia Bancaria\n\nLuego coordinaremos el envío! 🚚✈️\nQue las disfrutes! ❤️");
}
