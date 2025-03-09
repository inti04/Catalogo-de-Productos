// Este script maneja la visualización y gestión de productos en un carrito de compras.
// Recupera los productos del carrito desde localStorage, los muestra en una tabla,
// permite eliminar productos y filtrar productos por servicio.

document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM
    const productContainer = document.getElementById('product-container');
    const totalAmount = document.getElementById('total-amount');
    let total = 0;

    // Recuperar productos del carrito desde localStorage
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    // Función para renderizar los productos en la tabla
    const renderProducts = (products) => {
        // Limpiar el contenedor de productos
        productContainer.innerHTML = '';
        total = 0;

        // Iterar sobre los productos y agregarlos a la tabla
        products.forEach(product => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><img src="${product.image}" alt="${product.title}" class="producto-detalle"></td>
                <td>${product.title}</td>
                <td>${product.id}</td>
                <td>${product.quantity}</td>
                <td>${product.precio}</td>
                <td><button class="eliminar" data-id="${product.id}">Eliminar</button></td>
            `;

            productContainer.appendChild(row);
            // Calcular el total del carrito
            total += parseFloat(product.precio.slice(1)) * product.quantity;
        });

        // Mostrar el total en el elemento correspondiente
        totalAmount.textContent = `$${total.toFixed(2)}`;
    };

    // Renderizar los productos del carrito al cargar la página
    renderProducts(cartProducts);

    // Agregar event listener para eliminar productos
    productContainer.addEventListener('click', e => {
        if (e.target.classList.contains('eliminar')) {
            const id = e.target.getAttribute('data-id');
            // Filtrar los productos para eliminar el seleccionado
            const updatedCartProducts = cartProducts.filter(product => product.id !== id);
            // Actualizar el carrito en localStorage
            localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));
            // Recargar la página para actualizar la lista
            location.reload();
        }
    });

    // Agregar event listeners para los filtros
    document.querySelectorAll('.filter').forEach(filter => {
        filter.addEventListener('click', e => {
            const service = e.target.getAttribute('data-service');
            // Filtrar los productos por el servicio seleccionado
            const filteredProducts = cartProducts.filter(product => product.service === service);
            // Renderizar los productos filtrados
            renderProducts(filteredProducts);
        });
    });

    // Mostrar todos los productos al hacer clic en "Atras"
    const showAllButton = document.getElementById('show-all');
    if (showAllButton) {
        showAllButton.addEventListener('click', () => {
            // Renderizar todos los productos del carrito
            renderProducts(cartProducts);
        });
    }
});