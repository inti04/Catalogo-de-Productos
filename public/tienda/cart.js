// Este archivo maneja la lógica del carrito de compras, incluyendo la adición y eliminación de productos,
// así como la actualización de la interfaz de usuario para reflejar el estado actual del carrito.

import { rowProduct, cartEmpty, cartTotal, valorTotal, countProduct } from './dom.js';

export let allProducts = JSON.parse(localStorage.getItem('cartProducts')) || []; // Obtiene los productos del carrito desde localStorage o inicializa un array vacío

// Función para agregar un producto al carrito
export const addToCart = (product) => {
    const exist = allProducts.some(p => p.id === product.id); // Verifica si el producto ya existe en el carrito

    if (exist) {
        // Si el producto ya existe, incrementa su cantidad
        allProducts = allProducts.map(p => {
            if (p.id === product.id) {
                p.quantity++;
            }
            return p;
        });
    } else {
        // Si el producto no existe, agrégalo al carrito
        allProducts = [...allProducts, product];
    }

    localStorage.setItem('cartProducts', JSON.stringify(allProducts)); // Guarda el carrito actualizado en localStorage
    showHTML(); // Actualiza la interfaz de usuario
};

// Función para eliminar un producto del carrito
export const removeFromCart = (title) => {
    allProducts = allProducts.filter(product => product.title !== title); // Filtra el producto a eliminar
    localStorage.setItem('cartProducts', JSON.stringify(allProducts)); // Guarda el carrito actualizado en localStorage
    showHTML(); // Actualiza la interfaz de usuario
};

// Función para mostrar el contenido del carrito en la interfaz de usuario
export const showHTML = () => {
    if (allProducts.length === 0) {
        // Si el carrito está vacío, muestra el mensaje de carrito vacío y oculta el contenido del carrito
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        // Si el carrito no está vacío, oculta el mensaje de carrito vacío y muestra el contenido del carrito
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    rowProduct.innerHTML = ''; // Limpia el contenido actual del carrito

    let total = 0;
    let totalOfProduct = 0;

    // Recorre todos los productos en el carrito y genera el HTML para cada uno
    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product"> 
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg> `;
        
        rowProduct.append(containerProduct); // Agrega el producto al contenedor del carrito
        
        total += parseFloat(product.quantity * product.price.slice(1)); // Calcula el total a pagar
        totalOfProduct += product.quantity; // Calcula el total de productos
    });
    
    valorTotal.innerText = `$${total.toFixed(2)}`; // Actualiza el total a pagar en la interfaz de usuario
    countProduct.innerText = totalOfProduct; // Actualiza el contador de productos en la interfaz de usuario
};