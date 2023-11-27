import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ErrorAni from "../../assets/404.json";

const Error = () => {
  return (
    <div>
      <Helmet>
        <title>Newspaper | Error</title>
      </Helmet>

      <div>
        <Lottie className="h-[300px] my-24" animationData={ErrorAni} />
      </div>
      <div>
        <Link className="flex justify-center items-center" to="/">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
