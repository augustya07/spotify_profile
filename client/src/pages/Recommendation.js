import react, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { getRecommendations } from "../spotify";
import { catchErrors } from "../utils";
import axios from "axios";

function valuetext(value) {
  return `${value}°C`;
}

const Recommendation = ({}) => {
  const [recommendations, setRecommendations] = useState();
  const [seedArtist, setSeedArtist] = useState();
  const [seedGenres, setSeedGenres] = useState();
  const [seedTracks, setSeedTracks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`recommendations`, {
        params: {
          seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
          seed_genres: "classical,country",
          seed_tracks: "0c6xIDDpzE81m2q797ordA",
        },
      });
      setRecommendations(data.tracks);
      console.log(data.tracks);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {recommendations && (
        <h1>
          {recommendations.map((i) => {
            return <p> {i.artists.map((i) =>
               <p> {i.name}</p>)} </p>;
          })}
        </h1>
      )}
    </>
  );
};

export default Recommendation;
