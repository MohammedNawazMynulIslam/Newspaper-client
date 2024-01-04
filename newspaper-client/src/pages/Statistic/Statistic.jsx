import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CountUp from "react-countup";
import { Typography } from "@mui/material";
const Statistic = () => {
  const axiosPublic = useAxiosPublic();
  const [userStats, setUserStats] = useState({
    allUsers: 0,
    normalUsers: 0,
    premiumUsers: 0,
  });
  useEffect(() => {
    const result = async () => {
      try {
        const response = await axiosPublic.get("/users");

        const allUsers = response.data.length;
        const normalUsers = response.data.filter(
          (user) => !user.premiumTaken
        ).length;
        const premiumUsers = response.data.filter(
          (user) => user.premiumTaken
        ).length;

        setUserStats({
          allUsers,
          normalUsers,
          premiumUsers,
        });
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      }
    };

    result();
  }, [axiosPublic]);
  return (
    <div className="text-center">
      <Typography
        variant="h4"
        gutterBottom
        textAlign={"center"}
        marginTop={"50px"}
        marginBottom={"50px"}
      >
        Statistic
      </Typography>
      <div className="grid justify-center justify-items-center items-center gap-1 grid-col-1 md:grid-cols-2 lg:grid-cols-3 ">
        {/* all users */}
        <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-44 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
          >
            <path
              transform="translate(100 100)"
              d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
            ></path>
          </svg>

          <div className="z-20 flex flex-col justify-center items-center">
            <span className="font-bold text-6xl ml-2">
              <CountUp end={userStats.allUsers} duration={2} />
            </span>
            <p className="font-bold">All Users </p>
          </div>
        </div>

        {/* normal user count */}
        <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-44 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
          >
            <path
              transform="translate(100 100)"
              d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
            ></path>
          </svg>

          <div className="z-20 flex flex-col justify-center items-center">
            <span className="font-bold text-6xl ml-2">
              <CountUp end={userStats.normalUsers} duration={2} />
            </span>
            <p className="font-bold">Normal Users </p>
          </div>
        </div>

        {/* premium user count */}
        <div className="hover:-translate-y-2 group bg-neutral-50 duration-500 w-44 h-44 flex text-neutral-600 flex-col justify-center items-center relative rounded-xl overflow-hidden shadow-md">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute blur z-10 fill-red-300 duration-500 group-hover:blur-none group-hover:scale-105"
          >
            <path
              transform="translate(100 100)"
              d="M39.5,-49.6C54.8,-43.2,73.2,-36.5,78.2,-24.6C83.2,-12.7,74.8,4.4,69,22.5C63.3,40.6,60.2,59.6,49.1,64.8C38.1,70,19,61.5,0.6,60.7C-17.9,59.9,-35.9,67,-47.2,61.9C-58.6,56.7,-63.4,39.5,-70,22.1C-76.6,4.7,-84.9,-12.8,-81.9,-28.1C-79,-43.3,-64.6,-56.3,-49.1,-62.5C-33.6,-68.8,-16.8,-68.3,-2.3,-65.1C12.1,-61.9,24.2,-55.9,39.5,-49.6Z"
            ></path>
          </svg>

          <div className="z-20 flex flex-col justify-center items-center">
            <span className="font-bold text-6xl ml-2">
              <CountUp end={userStats.premiumUsers} duration={2} />
            </span>
            <p className="font-bold">Premium Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
