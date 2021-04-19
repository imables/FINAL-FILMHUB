import React, { useState, useEffect } from 'react'
import { storage, db } from './firebase/config';
import {Link} from 'react-router-dom';
import firebase from  'firebase';
import { Avatar } from '@material-ui/core';
import './ShowReview.css'

/**
 * Individual review functionality and showing
 *
 * @author Christopher Lau
 */

function ShowReview({ reviewId, user, username, title, movie, rating, review, imageUrl, likeNum, reviewUserId }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState('likeIt');
    const [show2, setShow2] = useState('likeItText');
    const [reviewImage, setReviewImage] = useState('')
    const [reviewUser, setReviewUser] = useState();
    
    // Gets the user for each review from "users" in firebase
    useEffect(() => {
        if(reviewUserId) {
            db.collection('users').doc(reviewUserId).onSnapshot((snapshot) => {
                setReviewUser(snapshot.data())
            })
        }

    }, [reviewUserId])

    // Gets the data from "reviews" in firebase
    useEffect(() => {
        let allReviews;
        if (reviewId) {
            allReviews = db.collection("reviews").doc(reviewId).collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            allReviews();
        }
    }, [reviewId]);

    //Gets the likes from the 'reviews/likes' section from firebase and the showing like functionality for changing colours
    useEffect(() => {
        db.collection("reviews")
            .doc(reviewId)
            .collection("likes")
            .doc(firebase.auth().currentUser?.uid)
            .get()
            .then(doc2 => {
                if (doc2.data()) {
                    if (show == 'likeIt') {
                        setShow('likeIt blue');
                        setShow2('likeItText bluelikeItText')
                    } else {
                        setShow('likeIt');
                        setShow2('likeItText')
                    }
                }
            })
    }, [reviewId, firebase.auth().currentUser?.uid]);

    // Like functionality for changing colours
    const changingLikes = (event) => {
        event.preventDefault();
        if (show == 'likeIt') {
            setShow('likeIt blue');
            setShow2('likeItText bluelikeItText')
        } else {
            setShow('likeIt');
            setShow2('likeItText')
        }

        // Like functionality for liking and unliking a review
        db.collection('reviews')
            .doc(reviewId)
            .get()
            .then(docc => {
                const data = docc.data()
                console.log(show)
                if (show == 'likeIt') {
                    db.collection("reviews")
                        .doc(reviewId)
                        .collection("likes")
                        .doc(firebase.auth().currentUser?.uid)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                console.log(doc2.data())
                            } else {
                                // Adds a like
                                db.collection("reviews").doc(reviewId).collection("likes").doc(firebase.auth().currentUser?.uid).set({
                                    likes: 1
                                });
                                db.collection('reviews').doc(reviewId).update({
                                    likeNum: data.likeNum + 1
                                });
                            }
                        })

                } else {
                    // Removes the like
                    db.collection('reviews').doc(reviewId).collection('likes').doc(firebase.auth().currentUser?.uid).delete().then(function () {
                        db.collection('reviews').doc(reviewId).update({
                            likeNum: data.likeNum - 1
                        });
                    })
                }
            })
        }

                const commenting = (event) => {
                    event.preventDefault();
                    //Comment adding to firebase
                    db.collection("reviews").doc(reviewId).collection("comments").add({
                        text: comment,
                        uuid: firebase.auth().currentUser?.uid,
                        username: firebase.auth().currentUser?.displayName,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                       //photoURL: user?.photoURL
                    });
                    setComment('');
                }

                useEffect(() => {
                    if(reviewUserId) {
                        db.collection('users').doc(reviewUserId).onSnapshot((snapshot) => {
                            setReviewImage(snapshot.data().photoURL)
                        })
                    }
                }, [])

    return (
        <div className="review">
            <div className="reviewName">
                <h2>{username}</h2>
            </div>

            {/* Shows the title, movie, rating and image from posts */}
            <h2 className="reviewTitle">{title}</h2>    
            <h3 className="reviewMovie">Movie: {movie}</h3>  
            <h3 className="reviewRating">Rating: {rating}/5</h3>    
            <p className="reviewingPara">{review}</p>
            <img src={imageUrl} className="reviewImage" />

            {/* shows the likes */}
            <div className="likeSection">
            <p > {likeNum} {likeNum == 1 ? "Like" : "Likes"}</p>
            </div>
            <hr/>

                {/* on click for the like functionality */}
            <div className="likeDisplay">
                <div className="like" onClick={changingLikes}>
                    <i className={show} />
                    <h3 className={show2}>Like</h3>
                </div>
            </div>
            <hr/>

            {/* Show the commenting area */}
            <form onSubmit={commenting}>
                <div className="commentArea">
                    <Avatar
                        className="currentAcc"
                        alt=""
                        src={firebase.auth().currentUser?.photoURL}
                    />
                    <input className="insertComment" maxlength="300" type="text" placeholder="Type a comment here" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <input type="submit" disabled={!comment} className="hideIt" />
                </div>
            </form>

            {/* Show all the comments */}
            {
                comments.map((comment) => (
                    <div className={`commenter ${comment.username == reviewUser?.displayName && 'myself'}`}>
                        <div class="commentChanges">
                            <span><h3>{comment.username}</h3></span> <p> {comment.text}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ShowReview
