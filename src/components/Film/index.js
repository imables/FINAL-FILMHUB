import React from "react";
import './styles.scss';
import { Link } from "react-router-dom";


class Film extends React.Component {
  state = { data: [] };

  render() {
    return (
      <div className="film" onClick={this.handleClick}>
        <Link to={`/movie_details/${this.props.details.id}`}>
          <img src={"https://image.tmdb.org/t/p/original/" + this.props.details.poster_path} alt="Movie Poster" />
          <h2>{this.props.details.title}</h2>
        </Link>
      </div>
    )
  }
}
export default Film