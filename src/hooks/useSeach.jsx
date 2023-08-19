import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
    const [query, setQuery] = useState(""); // query es el valor del input
    const [error, setError] = useState(null); // error es el mensaje de error
    const isFirstInput = useRef(true); // useRef es un hook que nos permite guardar valores entre renderizados

    useEffect(() => {
        if (isFirstInput.current) {
            isFirstInput.current = query === "";
            return;
        }
        if (query === "") {
            setError("Porfavor ingrese un nombre de pelicula");
            return;
        }
        if (query.match(/^[0-9]+$/)) {
            setError("Porfavor ingrese un nombre valido");
            return;
        }
        if (query.length < 3) {
            setError("Porfavor ingrese un nombre mas largo");
            return;
        }
        setError(null);
    }, [query]);

    return {
        query,
        setQuery,
        error,
    };
};
