import React, { useState } from "react";
import { storage, db, auth } from "./firebase/config";
import firebase from "firebase";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateReview.css";
import "bulma/css/bulma.min.css";

/**
 * Functionality for creating a review
 *
 * @author Christopher Lau
 */

function CreateReview() {
  const user = firebase.auth().currentUser;
  const [openCreate, setOpenCreate] = useState(false);
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState("");

  const [review, setReview] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [likeNum, setLikeNum] = useState(0);
  const [scroll, setScroll] = React.useState("paper");

  //setting images
  const change = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    setImageURL(URL.createObjectURL(e.target.files[0]));
  };

  //opens on click
  const clickToOpen = (scrollType) => () => {
    setOpenCreate(true);
    setScroll(scrollType);
  };

  //handles the closing
  const close = () => {
    setOpenCreate(false);
    setImage("");
    setImageURL("");
  };

  const descElement = React.useRef(null);

  React.useEffect(() => {
    if (openCreate) {
      const { current: descriptionElement } = descElement;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openCreate]);

  //makes the upload functionality work
  const uploader = (event) => {
    if (document.getElementsByClassName("hidden")[0]) {
      document.getElementsByClassName("hidden")[0].classList.remove("hidden");
    }
    document.getElementsByClassName("buttonCSS").disabled = true;
    document.getElementsByClassName("buttonCSS")[0].classList.add("disabled");

    //Adds the review data to the firebase database
    if (review == "" && imageURL == "" && title == "" && movie == "") {
      console.log("User cannot upload");
    } else {
      event.preventDefault();
      if (imageURL == "") {
        db.collection("reviews").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          title: title,
          movie: movie,
          rating: rating,
          review: review,
          imageUrl: "",
          likeNum: likeNum,
          username: firebase.auth().currentUser?.displayName,
          uid: user?.uid,
        });
        close();
        setProgressBar(0);
        setRating("");
        setTitle("");
        setMovie("");
        setReview("");
        setImage(null);
      } else {
        //Progress bar functionality
        const uploadIt = storage.ref(`images/${image.name}`).put(image);
        uploadIt.on(
          "state_changed",
          (snapshot) => {
            const progressBar = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progressBar);
          },
          (error) => {
            console.log(error);
            alert(error.message);
          },
          () => {
            storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                //Adds data to firebase database
                db.collection("reviews").add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  title: title,
                  movie: movie,
                  rating: rating,
                  review: review,
                  imageUrl: url,
                  likeNum: likeNum,
                  username: firebase.auth().currentUser?.displayName,
                  uid: user?.uid,
                });
                close();
                setProgressBar(0);
                setTitle("");
                setMovie("");
                setRating("");
                setReview("");
                setImage(null);
              });
          }
        );
      }
    }
  };

  return (
    <div className="imageupload">
      {/* Dialog makes it open as a small window */}
      <Dialog
        open={openCreate}
        closeIt={close}
        scroll={scroll}
        fullWidth
        maxWidth="md"
      >
        <div class="dialogBack">
          {/* The head of the posting section (including H1 and the closing icon) */}
          <div class="topBar">
            <h1 className="review_topTitle">Review a movie!</h1>
            <CloseIcon class="close_icon" onClick={close} />
          </div>
          <div className="google_all">
            {/* Shows the current logged in profile and profile image */}
            <img
              src={firebase.auth().currentUser?.photoURL}
              className="google_img"
            />
            <h1 className="google_name">
              {firebase.auth().currentUser?.displayName}
            </h1>
          </div>

          {/* Text areas for the review title and movie name */}
          <div class="typing_section">
            <textarea
              class="review_title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows="1"
              placeholder={`Review title`}
              maxLength="100"
              required
            />
            <textarea
              class="movie_title"
              value={movie}
              onChange={(e) => setMovie(e.target.value)}
              rows="1"
              placeholder={`Movie title`}
              maxLength="500"
              required
            />

            {/* Movie rating */}
            <div className="rating">
              <div className="select is-rounded">
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                >
                  <option value="" readOnly>
                    Please select a rating for the movie:
                  </option>
                  <option value="1">1/5</option>
                  <option value="2">2/5</option>
                  <option value="3">3/5</option>
                  <option value="4">4/5</option>
                  <option value="5">5/5</option>
                </select>
              </div>
            </div>

            {/* Review paragraph section */}
            <textarea
              className="reviewPara"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="4"
              placeholder={`Write your review here, ${
                firebase.auth().currentUser?.displayName
              }`}
              maxLength="10000"
            />
          </div>

          {/* Image uploading section */}
          <div className="imageUp">
            <div class="file is-centered is-white is-boxed has-name">
              <label class="file-label">
                <input
                  class="file-input"
                  onChange={change}
                  type="file"
                  accept="image/*"
                />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Select image…</span>
                </span>
                <span class="file-name">Upload a review image!</span>
              </label>
            </div>
          </div>

              <div class="previewImage2">
          <div class={`previewImage ${!image && "vanish"}`}>
            <img src={imageURL} className="previewImage" />
          </div>
          </div>

          {/* Shows the progress bar */}
          <div className="progress_Align">
          <progress value={progressBar} className="hidden" max="100" />
          </div>
          
          {/* The button to upload (will not work if rating or para is empty) */}
          <div className="button_Align">
          <button
            onClick={uploader}
            type="submit"
            class={`buttonCSS ${review.length < 1 && "disabled"} && ${
              rating.length < 1 && "disabled"
            } ${imageURL != "" && "visible"}`}
          >
            Upload your review!
          </button>
          </div>
        </div>
      </Dialog>

      {/* Shows the box that can be clicked to open the dialog box */}
      <div class="createAPost">
        <div class="openCreateAPost">
          <img src={firebase.auth().currentUser?.photoURL} class="Avatar"/>
          <input
            value={review}
            onChange={(e) => setReview(e.target.value)}
            onClick={clickToOpen("body")}
            placeholder= "Create a review here!"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateReview;
