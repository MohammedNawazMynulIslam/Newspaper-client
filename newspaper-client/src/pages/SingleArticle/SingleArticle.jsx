import { useParams } from "react-router-dom";
import useSingleArticle from "../../hooks/useSingleArticle";

const SingleArticle = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useSingleArticle({ _id: id });
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }
  console.log(data);
  console.log(data, isLoading, isFetching);
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
