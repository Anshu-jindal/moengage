import React from "react";
import Card from "./Card/Card";

export default function SearchedData({ data }) {
  return (
    <div className="searchedData">
      {data.map((anime) => (
        <Card
          key={anime.id}
          id={anime.anilist_id}
          title={anime.titles.en}
          banner_img={anime.banner_image}
          description={anime.descriptions.en}
          season_yr={anime.season_year}
          episodes_no={anime.episodes_count}
          trailer_url={anime.trailer_url}
          genres={anime.genres}
          rating={anime.score}
        />
      ))}
    </div>
  );
}
