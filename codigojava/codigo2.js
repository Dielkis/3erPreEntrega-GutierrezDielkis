let carrito = [];
let productos = [];

const productosContainer = document.getElementById("productos-container");
const carritoContainer = document.getElementById("carrito-container");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
document.addEventListener("DOMContentLoaded", obtenerDatosArchivosJson);

function obtenerDatosArchivosJson() {
    const URLJSON = "./productos.json";
    fetch(URLJSON)
      .then((response) => response.json())
      .then((data) => {
        productos = data;
        mostrarProductos();
        asignarEventosAgregarCarrito(); // Asignar eventos después de mostrar los productos
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }



  function mostrarProductos() {
    productosContainer.innerHTML = productos.map((producto) => {
      return `
        <div class="producto">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <p>$${producto.precio}</p>
          <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      `;
    }).join("");
    
    asignarEventosAgregarCarrito(); // Asignar eventos después de mostrar los productos
  }

function asignarEventosAgregarCarrito() {
    const agregarBotones = document.querySelectorAll(".btn-agregar");
    agregarBotones.forEach((btn) => {
      btn.addEventListener("click", agregarAlCarrito);
    });
  }

function mostrarCarrito() {
  const carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carritoItems.length === 0) {
    carritoContainer.innerHTML = `<p>El carrito está vacío</p>`;
    return;
  }

  carritoContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${carritoItems
          .map(
            (item) => `
              <tr>
                <td>
                  <img src=${item.imagen}>
                </td>
                <td>${item.nombre}</td>
                <td>${item.precio}</td>
                <td>${item.cantidad}</td>
                <td>${item.precio * item.cantidad}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Total</td>
          <td>${calcularTotal(carritoItems)}</td>
        </tr>
      </tfoot>
    </table>
  `;
}

function calcularTotal(productos) {
  return productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );
}

function agregarAlCarrito(event) {
  const productoId = parseInt(event.target.dataset.id);
  const producto = productos.find((prod) => prod.id === productoId);
  if (producto) {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
}

document
  .getElementById("vaciar-carrito")
  .addEventListener("click", function () {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar carrito',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = [];
        localStorage.clear();
        mostrarCarrito();
        Swal.fire(
          'Carrito vaciado',
          'El carrito ha sido vaciado completamente',
          'success'
        )
      }
    })
  });