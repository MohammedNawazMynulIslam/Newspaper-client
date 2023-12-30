import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Chart from "react-google-charts";
import { useEffect, useState } from "react";
const PieChart = () => {
  const axiosSecure = useAxiosSecure();
  const [pieChartData, setPieChartData] = useState([]);

  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/article");
      //   return res.data.publisher;
      return res.data;
    },
  });
  useEffect(() => {
    if (articles.length > 0) {
      const publishers = {};

      // Count the number of articles for each publisher
      articles.forEach((article) => {
        const publisherName = article.publisher;
        publishers[publisherName] = (publishers[publisherName] || 0) + 1;
      });

      // Calculate the percentage for each publisher
      const pieData = Object.entries(publishers).map(([publisher, count]) => {
        const percentage = (count / articles.length) * 100;
        return [publisher, percentage];
      });

      setPieChartData([["Publisher", "Percentage"], ...pieData]);
    }
  }, [articles]);
  return (
    <div>
      {/* <h2>Publication Article Distribution</h2> */}
      {pieChartData.length > 0 ? (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieChartData}
          options={{
            title: "Publication Article Distribution",
            is3D: true,
          }}
          rootProps={{ "data-testid": "1" }}
        />
      ) : (
        <div>No data available for the pie chart</div>
      )}
    </div>
  );
};

export default PieChart;
