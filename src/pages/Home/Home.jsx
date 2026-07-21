import { useEffect, useMemo } from 'react';
import Product from '../../components/Product/Product';
import { useCart } from '../../context/useCart';
import { useParams } from 'react-router-dom';
import productsData from '../../data/products';

const Home = () => {
    const { setAllProducts, filteredProducts } = useCart();
    const { tipoServicio } = useParams();

    useEffect(() => {
        setAllProducts(productsData);
    }, [setAllProducts]);

    const productsToShow = useMemo(() => {
        if (!tipoServicio) return filteredProducts;
        return filteredProducts.filter(
            product => product.tipo.toLowerCase() === tipoServicio.toLowerCase()
        );
    }, [filteredProducts, tipoServicio]);

    return (
        <main>
            {productsToShow.length > 0 ? (
                <div className="container-items">
                    {productsToShow.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="no-results">No se encontraron productos.</p>
            )}
        </main>
    );
};

export default Home;
