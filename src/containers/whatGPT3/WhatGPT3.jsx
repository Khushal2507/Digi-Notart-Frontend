import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Feature from "../../components/feature/Feature";
import "./whatGPT3.css";
import uploadImage from "./fileuploadbg.png";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const WhatGPT3 = (props) => {
  const userid = sessionStorage.getItem("userid");
  const [files, setFiles] = useState([]);
  const ctx = useContext(AuthContext);
  const [filesCount, setFilesCount] = useState(0);
  const [blockchainfiles, setblockchainFiles] = useState([]);
  const fetchFiles = async () => {
    if (userid != null) {
      const res = await axios
        .get("http://localhost:3001/api/getFiles/" + userid)
        .catch((err) => {
          console.log(err);
        });

      setFiles(res.data);
    }
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  useEffect(() => {
    fetchFiles();
    filesBlockChain();
  }, []);

  const filesBlockChain = async () => {
    const filesCount = await ctx.fileCount.call();
    console.log(filesCount);
    // this.setState({ filesCount });
    setFilesCount(filesCount);
    //Load files&sort by the newest
    for (var i = filesCount; i >= 1; i--) {
      const file = await ctx.viewFiles(i).call();
      setblockchainFiles((prevState) => {
        const newState = prevState.concat(file);
        return newState;
      });
    }
    console.log(blockchainfiles);
  };

  const deleteHandler = async (fileid) => {
    console.log(fileid);
    const answer = window.confirm("Delete File?");
    if (answer) {
      await axios
        .delete(`http://localhost:3001/api/deleteFiles/${fileid}/${userid}`)
        .then((res) => {
          fetchFiles();
          alert("Successfully Deleted");
        })
        .catch((err) => {
          alert("Error Occured while Deleting");
        });
    } else {
      alert("File not Deleted");
    }
  };

  return (
    <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
      <div className="gpt3__whatgpt3-feature">
        <Feature title="Your Documents" text="" />
      </div>
      <div className="gpt3__whatgpt3-heading">
        <h1 className="gradient__text">Your Uploaded Documents</h1>
        <p style={{ color: "white" }}>
          Access your Own Uploaded Documents which are yet to be Verified
        </p>
      </div>
      <div className="gpt3__whatgpt3-container">
        {files.map((file) => (
          <div className="flex_container">
            <a href={file.fileData} target="_blank" key={file._id}>
              <div className="cardFile">
                <img src={uploadImage}></img>
                <h3>{file.name}</h3>
              </div>
            </a>
            <button onClick={() => deleteHandler(file._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatGPT3;
