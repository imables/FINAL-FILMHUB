import { useParams } from "react-router-dom";
import MovieData from "../../components/MovieData";
import useFetch from "../../components/UseFetch";
import './styles.scss';

/**
 * Movie details component to communicate with the TMDB API and display results on the browser
 *
 * @author Owen Lambert
 */

const MovieDetails = () => {
    const { id } = useParams();
    const { data: movie, isPending, error } = useFetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=f65bcf9b927ed1509f15aedff2b0187f&append_to_response=videos,release_dates,credits");

    return (
        <div className="movie_content">
            <div className="movie-details">
                {/* Check for errors and displays them if found */}
                {error && <div>{error}</div>}
                {/* Check for if the request is still loading and displays this */}
                {isPending && <div>Loading...</div>}
                {/* Check for if movie data is found and displays this */}
                {movie && <MovieData movie={movie} />}
            </div>
        </div>
    );
}

export default MovieDetails;