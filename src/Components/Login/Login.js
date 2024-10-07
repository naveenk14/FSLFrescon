// import React, { useState, useEffect } from "react";
// import { Navigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { LoginRequest } from "../../Redux/Actions/LoginAction";
// import {CircularProgress,Box} from "@mui/material"

// const Login = () => {
//   const { id, token } = useParams(); // Get id and token from URL params
//   const dispatch = useDispatch();
//   const [authenticated, setAuthenticated] = useState(false);
//   const [tokenReceived, setTokenReceived] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const LoginData = useSelector((state) => state.Login);
//   const jwtToken = LoginData?.booking?.Token;
//   const [requestSent, setRequestSent] = useState(false);

//   useEffect(() => {
//     const sUsername = id; // Assuming id is the username
//     const spassword = token; // Assuming token is the password
//     if (sUsername && spassword  && !requestSent) {
//       dispatch(LoginRequest({ sUsername, spassword }));
//       setRequestSent(true);
//     }
//   }, [id, token, dispatch, requestSent])
  

//   useEffect(() => {
//     if (jwtToken) {
//       localStorage.setItem("token", jwtToken);
//       setLoading(false);
//     } else {
//       const timeout = setTimeout(() => {
//         setLoading(false);
//       }, 5000);
//       return () => clearTimeout(timeout);
//     }
//   }, [jwtToken, requestSent]);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "200px",
//         }}
//       >
//         <CircularProgress style={{ color: "red" }} />
//       </Box>
//     );
//   }

//   if (!jwtToken) {
//     return <p>Login failed. Please try again.</p>;
//   }

//   return <Navigate to="/dashboard" />;
// };

// export default Login;
