// const btnsAgregar = document.querySelectorAll(".btn-agregar");
// let carrito = [];

// btnsAgregar.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const id = btn.dataset.id;
//     const producto = productos.find((p) => p.id === parseInt(id));
//     carrito.push(producto);
//     localStorage.setItem("carrito", JSON.stringify(carrito));
//     mostrarCarrito();
//   });
// });

// function mostrarCarrito() {
//   const carritoContainer = document.getElementById("carrito");
//   const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//   if (carrito.length === 0) {
//     carritoContainer.innerHTML = `<p>El carrito está vacío</p>`;
//     return;
//   }

//   carritoContainer.innerHTML = `
//     <table>
//       <thead>
//         <tr>
//           <th>Producto</th>
//           <th>Precio</th>
//           <th>Cantidad</th>
//           <th>Total</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${carrito
//           .map(
//             (item) => `
//             <tr>
//               <td>${item.nombre}</td>
//               <td>${item.precio}</td>
//               <td>${item.cantidad}</td>
//               <td>${item.precio * item.cantidad}</td>
//             </tr>
//           `
//           )
//           .join("")}
//       </tbody>
//       <tfoot>
//         <tr>
//           <td colspan="3">Total</td>
//           <td>${carrito.reduce(
//             (total, item) => total + item.precio * item.cantidad,
//             0
//           )}</td>
//         </tr>
//       </tfoot>
//     </table>
//   `;
// }

// function calcularTotal(productos) {
//   return productos.reduce((total, producto) => total + producto.precio, 0);
// }
// function agregarAlCarrito(id, nombre, precio) {
//   let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
//   let producto = carrito.find((item) => item.id === id);

//   if (producto) {
//     producto.cantidad++;
//   } else {
//     carrito.push({ id, nombre, precio, cantidad: 1 });
//   }

//   localStorage.setItem("carrito", JSON.stringify(carrito));
//   mostrarCarrito();
// }

// document.getElementById('vaciar-carrito').addEventListener('click', function() {
//   Swal.fire({
//     title: '¿Estás seguro?',
//     text: '¿Quieres vaciar el carrito?',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Sí, vaciar carrito',
//     cancelButtonText: 'Cancelar'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       carrito = [];
//       localStorage.clear();
//       mostrarCarrito();
//       Swal.fire(
//         'Carrito vaciado',
//         'El carrito ha sido vaciado completamente',
//         'success'
//       )
//     }
//   })
// });