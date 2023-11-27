import { NavLink, Outlet } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-64 min-h-full bg-blue-500">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/allUsers">
              <FaUsers></FaUsers>
              ALL Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allArticles">
              <MdArticle />
              ALL Articles
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/allPublishers">
              <FaPenAlt />
              ALL Publishers
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
