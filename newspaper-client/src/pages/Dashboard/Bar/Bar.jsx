import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Chart } from "react-google-charts";

const Bar = () => {
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);
  const {
    data: articles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allarticles"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/article", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error("Error fetching articles:", error);
        throw new Error("Failed to fetch articles");
      }
    },
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      // Calculate the count for each publication
      const publicationCounts = articles.reduce((counts, article) => {
        counts[article.publisher] = (counts[article.publisher] || 0) + 1;
        return counts;
      }, {});

      // Convert counts to array format for Google Charts
      const chartData = [
        ["Publisher", "Article Count"],
        ...Object.entries(publicationCounts),
      ];

      // Set the chart data
      setChartData(chartData);
    }
  }, [isLoading, isError, articles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="BarChart"
        loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          title: "Article Count by Publisher",
          hAxis: { title: "Publisher" },
          vAxis: { title: "Article Count" },
        }}
      />
    </div>
  );
};

export default Bar;
