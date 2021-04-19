import React from "react";
import './styles.scss';

/**
 * This gets the video id from the api using the movie id 
 * and uses that to create an iframe to display the video 
 * 
 * @author kieron Ferrey
 */

class Video extends React.Component {
    state = { data: [] };
  
    /**
     * This gets the youtube video url for the first trailer released for the id.
     */
    componentDidMount() {
      const url ="https://api.themoviedb.org/3/movie/"+this.props.details.id+"?api_key=f65bcf9b927ed1509f15aedff2b0187f&append_to_response=videos,release_dates,credits";
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
          this.setState({ data: data.videos.results[0].key});
      })
      .catch((err) => {
          console.log("something went wrong ", err);
      });
    }

    /**
     * this displays the youtube video.
     * @returns youtube video
     */
  render() {
    return (
        <div className="video" onClick={this.handleClick}>
            <iframe src={"https://www.youtube.com/embed/"+this.state.data} alt="Movie trailer" title={this.props.id} allowFullScreen></iframe>
      </div>)
  }
}
export default Video