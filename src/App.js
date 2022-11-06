import React, { useContext } from "react";

import AllComponents from "./AllComponents";
import Admin from "./User/UserList";
import "./App.css";

import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import UserPanel from "./UserPanel";
// import UserMain from "./userComponents/userMain/UserMain";

const App = () => {
  // const ctx = useContext(AuthContext);
  const user = sessionStorage.getItem("userid");
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<AllComponents />}></Route>
        <Route path="/admin" element={<UserPanel />}></Route>
        <Route path="/admin/:userid" element={<UserPanel />}></Route>
      </Routes>
    </div>
  );
};

export default App;
