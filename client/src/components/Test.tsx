import React from "react";
import { useArtistQuery } from "../service/spotifyApi";

const Test = () => {
  const { data, isLoading } = useArtistQuery("");
  console.log(data);
  return (
    <div>
      {/* {data && data.items.map((t: any) => {
          return (<div>
              {t.genres[0]}
              {t.name}
              </div>)
        })} */}
    </div>
  );
};

export default Test;
