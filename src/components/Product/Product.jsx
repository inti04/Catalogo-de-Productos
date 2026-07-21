import { useMemo } from 'react';
import { useCart } from '../../context/useCart';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ product }) => {
    const { addToCart, cartProducts } = useCart();

    const availableQuantity = useMemo(() => {
        const inCartQuantity = cartProducts.find(p => p.id === product.id)?.quantity || 0;
        return (product.stock ?? 0) - inCartQuantity;
    }, [cartProducts, product.id, product.stock]);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevenir la navegación
        e.stopPropagation(); // Prevenir que el evento se propague
        if (availableQuantity <= 0) return;

        addToCart({
            id: product.id,
            title: product.title,
            precio: product.precio,
            image: product.images?.[0]
        });
    };

    return (
        <div className={`item ${availableQuantity <= 0 ? 'out-of-stock' : ''}`} data-id={product.id}>
            <figure>
                <Link to={`/product/${product.id}`} className="product-link">
                    <img src={product.images[0]} alt={product.title} loading="lazy" />
                </Link>
            </figure>
            <div className="info-product">
                <h2>{product.title}</h2>
                <p className="price">${product.precio.toFixed(2)}</p>
                <span className="product-quantity" data-id={product.id}>
                    <p>Disponibles: {availableQuantity}</p>
                </span>
                <button
                    className="btn-add-cart"
                    onClick={handleAddToCart}
                    disabled={availableQuantity <= 0}
                >
                    {availableQuantity <= 0 ? 'Agotado' : 'Añadir al carrito'}
                </button>
            </div>
        </div>
    );
};

export default Product;
