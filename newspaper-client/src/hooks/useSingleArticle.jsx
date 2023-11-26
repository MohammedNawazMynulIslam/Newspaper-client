import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSingleArticle = ({ _id }) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["article", _id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article/${_id}`);
      return res.data;
    },
  });

  return { data, isLoading, isFetching, refetch };
};

export default useSingleArticle;
