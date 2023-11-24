import { Outlet } from "react-router-dom";
import StickyFooter from "../pages/Shared/Footer/Footer";

const LayOut = () => {
  return (
    <div>
      <Outlet />
      <StickyFooter></StickyFooter>
    </div>
  );
};

export default LayOut;
