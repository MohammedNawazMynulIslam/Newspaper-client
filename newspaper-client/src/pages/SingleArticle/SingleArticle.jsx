import { useParams } from "react-router-dom";
import useSingleArticle from "../../hooks/useSingleArticle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect } from "react";

const SingleArticle = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleArticle({ _id: id });
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const ViewCount = async () => {
      try {
        const res = await axiosSecure.put(`/article/${id}/view`);
        if (res && res.data) {
          console.log("View Count Updated");
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("error updating view count", error);
      }
    };
    ViewCount();
  }, [axiosSecure, id]);
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-center my-10 text-4xl">Single Article</h2>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={data.image} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data.title}
            </h5>
          </a>
          <h4 className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.publisher}
          </h4>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
