const API_KEY = "4287ad07";

export const searchMovies = async ({ query }) => {
    if (query === "") return null;

    try {
        const peticion = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        const respuesta = await peticion.json();
        const movies = respuesta.Search; // obtenemos las peliculas de la respuesta
        const mappedMovies = movies?.map((movie) => ({
            // cambiamos el nombre de las propiedades
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
        }));
        return mappedMovies;
    } catch (error) {
        throw new Error(error);
    }
};
