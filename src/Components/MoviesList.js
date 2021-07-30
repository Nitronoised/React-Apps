import SearchBox from "./SearchBox"
import { useState } from "react"
import Artist from "./Artist";

function MoviesList() {
    const [moviesList, setMoviesList] = useState([]);

    async function getMovies(movie) {
        let fixedMovie = movie.replace(' ', '+')
        let response = await fetch(`https://itunes.apple.com/search?term=${fixedMovie}&limit=10`);
        let movies = await response.json();
        setMoviesList(movies.results);
        console.log(movies.results)
    }
    return (
        <div>
            <SearchBox handleInput={getMovies} />
            <div className="artist-list">
                {moviesList.map(movie => <Artist artistName={movie.artistName} type={movie.wrapperType} genre={movie.primaryGenreName} img={movie.artworkUrl100} />)}
            </div>
        </div>
    )
}

export default MoviesList