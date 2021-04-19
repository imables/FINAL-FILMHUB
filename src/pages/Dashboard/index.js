import React from "react";
import "./styles.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import { useState, useEffect } from "react";
import { firebaseConfig } from "../../firebase/config";
import { useSelector } from "react-redux";
import "firebase/auth";

/**
 * Profile component that displays user information
 *
 * @author Jakob Ripley
 */

//setting the firestore config to variable db
const db = firebaseConfig.firestore();
const projectFirestore = firebase.firestore();

export const Dashboard = ({user}) => {

//setting the current user to currentUser name.
  const mapState = ({ user }) => ({
    currentUser: user.currentUser,
  });

  //variable initializing for user details.
  const { currentUser } = useSelector(mapState);

  const id = currentUser.id;
  const name = currentUser.displayName;
  const bioUser = currentUser.bio;
  console.log(id, "current user");

  //setting state of variables to equal the current state of application.
  const [bio, setBio] = useState(bioUser);
  const collectionRef = projectFirestore.collection("users").doc(id);
  const [usersFire, setUsersFire] = useState([]);
  const [file, setFile] = useState(null);
  const [reviews, setReviewsFiles] = useState([]);

  //setting authenticated user details to variable. 
  var userInfo = firebase.auth().currentUser;
  console.log(userInfo, "auth user info");

  //setting user info to variables.
  var userName, userEmail, userRole, userDate;

  if (userInfo != null) {
    userName = userInfo.displayName;
    userEmail = userInfo.email;
    userRole = userInfo.userRoles;
    userDate = userInfo.createdDate;
  }

  //functions allowing the user to alter the state of their profile page.
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebaseConfig.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFile(await fileRef.getDownloadURL());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    window.location.reload(false);
    if (!file) {
      return;
    }
    await db.collection("users").doc(id).update({
      image: file,
    });
  };

  const onBioChange = () => {
    // window.location.reload(false);
    db.collection("users").doc(id).update({
      bio: bio,
    });
  };

//useEffect runs at the beginning of each refresh and gets data depending on the where and sets that data to the const userFire/reviews.
  useEffect(() => {
    const fetchUsers = async () => {
      const userWant = await db
        .collection("users")
        .where("displayName", "==", name)
        .get();
      setUsersFire(
        userWant.docs.map((doc) => {
          return doc.data();
        })
      );
      console.log(userWant, "heyyyyyy");
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const userGet = await db
        .collection("reviews")
        .where("uid", "==", id)
        .get();
      setReviewsFiles(
        userGet.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchReviews();
  }, []);

  

  console.log(usersFire, "user1");

  console.log(reviews, "posts1");

  //JSX (HTML) that displays all the gathered data. It also uses map function to get all the individual data. 
  return (
    <div className="mt-4">
      <h1 className="title is-1 has-text-centered box has-backgroud-info-light">
        {" "}
        Your Profile{" "}
      </h1>
      <div className=" grid-container mb-3 card card-content has-text-centered has-background-info-light ">
        <div className="box">
          <p className=" mt-3">Name : {userName}</p>
          <p className=" mb-3 mt-5"> Email : {userEmail}</p>
        </div>
        <br />
        <br />

        <ul>
          {usersFire.map((fire) => {
            return (
              <li key={fire.name}>
                <p className="mt-4 mb-2"></p>
                <img
                  className=" imageShow is-rounded"
                  width="200"
                  height="200"
                  src={fire.image}
                  alt={fire.name}
                />
              </li>
            );
          })}
        </ul>

        <form onSubmit={onSubmit}>
          <input
            className=" fileButton button is-link is-light-red is-medium is-outlined mt-4"
            type="file"
            onChange={onFileChange}
          />
          <button className=" submitButton button is-primary is-light is-medium is-outlined mt-4">
            Save
          </button>
        </form>

        <br />
        <br />
        <br />
        <textarea
          className="biobox pa-3"
          rows="1"
          maxLength="175"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <button
          className=" button is-primary is-pulled-center is-medium mt-4"
          onClick={onBioChange}
        >
          Update Bio
        </button>

        <br />
        
        <br />
      </div>

      <br />
      <br />
      <h1 className="title is-1">Reviews</h1>
      <br />
      <div className="box is-divider">
        {reviews.map((review) => {
          return (
            <div>
              <br />
              <div className="pt-3 pb-3 postsList title is-3">
                {review.movie}{" "}
              </div>
              <p className="captionPost ">{review.review}</p>
              <br />
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};

export default Dashboard;
