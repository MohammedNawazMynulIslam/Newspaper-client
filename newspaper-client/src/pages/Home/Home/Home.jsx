import FeaturedArticlesSection from "../FeaturedArticle/FeaturedArticle";
import Plans from "../Plans/Plans";
import Reviews from "../Reviews/Reviews";

import TrendingArticles from "../TrendingArticles/TrendingArticles";

const Home = () => {
  return (
    <div>
      <h2>this is home</h2>
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
