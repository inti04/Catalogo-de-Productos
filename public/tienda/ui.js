// Este archivo maneja la carga inicial de productos desde la API y su visualización en la página.

import { displayProducts } from './templates.js'; // Importa la función displayProducts desde templates.js
import './events.js'; // Importa y ejecuta el código de events.js

document.addEventListener('DOMContentLoaded', () => {
    // Realiza una solicitud a la API para obtener los productos
    fetch('http://localhost:3000/api/products')
        .then(response => response.json()) // Convierte la respuesta a JSON
        .then(products => {
            // Muestra los productos en la página
            displayProducts(products);
        })
        .catch(error => console.error('Error:', error)); // Maneja cualquier error en la solicitud
});