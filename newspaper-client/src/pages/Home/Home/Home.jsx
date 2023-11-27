import { Helmet } from "react-helmet-async";
import FeaturedArticlesSection from "../FeaturedArticle/FeaturedArticle";
import Plans from "../Plans/Plans";
import Reviews from "../Reviews/Reviews";

import TrendingArticles from "../TrendingArticles/TrendingArticles";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Newspaper || Home</title>
      </Helmet>

      <TrendingArticles />
      {/* All Publisher */}
      {/* Statistic */}
      <Plans />
      <FeaturedArticlesSection />
      <Reviews />
    </div>
  );
};

export default Home;
