import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const stored = window.localStorage.getItem(key);
            return stored !== null ? JSON.parse(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // localStorage no disponible (modo privado, cuota excedida, etc.)
        }
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
