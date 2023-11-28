import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AllArticle = () => {
  const axiosSecure = useAxiosSecure();
  //   chtggcd
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const {
    data: articles = [],
    refetch,
    hasNextPage,
  } = useQuery({
    queryKey: ["article", page, searchQuery, selectedPublisher, selectedTags],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const res = await axiosSecure.get("/article/approve", {
          params: {
            page: pageParam,
            search: searchQuery,
            publisher: selectedPublisher,
            tags: selectedTags.join(","),
            isApproved: true,
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error("error", error);
      }
    },
  });
  console.log(articles);

  return (
    <div>
      <Helmet>
        <title>Newspaper || All Article</title>
      </Helmet>
      <h2 className="text-center my-10 text-4xl">All Articles</h2>
      {/* filter and search func */}
      <div className="my-4">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Search Articles:
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      <div className="my-4">
        <label
          htmlFor="publisher"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Publisher:
        </label>
        <input
          type="text"
          id="publisher"
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      <div className="my-4">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Tags (comma-separated):
        </label>
        <input
          type="text"
          id="tags"
          value={selectedTags.join(",")}
          onChange={(e) => setSelectedTags(e.target.value.split(","))}
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      <button
        onClick={() => {
          // setPage(1);
          refetch({ pageParam: 1 });
        }}
        className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Apply Filters
      </button>
      <InfiniteScroll
        dataLength={articles?.length || 0}
        next={() => setPage(page + 1)}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="grid grid-cols-3">
            {articles.map((article) => (
              <div
                key={article._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img className="rounded-t-lg" src={article.image} alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {article.title}
                    </h5>
                  </a>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {article.publisher}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {article.tags}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {article.description}
                  </p>
                  <Link
                    to={`/article/${article._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Details
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default AllArticle;
