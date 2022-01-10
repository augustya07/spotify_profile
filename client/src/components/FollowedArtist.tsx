import { useState, useEffect } from "react";
import { useGetUserFollowedArtistQuery } from "../service/spotifyApi";

const UserFollowedArtist = () => {
  const { data, isLoading } = useGetUserFollowedArtistQuery("");
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

export default UserFollowedArtist;
