import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { useGetSpotifyUserQuery } from "../service/spotifyApi";

const Nav = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetSpotifyUserQuery("");
  const [user, setUser] = useState(null);
  const [navActive, setNavActive] = useState();

  console.log(data);

  // const handleClick = e => {
  //     console.log('click ', e);
  //     // this.setState({current: e.key});
  //     setNavActive(e.key)
  // };
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {data && <div>{data.display_name}</div>}
      Nav
    </>
  );
};

export default Nav;
