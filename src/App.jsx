import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Pedido from './pages/Pedido/Pedido';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <CartProvider>
            <Header />
            <div className="bottom-footer">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/pedido" element={<Pedido />} />
                    <Route path="/servicio/:tipoServicio" element={<Home />} />
                    {/* Ruta de fallback para manejar rutas no encontradas */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </CartProvider>
    );
}

export default App;