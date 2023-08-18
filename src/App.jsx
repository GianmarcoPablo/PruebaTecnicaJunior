import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const isFirstInput = useRef(true);

    useEffect(() => {
        if(isFirstInput.current) {
            isFirstInput.current = query === "";
            return;
        }
        if (query === "") {
            setError("Please enter a movie name");
            return;
        }
        if (query.match(/^[0-9]+$/)) {
            setError("Please enter a valid movie name");
            return;
        }
        if (query.length < 3) {
            setError("Please enter at least 3 characters");
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

export const App = () => {
    const { movies } = useMovies();
    const { query, setQuery, error } = useSearch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(query);
    };

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
    };


    return (
        <div className="page">
            <header>
                <h1>Aqui van las peliculas</h1>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        name="search"
                        value={query}
                        onChange={handleChange}
                        placeholder="Avenger, Star Wars, The Matrix ...."
                    />
                    <button type="submit">Search</button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </header>
            <main>
                <Movies movies={movies} />
            </main>
        </div>
    );
};
