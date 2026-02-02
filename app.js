const listaActividades = document.getElementById("lista-actividades");
let actividades = [];
const savedActividades = localStorage.getItem("actividades");

if (savedActividades) {
	actividades = JSON.parse(savedActividades);
}

renderActividades();

function addActividad(actividad, index) {
	const actividadItem = document.createElement("li");
	actividadItem.classList.add("actividad-item");

	const nombre = document.createElement("p");
	nombre.textContent = actividad.nombre;
	actividadItem.appendChild(nombre);

	const meta = document.createElement("p");
	const fecha = new Date(actividad.fecha);
	const fechaFormateada = fecha.toLocaleDateString("es-ES");
	meta.textContent = `${actividad.deporte} (${fechaFormateada})`;
	actividadItem.appendChild(meta);

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Eliminar";
	actividadItem.appendChild(deleteButton);
	deleteButton.addEventListener("click", function () {
		actividades.splice(index, 1);
		saveActividades();
		renderActividades();
	});

	return actividadItem;
}

function renderActividades() {
	listaActividades.innerHTML = "";

	actividades.forEach((actividad, index) => {
		const item = addActividad(actividad, index);
		listaActividades.appendChild(item);
	});
}

function saveActividades() {
	localStorage.setItem("actividades", JSON.stringify(actividades));
}

const form = document.getElementById("form-actividad");

form.addEventListener("submit", function (event) {
	event.preventDefault();

	const nuevaActividad = {
		nombre: event.target.nombre.value,
		deporte: event.target.deporte.value,
		fecha: event.target.fecha.value,
	};

	actividades.push(nuevaActividad);
	saveActividades();
	renderActividades();
	form.reset();
});
