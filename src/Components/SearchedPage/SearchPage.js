import React, { useState, useEffect } from "react";
import SearchedData from "../SearchedData";
import "./SearchPage.css";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const [animeData, setAnimeData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);

  var url = window.location.href;
  let access_token =
    url.length < 30
      ? localStorage.getItem("access_token")
      : url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];

  localStorage.setItem("access_token", access_token);

  useEffect(() => {
    fetch("https://api.aniapi.com/v1/anime")
      .then((response) => response.json())
      .then((data) => {
        setAnimeData(data.data.documents);
        setSearchedData(data.data.documents);
      });
  }, []);

  const updateInput = async (input) => {
    const filtered = animeData.filter((anime) => {
      let genres;
      anime.genres.map((genre) => {
        genres += genre.toLowerCase() + " ";
      });

      return (
        anime.titles.en.toLowerCase().includes(input.toLowerCase()) ||
        genres.includes(input.toLowerCase()) ||
        anime.descriptions.en.includes(input.toLowerCase())
      );
    });
    setSearchedData(filtered);
  };

  return access_token ? (
    <div className="search-page-div">
      <div className="header">
        <h1>Anime World</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Search Anime"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            updateInput(e.target.value);
          }}
        />
      </div>
      <SearchedData data={searchedData} />
    </div>
  ) : (
    "You are not Logged In"
  );
}
