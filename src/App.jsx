import SignIn from "./SignIn/SignIn";
import LogIn from "./Login/Login";
import HomePage from "./HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ColumnContainer, RowContainer } from "./Common/Common.style";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function App() {
  const navigate = useNavigate();
  console.log("app staring");
  const [userCountryCode, setUserCountryCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLogged, setUserLogged] = useState(false);

  console.log("Auth", auth);

  useEffect(() => {
    console.log("Auth", auth);

    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("User is signed in ");
        setUserLogged(true);
        navigate("/homePage");
      } else {
        // User is not signed in.
        console.log("User is NOT signed in");
        setUserLogged(false);
        navigate("./signin");
      }
      setLoading(false);
    });

    return () => {
      auth.signOut()
    }
  }, []);

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setUserCountryCode(data.country_code);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGeoInfo();
    console.log("user country", userCountryCode);
  }, []);

  if (loading) {
    // Return a loading indicator or component until loading is complete
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {!userLogged && (
        <RowContainer style={{ float: "right" }}>
          <Link to="/login">Log In</Link>
          <Link to="/signin">Sign In</Link>
        </RowContainer>
      )}
      {userLogged && <button onClick={() => auth.signOut()}>Log Out</button>}

      <ColumnContainer>
        <Routes>
          <Route
            path="/signin"
            element={<SignIn userCountryCode={userCountryCode} />}
          />
          <Route
            path="/"
            element={<SignIn userCountryCode={userCountryCode} />}
          />
          <Route
            path="/login"
            element={<LogIn userCountryCode={userCountryCode} auth={auth} />}
          />
          <Route path="/homePage" element={<HomePage />} />
        </Routes>
      </ColumnContainer>
    </div>
  );
}

export default App;
