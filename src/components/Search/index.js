import './styles.scss';
import React from "react";

/**
 * Search 
 * 
 * Creates the search fields/
 */
class Search extends React.Component {
    render() {
        return (
            <div className="searchItem">
                Search: 
                <input
                    type="text"
                    placeholder="search"
                    value={this.props.query}
                    onChange={this.props.handleSearch}
                />
            </div>
        )
    }
}

export default Search;