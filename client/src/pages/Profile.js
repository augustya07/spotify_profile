import { useState, useEffect } from "react";
import { getCurrentUserProfile } from "../spotify";
import Loader from '../components/Loader'

const Login = ({}) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

        const {data} = await getCurrentUserProfile()
        setProfile(data)
        console.log(data.id)
        console.log(profile) 
    }

    fetchData()

  }, []);

  return (
    <>

    {profile && (
        <h1>{profile.display_name}</h1>

    )}
      
    </>
  );
};

export default Login;
