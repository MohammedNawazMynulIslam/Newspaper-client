import { createBrowserRouter } from "react-router-dom";
import LayOut from "../LayOut/LayOut";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddArticle from "../pages/AddArticle/AddArticle";
import PrivateRoutes from "../private/PrivateRoute";
import AllArticle from "../pages/AllArticle/AllArticle";
import SingleArticle from "../pages/SingleArticle/SingleArticle";
import Subscription from "../pages/Subscription/Subscription";
import Payment from "../pages/Payment/Payment";
import Profile from "../pages/Profile/Profile";
import MyArticles from "../pages/MyArticle/MyArticles";

import PremiumArticle from "../pages/PremiumArticle/PremiumArticle";
import Dashboard from "../pages/Dashboard/Dashboard";
import AllArticles from "../pages/Dashboard/AllArticles/AllArticles";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllPublishers from "../pages/Dashboard/AllPublishers/AllPublishers";

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
      {
        path: "/subscription",
        element: (
          <PrivateRoutes>
            <Subscription />{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoutes>
            <Payment />
          </PrivateRoutes>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-articles",
        element: (
          <PrivateRoutes>
            <MyArticles />
          </PrivateRoutes>
        ),
      },
      {
        path: "/premium-articles",
        element: (
          <PrivateRoutes>
            <PremiumArticle />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "allArticles",
        element: <AllArticles />,
      },
      {
        path: "allPublishers",
        element: <AllPublishers />,
      },
    ],
  },
]);

export default router;
