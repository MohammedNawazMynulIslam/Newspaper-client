import { Outlet } from "react-router-dom";
import StickyFooter from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const LayOut = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default LayOut;
