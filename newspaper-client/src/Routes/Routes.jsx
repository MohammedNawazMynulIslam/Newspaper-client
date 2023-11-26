import { createBrowserRouter } from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddArticle from "../pages/AddArticle/AddArticle";
import PrivateRoutes from "../private/PrivateRoute";
import AllArticle from "../pages/AllArticle/AllArticle";
import SingleArticle from "../pages/SingleArticle/SingleArticle";

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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-articles",
        element: (
          <PrivateRoutes>
            <AddArticle />
          </PrivateRoutes>
        ),
      },
      {
        path: "/all-articles",
        element: <AllArticle />,
      },
      {
        path: "/article/:id",
        element: (
          <PrivateRoutes>
            {" "}
            <SingleArticle />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
