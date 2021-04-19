import './styles.scss';
import React from "react";
import Search from "../Search";
import {Link } from "react-router-dom";

/**
 * This creates the search bar and links to the api to return search results.
 * 
 * @author Kieron Ferrey
 */

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            data: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    /**
     * This fetches from the api using the query.
     */
    search = () => {
        const url =
            "https://api.themoviedb.org/3/search/movie?api_key=5952fca5b680beeeeb34acf859935418&language=en-US&page=1&include_adult=false&query=" + this.state.query;
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
     * This sets the query state with the text input from the search box
     * 
     * @param {typing event} e 
     */

    handleSearch = (e) => {
        this.setState({ query: e.target.value }, () => {
            if (e.target.value.trim() === "") {
                this.setState({ query: "" })
            }
            else {
                this.search();
            }
        })
    };

    /**
     * This sanatises the string.
     * 
     * @param {text} s 
     * @returns sanatised text
     */
    searchString = (s) => {
        return s.toLowerCase().includes(this.state.query.toLowerCase());
    };

    /**
     * This gets the search query and passes it to the filter.
     * 
     * @param {search query} details 
     * @returns the search query
     */
    searchDetails = (details) => {
        return this.searchString(details.original_title);
    };

    /**
     * This displays the movie and links to the movie details page when selected.
     * 
     * @returns the search results and search bar
     */
    render() {
        let filteredData = this.state.data.filter(this.searchDetails);
        let displayResults = ""
        if (this.state.query !== "") {
            displayResults = (
                <div class="searchContainer">
                <ul>{
                filteredData.map((details, i) => (
                    <div key={i} className="searchResults">

                        <button>
                            <Link to={`/movie_details/${details.id}`}>
                            <li>{details.original_title}</li>
                            </Link>
                        </button>

                    </div>
                ))}</ul></div>)
        } else {
            displayResults = "";
        }

        return (
            <div className="searchBar">
                <Search query={this.state.query} handleSearch={this.handleSearch} className="searchBox" />
                    {displayResults}
            </div>
        );
    }
}
export default SearchBar