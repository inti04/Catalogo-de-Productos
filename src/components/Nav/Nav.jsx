import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import './Nav.css';

const SERVICIOS = ['Ambientación', 'Vestuario', 'Luces y pantallas', 'Montaje', 'Pirotecnia'];
const FAMILIAS = ['Abanico', 'Abrigo', 'Lámpara', 'Pantalla', 'Andamio', 'Cohete', 'Humo'];
const ETIQUETAS = ['nuevo', 'bueno', 'gastado', 'defectuoso'];

const Nav = () => {
    const [showFilters, setShowFilters] = useState(false);
    const { activeFilters, toggleFilter, clearFilters } = useCart();

    const hasActiveFilters =
        activeFilters.servicios.length > 0 ||
        activeFilters.familia.length > 0 ||
        activeFilters.etiquetas.length > 0;

    return (
        <>
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <a href="#" onClick={(e) => { e.preventDefault(); setShowFilters(!showFilters); }}>
                            Filtros
                            {hasActiveFilters && <span className="filter-badge">•</span>}
                        </a>
                    </li>
                    <li className="header__nav-item">
                        <Link to="/pedido">Pedido</Link>
                    </li>
                </ul>
            </nav>

            {showFilters && (
                <div className="filters-panel">
                    <div className="filters-header">
                        <h3>Filtrar por:</h3>
                        <button onClick={() => setShowFilters(false)} aria-label="Cerrar filtros">X</button>
                    </div>

                    <div className="filter-group">
                        <h4>Servicios</h4>
                        <ul>
                            {SERVICIOS.map(servicio => (
                                <li key={servicio}>
                                    <label className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.servicios.includes(servicio)}
                                            onChange={() => toggleFilter('servicios', servicio)}
                                        />
                                        <span className="checkmark"></span>
                                        {servicio}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h4>Familia</h4>
                        <ul>
                            {FAMILIAS.map(familia => (
                                <li key={familia}>
                                    <label className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.familia.includes(familia)}
                                            onChange={() => toggleFilter('familia', familia)}
                                        />
                                        <span className="checkmark"></span>
                                        {familia}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h4>Etiquetas</h4>
                        <ul>
                            {ETIQUETAS.map(etiqueta => (
                                <li key={etiqueta}>
                                    <label className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.etiquetas.includes(etiqueta)}
                                            onChange={() => toggleFilter('etiquetas', etiqueta)}
                                        />
                                        <span className="checkmark"></span>
                                        {etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1)}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-actions">
                        <button onClick={() => setShowFilters(false)} className="apply-btn">
                            Ver resultados
                        </button>
                        <button onClick={clearFilters} className="clear-btn">
                            Limpiar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Nav;
