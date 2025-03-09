// Este archivo maneja la lógica del carrito de compras, incluyendo la adición y eliminación de productos,
// así como la actualización de la interfaz de usuario para reflejar el estado actual del carrito.

import { rowProduct, cartEmpty, cartTotal, valorTotal, countProduct } from './dom.js';

export let allProducts = JSON.parse(localStorage.getItem('cartProducts')) || []; // Obtiene los productos del carrito desde localStorage o inicializa un array vacío

// Función para actualizar la cantidad en la página principal
const updateProductQuantity = (productId, newQuantity) => {
    const quantityElement = document.querySelector(`.product-quantity[data-id="${productId}"]`);
    const productContainer = document.querySelector(`.item[data-id="${productId}"]`);
    const addButton = document.querySelector(`.btn-add-cart[data-id="${productId}"]`);

    if (quantityElement) {
        quantityElement.textContent = newQuantity;
    }

    if (productContainer && addButton) {
        if (newQuantity === 0) {
            productContainer.classList.add('out-of-stock');
            addButton.disabled = true;
        } else {
            productContainer.classList.remove('out-of-stock');
            addButton.disabled = false;
        }
    }
};

// Función para agregar un producto al carrito
export const addToCart = (product) => {
    const productId = product.id;
    const quantityElement = document.querySelector(`.product-quantity[data-id="${productId}"]`);

    // Verificar si la cantidad del producto es 0
    if (quantityElement && parseInt(quantityElement.textContent) === 0) {
        alert('Este producto está agotado.'); // Mostrar un mensaje de alerta
        return; // Salir de la función sin agregar el producto al carrito
    }

    const exist = allProducts.some(p => p.id === product.id);

    if (exist) {
        allProducts = allProducts.map(p => {
            if (p.id === product.id) {
                p.quantity++;
            }
            return p;
        });
    } else {
        allProducts = [...allProducts, product];
    }

    // Disminuir la cantidad en la página principal
    if (quantityElement) {
        let currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 0) {
            currentQuantity--;
            quantityElement.textContent = currentQuantity;
            updateProductQuantity(productId, currentQuantity); // Actualiza la interfaz
        }
    }

    localStorage.setItem('cartProducts', JSON.stringify(allProducts));
    showHTML();
};

// Función para eliminar un producto del carrito
export const removeFromCart = (title) => {
    const productToRemove = allProducts.find(product => product.title === title);
    if (productToRemove) {
        // Restaurar la cantidad en la página principal
        const productId = productToRemove.id;
        const quantityElement = document.querySelector(`.product-quantity[data-id="${productId}"]`);
        if (quantityElement) {
            let currentQuantity = parseInt(quantityElement.textContent);
            currentQuantity += productToRemove.quantity;
            quantityElement.textContent = currentQuantity;
            updateProductQuantity(productId, currentQuantity); // Actualiza la interfaz
        }

        allProducts = allProducts.filter(product => product.title !== title);
        localStorage.setItem('cartProducts', JSON.stringify(allProducts));
        showHTML();
    }
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
                <span class="precio-producto-carrito">${product.precio}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg> `;
        
        rowProduct.append(containerProduct); // Agrega el producto al contenedor del carrito
        
        total += parseFloat(product.quantity * product.precio.slice(1)); // Calcula el total a pagar
        totalOfProduct += product.quantity; // Calcula el total de productos
    });
    
    valorTotal.innerText = `$${total.toFixed(2)}`; // Actualiza el total a pagar en la interfaz de usuario
    countProduct.innerText = totalOfProduct; // Actualiza el contador de productos en la interfaz de usuario
};