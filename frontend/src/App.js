import "./App.css";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Messenger from "./components/chat/Messengers";
import NavbarSimple from "./components/common/NavBar-simple";
import userill from "./static/userill.jpg";
import { Avatar } from "@mui/material";
import LoginWarning from "./components/common/LoginWarning";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/signin/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const NotFound = ({ msg }) => {
  return (
    <>
      <div className="fullscreen centerAll">
        <Avatar src={userill} sx={{ width: "200px", height: "200px" }}></Avatar>
        <p>{msg ? msg : "Page Not Found"}</p>
        <Link to={"/"}>
          <button>Go to Home</button>
        </Link>
      </div>
    </>
  );
};

function App() {
  const PrimaryColor = "#004E64";
  // const PrimaryColor = "#8a2be2";
  const theme = createTheme({
    palette: {
      primary: {
        main: PrimaryColor,
      },
    },
  });
  const Navigate = useNavigate();
  const user = useSelector(state=>state.user.user);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavbarSimple></NavbarSimple>
          <Routes>
            <Route path="/" index element={<Messenger></Messenger>}></Route>
            <Route path="/chat" element={<Messenger></Messenger>}></Route>
            <Route
              path="/pleaselogin"
              element={<LoginWarning></LoginWarning>}
            ></Route>
            <Route
              path="/login"
              element={
                <GoogleOAuthProvider clientId="713976535576-c7c6grdnm12gjr9imqm388bp8utginil.apps.googleusercontent.com">
                  <Login></Login>
                </GoogleOAuthProvider>
              }
            ></Route>
            <Route path="/:error" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}
export default App;
export { NotFound };
