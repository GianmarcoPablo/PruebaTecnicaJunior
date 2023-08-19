export const ListOfMovies = ({ movies }) => {
    return (
        <ul className="movies">
            {movies.map((movie) => (
                <li className="movie" key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title} />
                </li>
            ))}
        </ul>
    );
};

export const NoMoviesResult = () => {
    return <p>No movies found</p>;
};

export const Movies = ({ movies }) => {
    const hasMovies = movies && movies.length > 0;
    return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />;
};
