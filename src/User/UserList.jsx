import "./UserList.css";
import DataGrid from "react-data-grid";
import Table from "react-bootstrap/Table";
import { userRows } from "../dummyData";
// import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const UserList = (props) => {
  const [files, setFiles] = useState([]);
  const [upload, setUpload] = useState(false);
  let render = "";

  const fetchUserfile = async () => {
    if (props.userid == "upload") {
      setUpload(true);
    } else if (props.userid) {
      const res = await axios
        .get("http://localhost:3001/user/" + props.userid)

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
    fetchUserfile();
  }, [props.userid]);

  let documentOutput = (
    <div className="noDocuments content-row">
      <h2>No Documents Uploaded</h2>
    </div>
  );

  if (files.length > 0) {
    documentOutput = files.map((file, i) => (
      <div className="content-row" key={file._id}>
        <h3 className="first">{++i}</h3>
        <h3 className="second">{file.name}</h3>
        <a
          href={file.fileData}
          className="third"
          style={{ color: "blue" }}
          target="_blank"
        >
          Click Here to Access
        </a>
        {/* <h3>Hello</h3> */}
      </div>
    ));
  }

  return (
    <div className="userList">
      <div className="content-row">
        <h3 className="first">ID</h3>
        <h3 className="second">Document Name</h3>
        <h3 className="third">Link</h3>
      </div>

      {documentOutput}
    </div>
  );
};

export default UserList;
