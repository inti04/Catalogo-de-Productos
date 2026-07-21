import { createContext, useState, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext();

const EMPTY_FILTERS = { servicios: [], familia: [], etiquetas: [] };

// Quita acentos y pasa a minusculas para poder comparar texto sin importar mayusculas/tildes
const isDiacriticMark = (codePoint) => codePoint >= 0x0300 && codePoint <= 0x036f;
const normalize = (text = '') =>
    text
        .toString()
        .normalize('NFD')
        .split('')
        .filter((char) => !isDiacriticMark(char.codePointAt(0)))
        .join('')
        .toLowerCase();

export const CartProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartProducts, setCartProducts] = useLocalStorage('cartProducts', []);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState(EMPTY_FILTERS);

    // Alterna un valor dentro de una categoría de filtro (servicios, familia o etiquetas)
    const toggleFilter = useCallback((category, value) => {
        setActiveFilters(prev => {
            const current = prev[category];
            const next = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [category]: next };
        });
    }, []);

    const clearFilters = useCallback(() => setActiveFilters(EMPTY_FILTERS), []);

    // Catálogo visible: se deriva de la búsqueda + filtros activos, nunca "cae" a mostrar todo por error
    const filteredProducts = useMemo(() => {
        const term = normalize(searchTerm.trim());
        const { servicios, familia, etiquetas } = activeFilters;

        return allProducts.filter(product => {
            if (term && !normalize(product.title).includes(term) && !normalize(product.id).includes(term)) {
                return false;
            }
            if (servicios.length && !servicios.some(v => normalize(v) === normalize(product.tipo))) {
                return false;
            }
            if (familia.length && !familia.some(v => normalize(v) === normalize(product.familia))) {
                return false;
            }
            if (etiquetas.length && !etiquetas.some(v => normalize(product.estado).includes(normalize(v)))) {
                return false;
            }
            return true;
        });
    }, [allProducts, searchTerm, activeFilters]);

    const addToCart = useCallback((product) => {
        setCartProducts(prev => {
            const existingProduct = prev.find(p => p.id === product.id);
            if (existingProduct) {
                return prev.map(p =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }, [setCartProducts]);

    const removeFromCart = useCallback((productId) => {
        setCartProducts(prev => prev.filter(p => p.id !== productId));
    }, [setCartProducts]);

    const clearCart = useCallback(() => setCartProducts([]), [setCartProducts]);

    const totalItems = useMemo(
        () => cartProducts.reduce((sum, product) => sum + product.quantity, 0),
        [cartProducts]
    );
    const totalPrice = useMemo(
        () => cartProducts.reduce((sum, product) => sum + (product.quantity * product.precio), 0),
        [cartProducts]
    );

    return (
        <CartContext.Provider value={{
            // Estado del carrito
            cartProducts,
            allProducts,
            filteredProducts,

            // Funciones del carrito
            addToCart,
            removeFromCart,
            clearCart,

            // Totales
            totalItems,
            totalPrice,

            // Búsqueda y filtros
            searchTerm,
            setSearchTerm,
            activeFilters,
            toggleFilter,
            clearFilters,

            // Manejo de productos
            setAllProducts
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
