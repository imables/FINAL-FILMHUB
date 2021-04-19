import React from "react";
import "./styles.scss";
import firebase from 'firebase/app';
import { PostList } from "./PostList";

/**
 * Profile component that displays user information
 *
 * @author Jakob Ripley
 */

//setting state to equal the retrieved data from useEffect.
function Posts() {
  const [reviews, setReviews] = React.useState([]);
  

  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("reviews").get();
      setReviews(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  
//JSX (HTML) mapping through the state reviews to get individual reviews from each user then sending to PostList component.
  return (
    <ul>
      {reviews.map(review => (
          <div>
        <li key={review.username}>
          <PostList review={review} />
        </li>
        
        </div>
      ))}
      
    </ul>
  );
}

export default Posts;