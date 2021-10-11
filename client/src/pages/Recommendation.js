import react, {useState, useEffect} from "react";

import {getRecommendations} from "../spotify";
import {catchErrors} from "../utils";
import axios from "axios";

function valuetext(value) {
    return `${value}°C`;
}

const Recommendation = ({}) => {
    const [recommendations, setRecommendations] = useState();
    const [seedArtist, setSeedArtist] = useState('4NHQUGzhtTLFvgF5SZesLK');
    const [seedGenres, setSeedGenres] = useState('classical,country');
    const [seedTracks, setSeedTracks] = useState('4NHQUGzhtTLFvgF5SZesLK');
//   const [min_acousticness]
//   const [max_acousticness]
//   const [target_acousticness]
//   const [min_danceability]
//   const [max_danceability]
//   const [target_danceability]
//   const [min_duration_ms]
//   const [max_duration_ms]
//   const [target_duration_ms]
//   const [min_energy]
//   const [max_energy]
//   const [target_energy]
//   const [min_instrumentalness]
//   const [max_instrumentalness]
//   const [target_instrumentalness]


    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`recommendations`, {
                params: {
                    seed_artists: seedArtist,
                    seed_genres: seedGenres,
                    seed_tracks: seedTracks,
                },
            });
            setRecommendations(data.tracks);
            console.log(data);
        };

        catchErrors(fetchData());
    }, []);

    return (
        <>
            {recommendations && (
                <h1>
                    {recommendations.map((i) => {
                        return (
                            <>
                                {/*<p> {i.available_markets.map((f) => {*/}
                                {/*    return <>*/}
                                {/*        <p> {f} </p>*/}
                                {/*    </>*/}

                                {/*})}</p>*/}

                                <p>{i.duration_ms}</p>

                                <a href={i.href}> f</a>
                                {/*{i.album.map( (k) => {*/}
                                {/*   return  <p> {k.album_type}</p>*/}
                            </>
                        );
                    })}
                </h1>
            )}
        </>

    );
};

export default Recommendation;
