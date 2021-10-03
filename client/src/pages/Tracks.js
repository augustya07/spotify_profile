import { useState, useEffect } from "react";
import { getAudioFeaturesForTracks } from "../spotify";

const Tracks = () => {
  const [audioFeature, setAudioFeature] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAudioFeaturesForTracks(
        "06AKEBrKUckW0KREUWRnvT"
      );

      setAudioFeature(data.audio_features);
      console.log(audioFeature);
    };
    fetchData();
  }, []);

  return (
    <>
      {audioFeature && (
        <h1>
          {audioFeature.map((i) => {
            return (
              <>
                <p> {i.loudness}</p>
                <p>{i.valence}</p>
              </>
            );
          })}
        </h1>
      )}
    </>
  );
};

export default Tracks;
