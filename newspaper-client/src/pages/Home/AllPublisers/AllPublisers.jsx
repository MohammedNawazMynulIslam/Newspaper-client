import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
const AllPublishers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: publishers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allpublishers"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/publishers", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error("Error fetching publishers:", error);
        throw new Error("Failed to fetch publishers");
      }
    },
  });
  // console.log(publishers);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <h2 className="text-center my-10 text-3xl font-medium">All Publishers</h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {publishers.map((publisher) => (
          <motion.div
            key={publisher.id}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="h-[300px]">
              <img
                className="rounded-t-lg h-[250px] w-[350px]"
                src={publisher.image}
                alt={publisher.name}
              />
            </div>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {publisher.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AllPublishers;
