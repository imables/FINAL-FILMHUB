import React from "react";
import Film from "../Film";
import './styles.scss';

/**
 * Now playing loads the details from the API for movies in cinemas.
 * Implements next and back buttons for a better display of movies.
 * 
 * @author Kieron Ferrey
 */

class NowPlaying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
    };
  }

   /**
   * This loads the details from the Api after taking the URL in.
   * 
   * @param {url} url 
   */
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

  /**
   * When the page loads this loads the first page of movies.
   */
  componentDidMount() {
    const url = ("https://api.themoviedb.org/3/movie/now_playing?api_key=5952fca5b680beeeeb34acf859935418&language=en-US&page=" + (this.state.page));
    this.loadDetails(url);
  }

   /**
   * When the back button is pressed the last page of movies is loaded.
   */
  handlePreviousClick = () => {
    this.setState({ page: this.state.page - 1 }, () => {
      const url = ("https://api.themoviedb.org/3/movie/now_playing?api_key=5952fca5b680beeeeb34acf859935418&language=en-US&page=" + (this.state.page))
      this.loadDetails(url);
    });
  };

  /**
   * When the forward button is pressed the next page of movies is loaded.
   */
  handleNextClick = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      const url = ("https://api.themoviedb.org/3/movie/now_playing?api_key=5952fca5b680beeeeb34acf859935418&language=en-US&page=" + (this.state.page))
      this.loadDetails(url);
    });
  };
  
  /**
   * calls above functions and maps the movies to the film class
   * 
   * @returns Movies displayed in a grid formation with buttons
   */
  render() {
    let disabledPrevious = this.state.page <= 1;
    return (
      <div>
        <h1>Now Playing</h1>
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

export default NowPlaying;
