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
        const response = await axiosPublic.get("/users"); // Adjust the endpoint accordingly

        const allUsers = response.data.length;
        const normalUsers = response.data.filter(
          (user) => !user.isPremium
        ).length;
        const premiumUsers = response.data.filter(
          (user) => user.isPremium
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
      <div>
        <p>All Users: </p>
        <CountUp end={userStats.allUsers} duration={2} />
      </div>
      <div>
        <p>Normal Users: </p>
        <CountUp end={userStats.normalUsers} duration={2} />
      </div>
      <div>
        <p>Premium Users: </p>
        <CountUp end={userStats.premiumUsers} duration={2} />
      </div>
    </div>
  );
};

export default Statistic;
