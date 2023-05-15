const carrito = [];

const productosContainer = document.getElementById("productos-container");
const carritoContainer = document.getElementById("carrito-container");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

fetch('productos.json')
  .then(response => response.json())
  .then(productos => {
    mostrarProductos(productos);
  })
  .catch(error => {
    console.error('Error al obtener los productos:', error);
  });

function mostrarProductos(productos) {
  productosContainer.innerHTML = productos.map(producto => {
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

  const agregarBotones = document.querySelectorAll(".btn-agregar");
  agregarBotones.forEach(btn => {
    btn.addEventListener("click", agregarAlCarrito);
  });
}

function agregarAlCarrito(event) {
  const productoId = parseInt(event.target.dataset.id);
  const producto = productos.find(prod => prod.id === productoId);
  if (producto) {
    carrito.push(producto);
    mostrarCarrito();
  }
}

function mostrarCarrito() {
  carritoContainer.innerHTML = "";
  carrito.forEach(producto => {
    carritoContainer.innerHTML += `
      <div class="carrito-item">
        <h4>${producto.nombre}</h4>
        <p>Precio: $${producto.precio}</p>
      </div>
    `;
  });

  if (carrito.length === 0) {
    carritoContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
  }
}

vaciarCarritoBtn.addEventListener("click", () => {
  carrito.length = 0;
  mostrarCarrito();
});