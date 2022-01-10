import { useState, useEffect } from "react";
import { useSearchQuery } from "../service/spotifyApi";

const Search = () => {
  const [searchInput, setSearchInput] = useState<string>("nothing but thieves");

  const { data, isLoading } = useSearchQuery(searchInput);

  console.log(data);

  useEffect(() => {}, []);

  // const MapArray = (Arr: []) => {
  //   if(Arr.length > 0) {
  //   return Arr.map((t: any) => {

  //   });
  // };

  return (
    <>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <h1>Tracks</h1>
      {data &&
        data.tracks.items.map((t: any) => {
          return (
            <>
              {t.album && t.album.images.length ? (
                <img src={t.album.images[2].url} alt={t.name} />
              ) : null}
              <div>{t.name}</div>
            </>
          );
        })}

      <h1>Artists</h1>
      {data &&
        data.artists.items.map((t: any) => {
          console.log(t);
          return (
            <>
              {t.images && t.images.length ? (
                <img src={t.images[1].url} alt={t.name} />
              ) : null}
              <div>{t.name}</div>
              {t.genres && t.genres.length ? (
                <>
                  {t.genres.map((j:any) => <div>{j}</div>)}
                </>
              ) : null}
            </>
          );
        })}

      <h1>Albums</h1>
      {data &&
        data.albums.items.map((t: any) => {
          return (
            <>
              {t.images && t.images.length ? (
                <img src={t.images[1].url} alt={t.name} />
              ) : null}
              <div>{t.name}</div>
            </>
          );
        })}
      {/*
      <h1>Playlist</h1>
      {data.playlists &&
        data.playlists.items.map((t: any) => {
          return (
            <>
              {t.images && t.images.length ? (
                <img src={t.images[0].url} alt={t.name} />
              ) : null}
              <div>{t.name}</div>
            </>
          );
        })} */}
    </>
  );
};

export default Search;
