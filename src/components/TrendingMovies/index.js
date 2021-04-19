import React from "react";
import Film from "../Film";
import './styles.scss';

class TrendingMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
    };
  }

  loadDetails(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data.results });
        this.setState({})
      })
      .catch((err) => {
        console.log("something went wrong ", err);
      });
  }

  componentDidMount() {
    const url = ("https://api.themoviedb.org/3/movie/popular?language=en&api_key=5952fca5b680beeeeb34acf859935418&page=" + (this.state.page));
    this.loadDetails(url);
  }

  handlePreviousClick = () => {
    this.setState({ page: this.state.page - 1 }, () => {
      const url = ("https://api.themoviedb.org/3/movie/popular?language=en&api_key=5952fca5b680beeeeb34acf859935418&page=" + (this.state.page))
      this.loadDetails(url);
    });
  };

  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      const url = ("https://api.themoviedb.org/3/movie/popular?language=en&api_key=5952fca5b680beeeeb34acf859935418&page=" + (this.state.page))
      this.loadDetails(url);
    });
  };
  render() {
    let disabledPrevious = this.state.page <= 1;
    return (
      <div>
        <h1>Trending Films</h1>
        <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>
          Previous
        </button>
        Page : {this.state.page}
        <button onClick={this.handleNextClick}>
          Next
        </button>
        <div className="films">
          {this.state.data.map((details, i) => (
            <Film key={i} details={details}  />
          ))}
        </div>
        <button onClick={this.handlePreviousClick} disabled={disabledPrevious}>
          Previous
        </button>
        Page : {this.state.page}
        <button onClick={this.handleNextClick}>
          Next
        </button>
      </div>
    );
  }
}

export default TrendingMovies;
