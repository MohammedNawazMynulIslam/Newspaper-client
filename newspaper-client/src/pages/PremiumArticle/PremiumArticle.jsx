import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Tilt from "react-parallax-tilt";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const PremiumArticle = () => {
  const axiosSecure = useAxiosSecure();

  const { data: articles, isLoading } = useQuery({
    queryKey: ["premiumArticles"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/article", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        const premiumArticles = res.data.filter((article) => article.isPremium);

        return premiumArticles;
      } catch (error) {
        console.error("error", error);
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Newspaper || Premium Articles</title>
      </Helmet>
      <h1 className="text-center my-9 text-3xl font-medium">
        Premium Articles
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {articles.map((article) => (
          <Tilt key={article.id} tiltMaxAngleX={15} tiltMaxAngleY={15}>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                margin: "16px",
                overflow: "hidden",
                maxWidth: "300px",
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
              <div style={{ padding: "16px" }}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <p>Publisher: {article.publisher}</p>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  // to={`/article/${article.id}`}
                >
                  Details
                </Button>
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default PremiumArticle;
