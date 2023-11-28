import { Helmet } from "react-helmet-async";
import FeaturedArticlesSection from "../FeaturedArticle/FeaturedArticle";
import Plans from "../Plans/Plans";
import Reviews from "../Reviews/Reviews";

import TrendingArticles from "../TrendingArticles/TrendingArticles";
import AllPublisers from "../AllPublisers/AllPublisers";
import Statistic from "../../Statistic/Statistic";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Newspaper || Home</title>
      </Helmet>

      <TrendingArticles />
      <AllPublisers />
      {/* Statistic */}
      <Statistic />

      <Plans />
      <FeaturedArticlesSection />
      <Reviews />
    </div>
  );
};

export default Home;
