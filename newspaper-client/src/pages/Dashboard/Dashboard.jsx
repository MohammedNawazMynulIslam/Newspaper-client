import { NavLink, Outlet } from "react-router-dom";

import { FaUsers } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import PieChart from "./PieChart/PieChart";
import LineGraph from "../LineGraph/LineGraph";
import Bar from "./Bar/Bar";

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <div
          className="w-64 min-h-full"
          style={{
            background: "#007b",
            color: "#fff",
          }}
        >
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard/adminHome">
                <RiAdminFill />
                Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/allUsers">
                <FaUsers></FaUsers>
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/allArticles">
                <MdArticle />
                All Articles
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/allPublishers">
                <FaPenAlt />
                Add Publishers
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
          {/* <PieChart />
        <LineGraph />
        <Bar /> */}
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
