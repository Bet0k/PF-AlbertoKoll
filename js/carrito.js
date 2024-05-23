alert("Bienvenido! 😄\n\nEl precio de las cartas varía según la cantidad de cartas que quieras comprar 💲💲\n\nA continuación te dejamos la lista de precios y vos seleccioná la opción que quieras 👀\nCuando selecciones la opción de 'Terminar transacción', vas a elegir el método de pago 🙌");

let totalAmount = 0;

function showMenu(totalAmount) {
    let menu = "Ingresá la opción que quieras.\n1️⃣  1 Carta --> 950$\n2️⃣  5 Cartas --> 4000$\n3️⃣  10 Cartas --> 9000$\n4️⃣  20 Cartas --> 17000$\n5️⃣  Volver a iniciar el monto\n0️⃣  Terminar transacción";
    if (totalAmount > 0) {
        menu += "\n\n Tu total actual es de: " + totalAmount + "$";
    }
    return prompt(menu);
}

function selectedOption(option, totalAmount) {
    switch(option) {
        case "1":
            return totalAmount + 950;
        case "2":
            return totalAmount + 4000;
        case "3":
            return totalAmount + 9000;
        case "4":
            return totalAmount + 17000;
        case "5":
            totalAmount = 0;
            alert("Borramos todo el lo seleccionado! Tu monto vuelve ser: " + totalAmount + "$")
            return totalAmount;            
        default:
            alert("🤔 Elegiste una opción que no es válida!\nSi queres seguir comprando estas increíbles cartas, seleccioná una opción disponible!");
            return totalAmount;
    }
}

let option = showMenu(totalAmount);

while(option != "0") {
    totalAmount = selectedOption(option, totalAmount);
    option = showMenu(totalAmount);
}

if(totalAmount <= 0) {
    alert("¡No seleccionaste cartas! ☹️\nSi querés volver a tener el menú, por favor recargá la página.");
} else {
    alert("Tu monto total a pagar es de: " + totalAmount + "$ 💸\n\nLos métodos de pago son:\n💳  Tarjeta de crédito / débito\n💵  Efectivo en locales\n🏦  Transferencia Bancaria\n\nLuego coordinaremos el envío! 🚚✈️\n¡Que las disfrutes! ❤️");
}