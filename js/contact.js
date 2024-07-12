document.addEventListener("DOMContentLoaded", function() {
	var form = document.getElementById("contact-form");

	form.addEventListener("submit", function(event) {
		event.preventDefault();
		var modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
		modal.show();
	});

	// Aceptar en el modal y recargo la página
	var acceptButton = document.querySelector('#confirmationModal .btn-default');
	acceptButton.addEventListener('click', function() {
		window.location.href = "../pages/contact.html";
	});
});