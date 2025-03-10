document.getElementById('buscadorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const buscarId = event.target.buscarId.value;
    
    // Aquí deberías agregar la lógica para buscar el producto por ID
    // Simularemos que encontramos el producto
    const productoEncontrado = {
        nombre: 'Producto de Ejemplo',
        precio: 100,
        cantidad: 10,
        servicio: 'montaje',
        id: buscarId,
        descripcion: 'Descripción de ejemplo',
        imagen1: 'ruta/imagen1.jpg',
        imagen2: 'ruta/imagen2.jpg',
        imagen3: 'ruta/imagen3.jpg'
    };

    // Mostrar el formulario de edición y llenar los campos con los datos del producto encontrado
    document.getElementById('formulario').style.display = 'block';
    document.querySelector('input[name="nombre"]').value = productoEncontrado.nombre;
    document.querySelector('input[name="precio"]').value = productoEncontrado.precio;
    document.querySelector('input[name="cantidad"]').value = productoEncontrado.cantidad;
    document.querySelector('select[name="servicio"]').value = productoEncontrado.servicio;
    document.querySelector('input[name="id"]').value = productoEncontrado.id;
    document.querySelector('textarea[name="descripcion"]').value = productoEncontrado.descripcion;
    document.getElementById('imagePreview1').innerHTML = `<img src="${productoEncontrado.imagen1}" alt="Imagen 1">`;
    document.getElementById('imagePreview2').innerHTML = `<img src="${productoEncontrado.imagen2}" alt="Imagen 2">`;
    document.getElementById('imagePreview3').innerHTML = `<img src="${productoEncontrado.imagen3}" alt="Imagen 3">`;
});