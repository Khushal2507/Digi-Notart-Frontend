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

export default function Sidebar() {
  const [userData, setUserData] = useState([]);

  const fetchUser = async () => {
    const res = await axios
      .get("http://localhost:3001/user/getAllUserSideBar")
      .catch((err) => {
        console.log(err);
      });

    setUserData(res.data);
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
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              {/* <WorkOutline className="sidebarIcon" /> */}
              Manage
            </li>
            <li className="sidebarListItem">
              {/* <Timeline className="sidebarIcon" /> */}
              Analytics
            </li>
            <li className="sidebarListItem">
              {/* <Report className="sidebarIcon" /> */}
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
