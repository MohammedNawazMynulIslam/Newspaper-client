import Plans from "../Plans/Plans";
import TrendingArticles from "../TrendingArticles/TrendingArticles";

const Home = () => {
  return (
    <div>
      <h2>this is home</h2>
      <TrendingArticles />
      {/* All Publisher */}
      {/* Statistic */}
      <Plans />
    </div>
  );
};

export default Home;
