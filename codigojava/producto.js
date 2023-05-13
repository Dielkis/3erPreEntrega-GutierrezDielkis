class Producto {
  id;
  nombre;
  precio;
  cantidad;

  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
  subTotal = () => {
    return this.precio * this.cantidad;
  };
}

const productos = [
  new Producto(1, "Rolineras", 500, 1),
  new Producto(2, "Valvulas", 25, 1),
  new Producto(3, "Eje trasero", 196.4, 1),
];
