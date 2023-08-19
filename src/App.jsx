import { useCallback, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies, useSearch } from "./hooks";
import debounce from "just-debounce-it";

export const App = () => {
    const [sort, setSort] = useState(false);
    const { query, setQuery, error } = useSearch();
    const { movies, getMovies, loading } = useMovies({ query, sort }); // hook que trae las peliculas

    const deboundcedGetMovies = useCallback(
        debounce((query) => {
            getMovies({ query });
        }, 1000),
        [getMovies]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        getMovies({ query });
    };

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        deboundcedGetMovies(newQuery);
    };

    const handleSort = () => {
        setSort(!sort);
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
                    <input
                        type="checkbox"
                        checked={sort}
                        onChange={handleSort}
                    />
                    <button type="submit">Search</button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </header>
            <main>
                {loading ? <p>Loading...</p> : <Movies movies={movies} />}
            </main>
        </div>
    );
};
