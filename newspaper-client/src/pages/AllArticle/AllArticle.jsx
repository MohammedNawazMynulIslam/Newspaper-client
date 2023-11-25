import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllArticle = () => {
  const axiosSecure = useAxiosSecure();
  const { data: article } = useQuery({
    queryKey: ["article "],
    queryFn: async () => {
      const res = await axiosSecure.get("/article", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  return (
    <div>
      <h2>All articles</h2>
    </div>
  );
};

export default AllArticle;
