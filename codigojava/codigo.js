let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  const productosLocal = JSON.parse(localStorage.getItem("carrito"));
  if (productosLocal != null) {
    carrito = productosLocal;
  }
  mostrarCarrito();
});

const accesoriosContainer = document.getElementById("accesorios");
accesoriosContainer.addEventListener("click", function(event) {
  const button = event.target;
  if (button.classList.contains("btn-agregar")) {
    const accesorioId = button.dataset.id;
    const accesorio = productos.find(a => a.id === parseInt(accesorioId));
    agregarAlCarrito(producto.id, producto.nombre, producto.precio);
  }
});

function agregarAlCarrito(id, nombre, precio) {
  const accesorio = { id, nombre, precio };
  carrito.push(accesorio);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarCarrito();
}


function actualizarCarrito() {
  const carritoContainer = document.getElementById("carrito-container");
  const carritoTotal = document.getElementById("carrito-total");
  let total = 0;
  let html = "";
  carrito.forEach(accesorio => {
    total += accesorio.precio;
    html += `
      <div class="carrito-item">
        <span class="carrito-nombre">${accesorio.nombre}</span>
        <span class="carrito-precio">$${accesorio.precio.toFixed(2)}</span>
      </div>
    `;
  });
  carritoContainer.innerHTML = html;
  carritoTotal.textContent = `$${total.toFixed(2)}`;
}