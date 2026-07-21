import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        setProduct(productsData.find(p => p.id === productId) || null);
        setCurrentImage(0);
    }, [productId]);

    const nextImage = () => {
        if (product?.images?.length) {
            setCurrentImage(prev => (prev + 1) % product.images.length);
        }
    };

    const prevImage = () => {
        if (product?.images?.length) {
            setCurrentImage(prev => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    if (!product) {
        return (
            <main className="product-detail-container">
                <p>Producto no encontrado.</p>
                <Link to="/" className="back-button">Volver al catálogo</Link>
            </main>
        );
    }

    return (
        <main className="product-detail-container">
            <div className="container-carousel">
                {product.images?.length > 0 ? (
                    <div className="carrusel">
                        <img
                            src={product.images[currentImage]}
                            alt={product.title}
                            className="product-image"
                        />
                        {product.images.length > 1 && (
                            <>
                                <button className="btn-left" onClick={prevImage} aria-label="Imagen anterior">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <button className="btn-right" onClick={nextImage} aria-label="Imagen siguiente">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                                <div className="carrusel-dots">
                                    {product.images.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`carrusel-dot ${index === currentImage ? 'active' : ''}`}
                                            onClick={() => setCurrentImage(index)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="no-image">Imagen no disponible</div>
                )}
            </div>

            <div className="container-product-info">
                <div className="container-info-product">
                    <div className="container-details-product">
                        <div className="container-description">
                            <div className="title-description"><h4>Código</h4></div>
                            <div className="text-description"><p>{product.id}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Nombre</h4></div>
                            <div className="text-description"><p>{product.title}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Descripción</h4></div>
                            <div className="text-description"><p>{product.description}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Precio</h4></div>
                            <div className="text-description"><p>${product.precio.toFixed(2)}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Tipo</h4></div>
                            <div className="text-description"><p>{product.tipo}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Familia</h4></div>
                            <div className="text-description"><p>{product.familia}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Unidad de medida</h4></div>
                            <div className="text-description"><p>{product.unidadDeMedida}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Estado</h4></div>
                            <div className="text-description"><p>{product.estado}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Época</h4></div>
                            <div className="text-description"><p>{product.epoca}</p></div>
                        </div>
                        <div className="container-description">
                            <div className="title-description"><h4>Stock</h4></div>
                            <div className="text-description"><p>{product.stock}</p></div>
                        </div>
                    </div>
                </div>

                <Link to="/" className="back-button">
                    Volver al catálogo
                </Link>
            </div>
        </main>
    );
};

export default ProductDetail;
