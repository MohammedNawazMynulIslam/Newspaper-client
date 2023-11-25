import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const trendingArticlesData = [
  {
    title: "The Rise of Renewable Energy",
    content:
      "Discover the latest advancements in renewable energy technologies and their impact on a sustainable future.",
    imgUrl:
      "https://i.ibb.co/yYm2mTn/sander-weeteling-i-GDg-f-ml-Wo-unsplash.jpg",
  },
  {
    title: "Exploring the Wonders of Underwater Life",
    content:
      "Dive deep into the mesmerizing world beneath the ocean's surface and encounter the extraordinary creatures that inhabit it.",
    imgUrl:
      "https://i.ibb.co/yYm2mTn/sander-weeteling-i-GDg-f-ml-Wo-unsplash.jpg",
  },
  {
    title: "Artificial Intelligence in Everyday Life",
    content:
      "From virtual assistants to smart homes, explore how artificial intelligence is shaping our daily lives and what the future holds.",
    imgUrl: "https://placekitten.com/402/200",
  },
  {
    title: "Quick and Healthy Recipes for Busy Lifestyles",
    content:
      "Discover simple and nutritious recipes that fit seamlessly into your busy schedule, promoting a healthier and balanced lifestyle.",
    imgUrl: "https://placekitten.com/403/200",
  },
  {
    title: "Capturing Moments: A Guide to Photography",
    content:
      "Unleash your creativity and learn essential tips for capturing stunning photographs, whether you're a beginner or an experienced photographer.",
    imgUrl: "https://placekitten.com/404/200",
  },
  {
    title: "Savoring Culinary Delights Around the World",
    content:
      "Embark on a culinary journey and explore diverse cuisines from different corners of the world, uncovering unique flavors and traditions.",
    imgUrl: "https://placekitten.com/405/200",
  },
];

const TrendingArticles = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Trending Articles
      </Typography>
      <Slider {...sliderSettings}>
        {trendingArticlesData.map((article, index) => (
          <Card key={index} style={{ marginBottom: 10 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {article.title}
              </Typography>
              <Typography color="text.secondary">{article.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Container>
  );
};

export default TrendingArticles;
