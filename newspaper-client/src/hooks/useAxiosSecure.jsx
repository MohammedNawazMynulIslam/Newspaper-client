import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      if (token) {
        console.log(token);
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  React.useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error.response.status;
        console.log("status error in the interceptor", status);
        if (status === 401 || status === 403) {
          logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component unmounts
    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
