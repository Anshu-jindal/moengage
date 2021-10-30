import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({
  id,
  title,
  banner_img,
  description,
  season_yr,
  episodes_no,
  trailer_url,
  genres,
  rating,
}) {
  return (
    <a href={"/" + id}>
      <div className="card">
        <img className="banner_img" src={banner_img} alt="" />
        <h1>{title}</h1>
        <p>
          <b>Description: </b>
          {description ? description : "Not Available"}
        </p>
        <p>
          <b>Season: </b>
          {season_yr}
        </p>
        <p>
          <b>No. of Episodes: </b>
          {episodes_no}
        </p>
        <p>
          <b>Trailer: </b>
          <a className="trailer_url" href={trailer_url}>
            {trailer_url}
          </a>
        </p>
        <p className="genre-list">
          <b>Genres: </b>
          {genres.map((genre) => (
            <span className="genre">{genre}</span>
          ))}
        </p>
        <p>
          <b>Rating: </b>
          {rating / 20}
        </p>
      </div>
    </a>
  );
}
