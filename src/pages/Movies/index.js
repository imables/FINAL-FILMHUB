import React from "react";
import TrendingMovies from "../../components/TrendingMovies";
import NowPlaying from "../../components/NowPlaying";
import NewMovies from "../../components/NewMovies";
import TopRated from "../../components/TopRated";
import './styles.scss';

class FilterMovies extends React.Component {
    state = { displayMovies: <TrendingMovies /> };

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