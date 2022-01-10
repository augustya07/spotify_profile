import { useState, useEffect } from "react";
import { useGetUserTopArtistQuery } from "../service/spotifyApi";

const Artist = () => {
  const { data, isLoading } = useGetUserTopArtistQuery("");
  console.log(data);

  useEffect(() => {}, []);

  return (
    <>
      {data && data.items.map((t:any) => {
          return <div>{t.name}</div>;
        })}
    </>
  );
};

export default Artist;
