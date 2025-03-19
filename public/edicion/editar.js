document.addEventListener('DOMContentLoaded', function() {
    const idBuscarInput = document.querySelector('input[name="idBuscar"]');
    idBuscarInput.focus();
});

document.getElementById('buscadorForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const idBuscar = document.querySelector('input[name="idBuscar"]').value;

    try {
        const response = await fetch(`/api/products/${idBuscar}`);
        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }
        const producto = await response.json();
        document.getElementById('productoEditado').style.display = 'block';
        cargarDatosProducto(producto);
    } catch (error) {
        alert(error.message);
    }
});

function cargarDatosProducto(producto) {
    document.querySelector('input[name="nombre"]').value = producto.nombre;
    document.querySelector('input[name="precio"]').value = producto.precio;
    document.querySelector('input[name="cantidad"]').value = producto.cantidad;
    document.querySelector('select[name="servicio"]').value = producto.servicio;
    document.querySelector('input[name="id"]').value = producto.id;
    document.querySelector('textarea[name="descripcion"]').value = producto.descripcion;

    const imagePreview1 = document.getElementById('imagePreview1');
    const imagePreview2 = document.getElementById('imagePreview2');
    const imagePreview3 = document.getElementById('imagePreview3');

    imagePreview1.innerHTML = `<img src="${producto.imagen1}" alt="Imagen 1">`;
    imagePreview2.innerHTML = `<img src="${producto.imagen2}" alt="Imagen 2">`;
    imagePreview3.innerHTML = `<img src="${producto.imagen3}" alt="Imagen 3">`;
}

document.getElementById('productoEditForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const productId = document.querySelector('input[name="id"]').value;

    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }

        alert('Producto actualizado con éxito');
    } catch (error) {
        alert(error.message);
    }
});

// Actualizar vista previa de las imágenes al cambiarlas
document.getElementById('file-upload1').addEventListener('change', function() {
    actualizarVistaPrevia(this, 'imagePreview1');
});

document.getElementById('file-upload2').addEventListener('change', function() {
    actualizarVistaPrevia(this, 'imagePreview2');
});

document.getElementById('file-upload3').addEventListener('change', function() {
    actualizarVistaPrevia(this, 'imagePreview3');
});

function actualizarVistaPrevia(input, previewId) {
    const preview = document.getElementById(previewId);
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        preview.innerHTML = `<img src="${e.target.result}" alt="Vista previa">`;
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}