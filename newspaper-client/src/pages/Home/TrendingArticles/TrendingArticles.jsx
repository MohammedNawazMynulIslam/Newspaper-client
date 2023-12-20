import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const TrendingArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trending = [] } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/article", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        return res.data;
      } catch (error) {
        console.error("Error fetching trending articles", error);
        throw error;
      }
    },
  });

  return (
    <Container
      maxWidth="xl"
      style={{
        marginTop: 20,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Trending Articles
      </Typography>
      <Carousel showThumbs={false} showStatus={false} style={{ width: "100%" }}>
        {trending?.map((article, index) => (
          <Card key={index} style={{ marginBottom: 10 }}>
            <CardContent>
              <img
                className="w-full h-[500px]"
                src={article.image}
                alt={article.title}
                style={{ width: "100%" }}
              />
              <Typography variant="h6" component="div">
                {article.title}
              </Typography>
              <Typography color="text.secondary">{article.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Container>
  );
};

export default TrendingArticles;
