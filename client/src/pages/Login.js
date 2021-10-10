import react from "react";
import Box from "@mui/material/Box";

function valuetext(value) {
  return `${value}°C`;
}

const Login = ({ }) => {
  return (
    <Box sx={{ width: 300 }}>

        <a href="http://localhost:8888/login"> Login </a>

    </Box>
  );
};

export default Login;
