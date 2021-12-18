import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  let stor = JSON.parse(localStorage.getItem("reduxState"));

  if (stor !== null) {
    if (loggedIn !== stor.loggedIn && stor.loggedIn) {
      setloggedIn(stor.loggedIn);
    }
  }

  // let auth = userAuthenticated();
  // console.log(auth);

  if (loggedIn) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" exact element={<Login />} />
      </Routes>
    );
  }
}

export default App;
