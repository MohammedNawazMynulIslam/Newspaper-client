import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
      "https://i.ibb.co/j8RGP4q/cristian-palmer-Xexawgz-YOBc-unsplash.jpg",
  },
  {
    title: "Artificial Intelligence in Everyday Life",
    content:
      "From virtual assistants to smart homes, explore how artificial intelligence is shaping our daily lives and what the future holds.",
    imgUrl:
      "https://i.ibb.co/dKbMbbT/possessed-photography-U3s-Ow-Vi-Xhk-Y-unsplash.jpg",
  },
  {
    title: "Quick and Healthy Recipes for Busy Lifestyles",
    content:
      "Discover simple and nutritious recipes that fit seamlessly into your busy schedule, promoting a healthier and balanced lifestyle.",
    imgUrl: "https://i.ibb.co/nB2pcDC/brenda-godinez-Zn-7-Fzo-L1w-unsplash.jpg",
  },
  {
    title: "Capturing Moments: A Guide to Photography",
    content:
      "Unleash your creativity and learn essential tips for capturing stunning photographs, whether you're a beginner or an experienced photographer.",
    imgUrl:
      "https://i.ibb.co/hBGnCWX/eunice-de-guzman-4oo7uqq3exg-unsplash-1.jpg",
  },
  {
    title: "Savoring Culinary Delights Around the World",
    content:
      "Embark on a culinary journey and explore diverse cuisines from different corners of the world, uncovering unique flavors and traditions.",
    imgUrl: "https://i.ibb.co/WpvjT2R/neom-wb-OKjg-Qv3n-Y-unsplash.jpg",
  },
];

const TrendingArticles = () => {
  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: 20,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Trending Articles
      </Typography>
      <Carousel showThumbs={false} showStatus={false}>
        {trendingArticlesData.map((article, index) => (
          <Card key={index} style={{ marginBottom: 10 }}>
            <CardContent>
              <img
                src={article.imgUrl}
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
