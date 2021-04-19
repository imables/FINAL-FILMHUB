import React from "react";
import firebase from 'firebase/app';

/**
 * Profile component that displays user information
 *
 * @author Jakob Ripley
 */

// function the displays the review next to username with a delete button only available to the Admin.
export const PostList = ({ review }) => {


  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('reviews').doc(review.id).delete()
    window.location.reload(false);
  }

  return (
    <>
      <div className="card card-content content box">
        <div className="box">{review.username} : {review.review}</div>
      <button className="button is-danger is-medium" onClick={onDelete}>Delete</button>
      </div>
    </>
  );
};