import { useCart } from '../../context/useCart';
import { Link } from 'react-router-dom';
import './Pedido.css';

const Pedido = () => {
    const { cartProducts, totalItems, totalPrice } = useCart();

    return (
        <main className="pedido-container">
            <div className="listado-title-container">
                <h1 className="listado-title">Listado de Pedido</h1>
            </div>
            {cartProducts.length === 0 ? (
                <p className="cart-empty">El carrito está vacío</p>
            ) : (
                <>
                    <table className="listado-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>ID</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td>{product.id}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.precio.toFixed(2)}</td>
                                    <td>${(product.precio * product.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="2"></td>
                                <td>{totalItems} artículo{totalItems !== 1 ? 's' : ''}</td>
                                <td>Total:</td>
                                <td id="total-amount">${totalPrice.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </>
            )}
            <Link to="/" className="back-button">
                Volver al catálogo
            </Link>
        </main>
    );
};

export default Pedido;
