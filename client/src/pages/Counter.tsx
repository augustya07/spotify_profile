import react, { useState, useEffect } from "react";
import axios from "axios";

const Counter = () => {
  const [randomData, setRandomData] = useState("");
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchData = () => {
      return axios.get("https://randomuser.me/api").then(({ data }) => {
        console.log(data);
        return data;
      });
    };

    fetchData().then((dt) => {
      setRandomData(dt);
      setUserInfo(dt.results)
    });
  }, []);

  return (
    <>
      {randomData && (
        <>
          {/* <h1> {userInfo.map((i,k) => {
              <p>{i.name} </p>
          })}</h1> */}

<h1> Get</h1>
          {/* <h1> {userInfo.email}</h1> */}
        </>
      )}
    </>
  );
};

export default Counter;
