import React, { useState, useEffect } from "react";
import "./Single.css";
import { loggedIn } from "../SearchedPage/SearchPage";

export default function Single({ match }) {
  const [animeData, setAnimeData] = useState([]);
  const id = parseInt(match.params.slug);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://api.aniapi.com/v1/anime")
      .then((response) => response.json())
      .then((data) => setAnimeData(data.data.documents));
  }, []);

  const selAnime = animeData.filter((anime) => {
    return anime.anilist_id === id;
  });

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      review: {
        description: reviewText,
        rating: reviewRating,
      },
    }),
  };

  useEffect(() => {
    fetch("https://animereview2.herokuapp.com/api/review/" + id)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      });
  }, [reviewRating]);

  const postReview = async () => {
    await fetch("https://animereview2.herokuapp.com/api/review", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postReview();
    setReviewText("");
    setReviewRating(0);
  };

  let access_token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "";

  return access_token ? (
    <div className="single">
      {selAnime.length > 0 ? (
        <div>
          <img className="banner-img" src={selAnime[0].banner_image} alt="" />
          <div className="single-main-div">
            <img className="cover-img" src={selAnime[0].cover_image} alt="" />
            <div>
              <h1>{selAnime[0].titles.en}</h1>
              <p>
                <b>Description: </b>
                {selAnime[0].descriptions.en}
              </p>
              <p>
                <b>Trailer: </b>
                {selAnime[0].trailer_url ? (
                  <a className="trailer_url" href={selAnime[0].trailer_url}>
                    {selAnime[0].trailer_url}
                  </a>
                ) : (
                  "Not Available"
                )}
              </p>
              <p>
                <b>Season Year: </b>
                {selAnime[0].season_year}
              </p>
              <p>
                <b>Episode Duration: </b> {selAnime[0].episode_duration}
              </p>
              <p>
                <b>Epiosodes Count: </b>
                {selAnime[0].episodes_count}
              </p>
              <p>
                <b>Start Date: </b>
                {selAnime[0].start_date}
              </p>
              <p>
                <b>End Date: </b>
                {selAnime[0].end_date}
              </p>
              <p>
                <b>Rating: </b>
                {selAnime[0].score / 20}
              </p>
              <p>
                <b>Genres: </b>
                {selAnime[0].genres.map((genre) => (
                  <span className="genre">{genre}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="reviews">
        <h2>Give a Review!</h2>
        <form className="write-review" onSubmit={handleSubmit}>
          <textarea
            value={reviewText}
            rows="10"
            cols="100"
            placeholder="Enter a Review"
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <input
            value={reviewRating}
            type="number"
            min="1"
            max="5"
            placeholder="Rating"
            onChange={(e) => setReviewRating(e.target.value)}
          />
          <input className="submit" type="submit" />
        </form>

        <h2>Reviews</h2>
        <div>
          {reviews.length
            ? reviews.map((review) => (
                <div className="review-box">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
                    alt=""
                  />
                  <div className="review-box-text">
                    <p>{review.review[0].description}</p>
                    <p>
                      <b>Rating Given: </b>
                      {review.review[0].rating}
                    </p>
                  </div>
                </div>
              ))
            : "No reviews"}
        </div>
      </div>
    </div>
  ) : (
    "You are not logged in"
  );
}
