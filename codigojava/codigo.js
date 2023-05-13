const btnsAgregar = document.querySelectorAll(".btn-agregar");
const carrito = [];

btnsAgregar.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const producto = productos.find((p) => p.id === parseInt(id));
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  });
});

function mostrarCarrito() {
  const carritoContainer = document.getElementById("carrito");
  carritoContainer.innerHTML = "";

  // Obtener productos del carrito desde el localStorage
  const productosEnStorage = JSON.parse(localStorage.getItem("carrito")) || [];

  // Mostrar productos del carrito
  productosEnStorage.forEach((producto) => {
    const productoHTML = `
      <div>
        <h3>${producto.nombre}</h3>
        <p>Precio: ${producto.precio}</p>
      </div>
    `;
    carritoContainer.innerHTML += productoHTML;
  });

  // Mostrar total de la compra
  const totalHTML = `<p>Total: ${calcularTotal(productosEnStorage)}</p>`;
  carritoContainer.innerHTML += totalHTML;
}

function calcularTotal(productos) {
  return productos.reduce((total, producto) => total + producto.precio, 0);
}