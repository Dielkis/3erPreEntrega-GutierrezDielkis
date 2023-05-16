const carrito = [];

const productosContainer = document.getElementById("productos-container");
const carritoContainer = document.getElementById("carrito-container");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

function obtenerDatosArchivosJson(){
    const URLJSON= "./productos.json"
fetch(URLJSON)
  .then(response => response.json())
  .then(productos => {
    mostrarCarrito(productos);
  })
  .catch(error => {
    console.error('Error al obtener los productos:', error);
  });
}

  function mostrarCarrito() {
    const carritoContainer = document.getElementById("carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    if (carrito.length === 0) {
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
          ${carrito
            .map(
              (item) => `
              <tr>
                <td>
                    <img src=${item.imagen}
                </td>
                <td>${productos.nombre}</td>
                <td>${productos.precio}</td>
                <td>${productos.cantidad}</td>
                <td>${productos.precio * productos.cantidad}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Total</td>
            <td>${carrito.reduce(
              (total, item) => total + productos.precio * productos.cantidad,
              0
            )}</td>
          </tr>
        </tfoot>
      </table>
    `;
  }

  function calcularTotal(productos) {
    return productos.reduce((total, producto) => total + producto.precio, 0);
  }
  function agregarAlCarrito(id, nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let producto = carrito.find((item) => item.id === id);
  
    if (producto) {
      producto.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
  
  document.getElementById('vaciar-carrito').addEventListener('click', function() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres vaciar el carrito?',
      icon: 'warning',
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