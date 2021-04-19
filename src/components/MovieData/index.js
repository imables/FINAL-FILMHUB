import './styles.scss';

const MovieData = ({ movie }) => {

    const GetTrailer = () => {
        let trailerOutput = "";
        if (movie.videos.results.length !== 0) {
            trailerOutput = "https://www.youtube.com/embed/" + movie.videos.results[0].key;
            return <iframe src={trailerOutput} alt="Movie trailer"></iframe>
        }
    }

    const GetGenres = () => {
        let genreOutput = "";
        if (movie.genres) {
            var i;
            for (i = 0; i < movie.genres.length; i++) {
                genreOutput = genreOutput + movie.genres[i].name + " ";
            }
        }
        return <h4 className="title is-3">Genres: {genreOutput}</h4>
    }

    const GetCertification = () => {
        let certificationOutput = "";
        var i;
        for (i = 0; i < movie.release_dates.results.length; i++) {
            if (movie.release_dates.results[i].iso_3166_1 == "GB") {
                certificationOutput = movie.release_dates.results[i].release_dates[0].certification;
            }
        }
        return <p>UK Age Certification: {certificationOutput}</p>
    }

    // const GetActors = () => {
    //     const actors = movie.credits.cast;
    //     const actorsOutput = actors.map((actor) =>
    //         <li key={actor.id}>
    //             {actor.profile_path && <img src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}></img>}
    //             {actor.name} - {actor.character}
    //         </li>
    //     );
    //     return <ul>{actorsOutput}</ul>
    // }

    const GetActors = () => {
        const actors = movie.credits.cast;
        const actorsOutput = actors.map((actor) =>
            <tr key={actor.id}>
                <td>{actor.profile_path && <img className="image_test" src={"https://image.tmdb.org/t/p/w500" + actor.profile_path}></img>}</td>
                <td className="p-3">{actor.name}</td>
                <td className="p-3">{actor.character}</td>
            </tr>
        );
        return <tbody>{actorsOutput}</tbody>
    }

    const GetDirector = () => {
        let director = "";
        var i;
        for (i = 0; i < movie.credits.crew.length; i++) {
            if (movie.credits.crew[i].job == "Director") {
                director = movie.credits.crew[i].name;
            }
        }
        return <h5 className="title is-3">Directed by: {director}</h5>
    }

    return (
        <div className="movie-data">
            <div className="movie-graphics ">
               <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="Movie promotion poster"></img>
                {GetTrailer()}
            </div>
            <div className="card card-content content">
            <div className="movie-overview">
                <h2 className="title is-1">{movie.title}</h2>
                <h3 className="title is-2">{movie.tagline}</h3>
                {GetGenres()}
                {GetDirector()}
                <p>{movie.overview}</p>
            </div>
            </div>
        
            <div className="movie-information">
                <p>Release Date: {movie.release_date}</p>
                <p>Runtime: {movie.runtime} minutes</p>
                <p>Rating (out of 10): {movie.vote_average} with {movie.vote_count} votes.</p>
                {GetCertification()}
                <p>Budget: ${movie.budget}</p>
                <p>Revenue: ${movie.revenue}</p>
                <p>Profit/Loss: ${movie.revenue - movie.budget}</p>
            </div>
            <div className="movie-actors">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Actor</th>
                            <th>Character</th>
                        </tr>
                    </thead>
                </table>
                <div className="movie-actors-content">
                    <table>
                        {GetActors()}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MovieData