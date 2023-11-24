import { createBrowserRouter } from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
