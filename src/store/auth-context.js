import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import loadBlockChainData from "../utils/loadBlockChainData";
import loadWeb3 from "../utils/loadWeb3";

const AuthContext = React.createContext({
  isOverlay: false,
  onOverlay: () => {},
  noOverlay: () => {},
  userLogged: "",
  setUserLogged: () => {},
  socket: null,
  account: null,
  upload: () => {},
  viewFiles: () => {},
  fileCount: () => {},
});

const SOCKET_URL = "http://localhost:3001";
const socket = io(SOCKET_URL);
//app context
export const AppContext = React.createContext();

export const AuthContextProvider = (props) => {
  const [isOverlay, setIsOverlay] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState("");

  const overlayFunc = () => {
    console.log(true);
    setIsOverlay(true);
  };

  const noOverlay = () => {
    setIsOverlay(false);
  };

  const setUser = (user) => {
    setUserLoggedIn(user);
  };

  const data = {
    isOverlay: isOverlay,
    onOverlay: overlayFunc,
    noOverlay: noOverlay,
    userLogged: userLoggedIn,
    setUserLogged: setUser,
    socket: socket,
    account: null,
    upload: () => {},
    viewFiles: () => {},
    fileCount: () => {},
  };
  // const loadData = async () => {
  //   await loadWeb3();
  //   const { dstorage, account } = await loadBlockChainData();
  //   data.upload = dstorage.methods.uploadFile;
  //   data.viewFiles = dstorage.methods.files;
  //   data.fileCount = dstorage.methods.fileCount;
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
};

export default AuthContext;
