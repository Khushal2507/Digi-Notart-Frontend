import React, { useContext, useEffect } from "react";

import AllComponents from "./AllComponents";
import Admin from "./User/UserList";
import "./App.css";

import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import UserPanel from "./UserPanel";
import UploadModular from "./User/uploadModular/UploadModular";
// import UserMain from "./userComponents/userMain/UserMain";
import loadBlockChainData from "./utils/loadBlockChainData";
import loadweb3 from "./utils/loadWeb3";
import AuthContext from "./store/auth-context";

const App = () => {
  // const ctx = useContext(AuthContext);
  const user = sessionStorage.getItem("userid");
  const ctx = useContext(AuthContext);

  const loadData = async () => {
    await loadweb3();
    const { dstorage, account } = await loadBlockChainData();
    ctx.account = account;
    ctx.upload = dstorage.methods.uploadFile;
    ctx.viewFiles = dstorage.methods.files;
    ctx.fileCount = dstorage.methods.fileCount;
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<AllComponents />}></Route>
        <Route path="/admin" element={<UserPanel />}></Route>
        <Route path="/admin/upload" element={<UploadModular />}></Route>
        <Route path="/admin/:userid" element={<UserPanel />}></Route>
      </Routes>
    </div>
  );
};

export default App;
