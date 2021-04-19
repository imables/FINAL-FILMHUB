import React from "react";
import TrendingMovies from "../../components/TrendingMovies";
import NowPlaying from "../../components/NowPlaying";
import NewMovies from "../../components/NewMovies";
import TopRated from "../../components/TopRated";
import './styles.scss';

/**
 * This shows the movies page displays filters and calling the correct class for each
 * @author Kieron Ferrey
 */

class FilterMovies extends React.Component {
    state = { displayMovies: <TrendingMovies /> };

    /**
     * This sets the state depending on which button is pressed.
     * @param {the button thats pressed} e 
     */

    handleButton = (e) => {
        this.setState({ displayMovies: e.target.value }, () => {
            if (e.target.value === "NewMovies") {
                this.setState({ displayMovies: <NewMovies /> })
            } else if (e.target.value === "NowPlaying") {
                this.setState({ displayMovies: <NowPlaying /> })
            } else if (e.target.value === "TopRated") {
                this.setState({ displayMovies: <TopRated /> })
            } else if (e.target.value === "TrendingMovies") {
                this.setState({ displayMovies: <TrendingMovies /> })
            }
        })
    }

    /**
     * displays the buttons and the class which is pressed.
     * @returns the filter buttons.
     */
    render() {
        return (
            <div>
                Filter :
                <button value="NewMovies" onClick={this.handleButton}>New Movies</button>
                <button value="NowPlaying" onClick={this.handleButton}>Now Playing</button>
                <button value="TopRated" onClick={this.handleButton}>Top Rated</button>
                <button value="TrendingMovies" onClick={this.handleButton}>Trending Movies</button>
                {this.state.displayMovies}
            </div>
        );
    }
}
export default FilterMovies