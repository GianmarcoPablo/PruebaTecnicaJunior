import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { searchMovies } from "../services/movies";

export const useMovies = ({ query, sort }) => {
    const [movies, setMovies] = useState([]); // estado inicial vacio
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previusQuery = useRef(query);

    const getMovies = useCallback(async ({ query }) => {
        if (previusQuery.current === query) return;
        try {
            setLoading(true);
            setError(null);
            previusQuery.current = query;
            const newMovie = await searchMovies({ query });
            setMovies(newMovie);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);
    
    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies;
    }, [movies, sort]);

    return {
        movies: sortedMovies, //funcion que obtiene las peliculas
        getMovies, //funcion que obtiene las peliculas
        loading, //carga de datos
        error, // mensaje de error
    };
};
