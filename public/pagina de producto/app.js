document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const sliderContainer = document.getElementById('slider');

    // Función para obtener el ID del producto de la URL
    const getProductIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('productId');
    };

    // Función para obtener detalles del producto de la base de datos
    const fetchProductDetails = async (productId) => {
        const response = await fetch(`/api/products/${productId}`); 
        const product = await response.json();
        return product;
    };

    // Función para renderizar detalles del producto
    const renderProductDetails = (product) => {
        sliderContainer.innerHTML = `
            <div class="slider-section"> 
                <img src="${product.imagen1}" alt="${product.nombre}">
            </div>
            <div class="slider-section">
                <img src="${product.imagen2}" alt="${product.nombre}">
            </div>
            <div class="slider-section">
                <img src="${product.imagen3}" alt="${product.nombre}">
            </div>
        `;

        productContainer.innerHTML = `
            <div class="container-info-product">
                <div class="container-title">${product.nombre}</div>
                <div class="container-price">
                    <span>$${product.precio}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="chevron-rigth-icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg> 
                </div>
                <div class="container-details-product">
                    <div class="container-description">
                        <div class="title-description">
                            <h4>Descripción</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="chevron-down-icon-description">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg> 
                        </div>
                        <div class="text-description">
                            <p>${product.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btn-left">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>             
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="btn-right">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        `;

        // Verificar la generación del HTML
        console.log(sliderContainer.innerHTML);
        console.log(productContainer.innerHTML);

        // CARRUSEL=========================================================
        const btnLeft = document.querySelector(".btn-left"),
            btnRight = document.querySelector(".btn-right"),
            slider = document.querySelector("#slider"),
            sliderSection = document.querySelectorAll(".slider-section");

        // Verificar la selección de elementos
        console.log(btnLeft, btnRight, slider, sliderSection);

        if (btnLeft && btnRight && slider && sliderSection.length > 0) {
            let operacion = 0,
                counter = 0,
                widthImg = 100 / sliderSection.length;

            btnLeft.addEventListener("click", () => moveToLeft());
            btnRight.addEventListener("click", () => moveToRight());

            function moveToRight() {
                if (counter < sliderSection.length - 1) {
                    // Solo avanzamos si no estamos en la última imagen
                    counter++;
                    operacion = operacion + widthImg;
                    slider.style.transform = `translate(-${operacion}%)`;
                    slider.style.transition = "all ease .6s";  // Transición activa
                    console.log('Moved to right:', operacion);
                }
            }

            function moveToLeft() {
                if (counter > 0) {
                    // Solo retrocedemos si no estamos en la primera imagen
                    counter--;
                    operacion = operacion - widthImg;
                    slider.style.transform = `translate(-${operacion}%)`;
                    slider.style.transition = "all ease .6s";  // Transición activa
                    console.log('Moved to left:', operacion);
                }
            }
        }
    };

    // Obtener y renderizar detalles del producto al cargar la página
    const productId = getProductIdFromUrl();
    if (productId) {
        fetchProductDetails(productId).then(product => {
            renderProductDetails(product);
        }).catch(error => {
            console.error('Error fetching product details:', error);
        });
    }
});