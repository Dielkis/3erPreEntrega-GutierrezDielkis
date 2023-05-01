let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    const productosLocal = JSON.parse(localStorage.getItem("carrito"));
    if (productosLocal != null) {
      carrito = productosLocal;
    }
    mostrarCarrito();
  });
  
class Producto {
    id;
    nombre;
    precio;
    cantidad;
    
constructor (id,nombre,precio,cantidad){
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.cantidad = cantidad
    
}
    subTotal = () => {
        return this.precio*this.cantidad;
    }
}

const productos = [
    new Producto(1, "Rolineras", 500, 1),
    new Producto(2, "Valvulas", 25, 1),
    new Producto(3, "Eje trasero", 196.4, 1),
];



// capturo el id de los botones

const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");
const boton3 = document.getElementById("boton3");

boton1.addEventListener("click", () => {
    const producto = productos.find((item) => {
        return item.id === +boton1.dataset.id
    });
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
});

boton2.addEventListener("click", () => {
    const producto = productos.find((item) => {
        return item.id === +boton2.dataset.id
    });
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
});

boton3.addEventListener("click", () => {
    const producto = productos.find((item) => {
        return item.id === +boton3.dataset.id
    });
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
});

function mostrarCarrito() {
    const tabla = document.getElementById("producto");
    tabla.innerHTML = ``;
    let counter = 1;
  
    carrito.forEach((producto) => {
        tabla.innerHTML += `
            <tr>
              <th>${counter}</th>
              <td>${producto.id}</td>
              <td>${producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>${producto.cantidad}</td>
            </tr>
          `;
          counter++;
    });
    tr = document.createElement("tr");
    tr.innerHTML = `<th></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>${carrito.reduce((total, item) => total + (item && item.precio ? item.precio : 0),0)}</td>
                    </tr>`;
    tabla.appendChild(tr);
  }
  
  mostrarCarrito();