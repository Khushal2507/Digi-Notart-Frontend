import "./sidebar.css";
// import {
//   Timeline,
//   PermIdentity,
//   WorkOutline,
//   Report,
// } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import UploadModular from "../uploadModular/UploadModular.js";
import img from "./meet.png";

export default function Sidebar() {
  const [userData, setUserData] = useState([]);
  const [click, setClick] = useState(false);

  const fetchUser = async () => {
    const res = await axios
      .get("http://localhost:3001/user/getAllUserSideBar")
      .catch((err) => {
        console.log(err);
      });

    setUserData(res.data);
  };

  const uploadHandler = () => {
    setClick((current) => !current);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Users</h3>
          <ul className="sidebarList">
            {userData.map((user) => (
              <Link to={`/admin/${user._id}`} className="link" key={user._id}>
                <li className="sidebarListItem" key={user._id}>
                  {user.username}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Admin</h3>
          <ul className="sidebarList">
            <Link to="/admin/upload" className="link">
              <li className="sidebarListItem" onClick={uploadHandler}>
                {/* <WorkOutline className="sidebarIcon" /> */}
                Upload
              </li>
            </Link>
          </ul>
        </div>

        <footer>
          <a href="https://meet.google.com/landing?authuser=1" target="_blank">
            <img src={img}></img>
          </a>
        </footer>

        {click && <UploadModular />}
      </div>
    </div>
  );
}
