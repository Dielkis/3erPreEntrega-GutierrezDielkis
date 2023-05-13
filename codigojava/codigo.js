let carrito = [];

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
btnVaciarCarrito.addEventListener("click", vaciarCarrito)

document.addEventListener("DOMContentLoaded", () => {
  const productosLocal = JSON.parse(localStorage.getItem("carrito"));
  if (productosLocal != null) {
    carrito = productosLocal;
  }
  mostrarCarrito();
});

// // capturo el id de los botones

// const boton1 = document.getElementById("boton1");
// const boton2 = document.getElementById("boton2");
// const boton3 = document.getElementById("boton3");

// //Agrega el producto 1 a localStorage
// boton1.addEventListener("click", () => {
//   const producto = productos.find((item) => {
//     return item.id === +boton1.dataset.id;
//   });
//   carrito.push(producto);
//   localStorage.setItem("carrito", JSON.stringify(carrito));
//   mostrarCarrito();
// });

// //Agrega el producto 2 a localStorage
// boton2.addEventListener("click", () => {
//   const producto = productos.find((item) => {
//     return item.id === +boton2.dataset.id;
//   });
//   carrito.push(producto);
//   localStorage.setItem("carrito", JSON.stringify(carrito));
//   mostrarCarrito();
// });

// //Agrega el producto 3 a localStorage
// boton3.addEventListener("click", () => {
//   const producto = productos.find((item) => {
//     return item.id === +boton3.dataset.id;
//   });
//   carrito.push(producto);
//   localStorage.setItem("carrito", JSON.stringify(carrito));
//   mostrarCarrito();
// });

const accesoriosContainer = document.getElementById("accesorios");
accesoriosContainer.addEventListener("click", function(event) {
  const button = event.target;
  if (button.classList.contains("btn-agregar")) {
    const accesorioId = button.dataset.id;
    const accesorio = articulos.find(a => a.id === parseInt(accesorioId));
    agregarAlCarrito(accesorio.id, accesorio.nombre, accesorio.precio);
  }
});

function agregarAlCarrito(id, nombre, precio) {
  const carritoItem = {
    id: id,
    nombre: nombre,
    precio: precio,
    cantidad: 1
  };

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].cantidad++;
      mostrarCarrito();
      return;
    }
  }

  carrito.push(carritoItem);
  mostrarCarrito();
}

function mostrarCarrito() {
  const tabla = document.getElementById("producto");
  tabla.innerHTML = ``;
  let counter = 1;
  let productosEnStorage = JSON.parse(localStorage.getItem("carrito"));

  if (productosEnStorage !== null) {
    productosEnStorage.forEach((producto) => {
      tabla.innerHTML += `
            <tr>
              <th>${counter}</th>
              <td>${producto.id}</td>
              <td>${producto.nombre}</td>
              <td>$${producto.precio}</td>
              <td>${producto.cantidad}</td>
            </tr>
          `;
      counter++;
    });
  }
  
  tr = document.createElement("tr");
  tr.innerHTML = `<th>TOTAL</th>
                      <td></td>
                      <td></td>
                      <td>$${carrito.reduce(
                        (total, item) =>
                          total + (item && item.precio ? item.precio : 0),
                        0
                      )}</td>
                      <td></td>
                    </tr>`;
  tabla.appendChild(tr);
}
