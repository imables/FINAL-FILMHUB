import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';
import { db, firebase } from './firebase/config.js';
import { review } from 'jquery';

import CreateReview from './CreateReview'
import ShowReview from './ShowReview'
import './ShowAllReviews.css'

/**
 * Shows all reviews
 *
 * @author Christopher Lau
 */

function ShowAllReviews({user}) {
    const history = useHistory("")
    const [reviews, setReviews] = useState([]);

    document.title = "Reviews";

    //orders the reviews and id by timestamp in a descending order
    useEffect(() => {
        db.collection("reviews").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setReviews(snapshot.docs.map(doc => ({
                id: doc.id,
                review: doc.data()
            })))
        })
    }, [])

    console.log(firebase.auth().currentUser);

    //If no user is logged in, they will be pushed to the login page after 1 second
    setTimeout(function(){
        if (firebase.auth().currentUser === null) {
            history.push("/login");
            console.log(firebase.auth().currentUser);
        }
    },1000);

    //Shows all the reviews and lets users create reviews
    return (
        <div className="reviews">
            <CreateReview />
            <p className="all_Reviews">Reviews</p>
            {
                reviews.map(({id, review}) => (
                    <ShowReview key={id} reviewId={id} 
                    user={user} 
                    username={review.username} 
                    title={review.title}
                     movie={review.movie} 
                     rating={review.rating} 
                     review={review.review} 
                     imageUrl={review.imageUrl}
                      likeNum={review.likeNum}
                       reviewUserId={review.uid} 
                       />
                       
                ))
            }
        </div>
    )
}

export default ShowAllReviews