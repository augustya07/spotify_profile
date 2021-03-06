import { useState, useEffect } from "react";
import { useGetUserTopSongsQuery } from "../service/spotifyApi";

const Tracks = () => {
  const { data, isLoading } = useGetUserTopSongsQuery("");
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

export default Tracks;
