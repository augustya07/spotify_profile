import { useState, useEffect } from "react";

const Login = ({}) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {};

    fetchData();
  }, []);

  return <>{profile && <h1> Profile</h1>}</>;
};

export default Login;


