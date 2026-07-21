import { useState } from 'react';
import { useCart } from '../../context/useCart';
import { FiShoppingCart, FiX } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
    const {
        cartProducts,
        removeFromCart,
        totalItems,
        totalPrice
    } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="container__icon-shop">
            <button
                type="button"
                className="container-cart-icon"
                onClick={() => setIsCartOpen(!isCartOpen)}
                aria-label="Ver carrito"
            >
                <FiShoppingCart className="icon-cart" />
                {totalItems > 0 && (
                    <div className="count-product">
                        <span>{totalItems}</span>
                    </div>
                )}
            </button>

            <div className={`container-cart-product ${!isCartOpen ? 'hidden-cart' : ''}`}>
                {cartProducts.length === 0 ? (
                    <p className="cart-empty">El carrito está vacío</p>
                ) : (
                    <>
                        <div className="row-product">
                            {cartProducts.map(product => (
                                <div key={product.id} className="cart-product">
                                    {product.image && (
                                        <img className="cart-product-image" src={product.image} alt={product.title} />
                                    )}
                                    <div className="info-cart-product">
                                        <p className="titulo-producto-carrito">{product.title}</p>
                                        <span className="cantidad-producto-carrito">
                                            {product.quantity} x ${product.precio.toFixed(2)}
                                        </span>
                                        <span className="precio-producto-carrito">
                                            ${(product.precio * product.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                    <FiX
                                        className="icon-close"
                                        onClick={() => removeFromCart(product.id)}
                                        aria-label={`Quitar ${product.title} del carrito`}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="cart-total">
                            <h3>Total:</h3>
                            <span className="total-pagar">${totalPrice.toFixed(2)}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
