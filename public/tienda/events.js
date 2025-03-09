// Este archivo maneja los eventos de la aplicación, incluyendo la carga de productos desde la API,
// la búsqueda de productos, la clasificación de productos por servicio, y la gestión del carrito de compras.

import { addToCart, removeFromCart, showHTML } from './cart.js';
import { productContainer, btnCart, containerCartProduct, menuToggle, menu } from './dom.js';
import { displayProducts } from './templates.js'; // Asegúrate de importar displayProducts

document.addEventListener('DOMContentLoaded', () => {
    // Obtiene los elementos del DOM para el menú de servicios y el menú vertical
    const Servicios = document.getElementById('Servicios');
    const menuVertical = document.querySelector('.menu-vertical');

    // Maneja el evento de clic en el menú de servicios para mostrar/ocultar el menú vertical
    Servicios.addEventListener('click', function(event) {
        event.preventDefault();
        menuVertical.style.display = menuVertical.style.display === 'block' ? 'none' : 'block';
    });

    // Realiza una solicitud a la API para obtener los productos
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            // Muestra los productos en la página
            displayProducts(products);

            // Obtiene los enlaces de servicio y agrega eventos de clic para filtrar productos por servicio
            const servicioLinks = document.querySelectorAll('.servicio');
            servicioLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const servicio = event.target.getAttribute('data-servicio');
                    if (servicio === 'atras') {
                        // Muestra todos los productos si se selecciona "atras"
                        displayProducts(products);
                    } else {
                        // Filtra y muestra los productos según el servicio seleccionado
                        const filteredProducts = products.filter(product => product.Servicio === servicio);
                        displayProducts(filteredProducts);
                    }
                });
            });

            // Maneja el evento de entrada en el cuadro de búsqueda para filtrar productos por nombre
            const searchBox = document.querySelector('.search-box');
            searchBox.addEventListener('input', function(event) {
                const searchTerm = event.target.value.toLowerCase();
                const filteredProducts = products.filter(product => product.Nombre.toLowerCase().includes(searchTerm));
                displayProducts(filteredProducts);
            });
        })
        .catch(error => console.error('Error:', error));
});

// Maneja los eventos de clic en los botones de agregar al carrito y eliminar del carrito
document.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        // Agrega el producto al carrito
        const product = e.target.parentElement.parentElement;
        const infoProduct = {
            id: e.target.getAttribute('data-id'),
            quantity: 1,
            title: product.querySelector('h2').textContent,
            precio: product.querySelectorAll('p')[1].textContent,
            image: product.querySelector('img').src
        };
        addToCart(infoProduct);
    } else if (e.target.classList.contains('icon-close')) {
        // Elimina el producto del carrito
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;
        removeFromCart(title);
    }
});

// Maneja el evento de clic en el icono del carrito para mostrar/ocultar el contenido del carrito
btnCart.addEventListener('click', function() {
    containerCartProduct.classList.toggle('hidden-cart');
});

// Maneja el evento de clic en el botón de menú para mostrar/ocultar el menú
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Inicializa el carrito al cargar la página
showHTML();