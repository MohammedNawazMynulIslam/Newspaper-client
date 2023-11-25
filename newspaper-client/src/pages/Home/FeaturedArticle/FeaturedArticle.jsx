import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { Pagination } from "@mui/material";

const FeaturedArticlesSection = () => {
  const allFeaturedArticles = [
    {
      title: "Exploring the Latest Technological Advancements",
      image: "https://i.ibb.co/48Bqw4X/haidan-v-Mow-4-Hf248-unsplash.jpg",
    },
    {
      title: "Discovering Hidden Gems in Art and Culture",
      image:
        "https://i.ibb.co/JvbpqfH/birmingham-museums-trust-p-WVJHDi-Aon-U-unsplash.jpg",
    },
    {
      title: "Exploring the Latest Technological Advancements",
      image: "https://i.ibb.co/48Bqw4X/haidan-v-Mow-4-Hf248-unsplash.jpg",
    },
    {
      title: "Discovering Hidden Gems in Art and Culture",
      image:
        "https://i.ibb.co/JvbpqfH/birmingham-museums-trust-p-WVJHDi-Aon-U-unsplash.jpg",
    },
    {
      title: "Exploring the Latest Technological Advancements",
      image: "https://i.ibb.co/48Bqw4X/haidan-v-Mow-4-Hf248-unsplash.jpg",
    },
    {
      title: "Discovering Hidden Gems in Art and Culture",
      image:
        "https://i.ibb.co/JvbpqfH/birmingham-museums-trust-p-WVJHDi-Aon-U-unsplash.jpg",
    },
    {
      title: "Exploring the Latest Technological Advancements",
      image: "https://i.ibb.co/48Bqw4X/haidan-v-Mow-4-Hf248-unsplash.jpg",
    },
    {
      title: "Discovering Hidden Gems in Art and Culture",
      image:
        "https://i.ibb.co/JvbpqfH/birmingham-museums-trust-p-WVJHDi-Aon-U-unsplash.jpg",
    },
    {
      title: "Exploring the Latest Technological Advancements",
      image: "https://i.ibb.co/48Bqw4X/haidan-v-Mow-4-Hf248-unsplash.jpg",
    },
    {
      title: "Discovering Hidden Gems in Art and Culture",
      image:
        "https://i.ibb.co/JvbpqfH/birmingham-museums-trust-p-WVJHDi-Aon-U-unsplash.jpg",
    },
    // Add more featured articles as needed
  ];

  const articlesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentFeaturedArticles = allFeaturedArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"} margin="50px">
        Featured Articles
      </Typography>
      <Grid container spacing={3}>
        {currentFeaturedArticles.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <img
                src={article.image}
                alt={article.title}
                style={{ width: "100%" }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {article.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(allFeaturedArticles.length / articlesPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default FeaturedArticlesSection;
