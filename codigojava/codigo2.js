fetch('./productos.json')
  .then(response => response.json())
  .then(data => {
    // Aquí puedes almacenar los datos de los productos en una variable
    const productos = data;
    console.log(productos); // Verificamos que se hayan almacenado correctamente
  })
  .catch(error => console.error(error));