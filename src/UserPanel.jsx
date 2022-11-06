import "./UserPanel.css";
import Sidebar from "./User/sidebar/Sidebar";
import TopBar from "./User/topbar/Topbar";
import UserList from "./User/UserList";
import { useParams } from "react-router-dom";

const UserPanel = () => {
  const params = useParams();

  return (
    <div>
      <TopBar />
      <div className="containerUser">
        <Sidebar />
        <UserList userid={params.userid} />
      </div>
    </div>
  );
};

export default UserPanel;
