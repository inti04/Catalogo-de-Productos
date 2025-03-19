document.addEventListener('DOMContentLoaded', function() {
    const nombreInput = document.querySelector('input[name="nombre"]');
    if (nombreInput) {
        nombreInput.focus();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM
    const productoForm = document.getElementById('productoForm');
    const imagePreview1 = document.getElementById('imagePreview1');
    const imagePreview2 = document.getElementById('imagePreview2');
    const imagePreview3 = document.getElementById('imagePreview3');
    const fileInput1 = document.getElementById('file-upload1');
    const fileInput2 = document.getElementById('file-upload2');
    const fileInput3 = document.getElementById('file-upload3');
    const nombreInput = document.querySelector('input[name="nombre"]'); // Mover la definición aquí

    // Función para manejar el cambio de imagen y mostrar la vista previa
    const handleImageChange = (event, previewElement) => {
        previewElement.innerHTML = ''; // Limpiar la vista previa
        const file = event.target.files[0]; // Obtener el archivo seleccionado
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result; // Establecer la fuente de la imagen
                previewElement.appendChild(img); // Agregar la imagen a la vista previa
            };
            reader.readAsDataURL(file); // Leer el archivo como una URL de datos
        }
    };

    // Agregar eventos de cambio a los inputs de archivo para mostrar la vista previa de las imágenes
    fileInput1.addEventListener('change', (event) => handleImageChange(event, imagePreview1));
    fileInput2.addEventListener('change', (event) => handleImageChange(event, imagePreview2));
    fileInput3.addEventListener('change', (event) => handleImageChange(event, imagePreview3));

    // Manejar el envío del formulario
    productoForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        const formData = new FormData(productoForm); // Crear un FormData con los datos del formulario

        // Depuración: Inspeccionar el FormData antes de enviarlo
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData, // Enviar los datos del formulario
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Lee la respuesta de error del servidor
                console.error('Error en la respuesta del servidor:', errorResponse);
                throw new Error(errorResponse.message || 'Error en la respuesta del servidor');
            }

            const result = await response.json();
            console.log('Respuesta del servidor:', result); // Agrega este log para depurar

            if (result.success) {
                alert('Producto agregado con éxito');
                productoForm.reset(); // Reiniciar el formulario
                imagePreview1.innerHTML = ''; // Limpiar la vista previa de la imagen 1
                imagePreview2.innerHTML = ''; // Limpiar la vista previa de la imagen 2
                imagePreview3.innerHTML = ''; // Limpiar la vista previa de la imagen 3
                if (nombreInput) {
                    nombreInput.focus(); // Enfocar el primer input después de agregar el producto
                }
            } else {
                alert('Error al agregar el producto');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar el producto: ' + error.message);
        }
    });
});