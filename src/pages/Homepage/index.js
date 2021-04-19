import React from 'react';
import './styles.scss';
import TrailerSlide from './../../components/TrailerSlides';

const Homepage = props => {

    return (
        <div>
            <TrailerSlide />
            <div className="CinemaMap">
                <h4>Find your local cinema!</h4>
                <iframe title="map" className="map" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d10659.540117739645!2d-1.6111713844770164!3d54.97377656651448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scinemas!5e0!3m2!1sen!2suk!4v1618662922218!5m2!1sen!2suk" allowfullscreen="" loading="lazy"></iframe>
            </div>
        </div>
    );
};

export default Homepage