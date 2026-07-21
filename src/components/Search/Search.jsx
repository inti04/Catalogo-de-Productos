import { useState, useEffect } from 'react';
import { useCart } from '../../context/useCart';
import './Search.css';

const Search = () => {
    const [inputValue, setInputValue] = useState('');
    const { setSearchTerm } = useCart();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(inputValue);
        }, 300); // Debounce de 300ms

        return () => clearTimeout(timer);
    }, [inputValue, setSearchTerm]);

    return (
        <div className="buscar">
            <input
                type="text"
                className="search-box"
                placeholder="Buscar productos..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
};

export default Search;
