// VARIABLES
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Al presionar "Agregar al carrito" en un curso
  listaCursos.addEventListener("click", agregarCurso);

  // Al presionar "Eliminar curso" del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Al presioanr "vaciar carrito"
  btnVaciarCarrito.addEventListener("click", () => {
    articulosCarrito = [];
    vaciarCarrito();
  });
}

// FUNCIONES

// Verifica el curso seleccionado y lo envia para tomar sus datos
function agregarCurso(e) {
  e.preventDefault();

  // Confirmamos que este presionando el boton "Agregar al carrito"
  if (e.target.classList.contains("agregar-carrito")) {
    // SELECCIONAMOS la TARJETA contenedora del CURSO seleccionado
    // y lo GUARDAMOS en una VARIABLE
    const curso = e.target.parentElement.parentElement;

    // ENVIAMOS el CURSO SELECCIONADO para TOMAR sus DATOS
    leerDatosCurso(curso);
  }
}

// Lee los daros del curso
function leerDatosCurso(curso) {
  // GUARDAMOS los DATOS del CURSO en un OBJETO
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector("p span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Verificar si ya existe el curso en el carrito
  if (articulosCarrito.some((curso) => curso.id === infoCurso.id)) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agregar lementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  // Mostrar en el HTML
  carritoHTML();
}

// Eliminar un curso del carrito
function eliminarCurso(e) {
  e.preventDefault();
  // Confirmamos que este presionando el boton "Eliminar curso"
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //Eliminar del arreglo del carrito
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    // Actualizar el HTML
    carritoHTML();
  }
}

// Muestra el curso en el HTML
function carritoHTML() {
  // Vaciar carrito en HTML
  vaciarCarrito();

  articulosCarrito.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>  
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad} </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
