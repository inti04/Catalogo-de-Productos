// Este archivo contiene funciones para crear el HTML de los productos y mostrarlos en la página.

export const createProductHTML = (product) => `
    <div class="item">
        <a href="/pagina de producto/index.html?productId=${product.Id}">
            <figure>
                <img src="${product.Imagen1}" alt="${product.Nombre}">
            </figure>
        </a>
            <div class="info-product">
                <h2>${product.Nombre}</h2>
                <p>$${product.Precio}</p>
                <button class="btn-add-cart" data-id="${product.Id}">Agregar al carrito</button>
            </div>
    </div>
`;

// Función para mostrar los productos en la página
export const displayProducts = (products) => {
    const productContainer = document.getElementById('product-container'); // Obtiene el contenedor de productos del DOM
    productContainer.innerHTML = products.map(createProductHTML).join(''); // Genera el HTML de los productos y lo inserta en el contenedor
};