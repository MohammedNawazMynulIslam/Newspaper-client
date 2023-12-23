import { Helmet } from "react-helmet-async";
import { Typewriter } from "react-simple-typewriter";
import FeaturedArticlesSection from "../FeaturedArticle/FeaturedArticle";
import Plans from "../Plans/Plans";
import Reviews from "../Reviews/Reviews";
import TrendingArticles from "../TrendingArticles/TrendingArticles";
import AllPublisers from "../AllPublisers/AllPublisers";
import Statistic from "../../Statistic/Statistic";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Fade,
  Modal,
  Typography,
  Card,
  CardContent,
  Backdrop,
} from "@mui/material";
import Banner from "../Banner/Banner";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleSubscription = () => {
    navigate("/subscription");
  };
  return (
    <div>
      <Helmet>
        <title>Newspaper || Home</title>
      </Helmet>
      <div className="text-center my-11 text-3xl font-medium">
        <Typewriter
          words={[
            "Welcome to the Newspaper!",
            "Stay Informed!",
            "Discover Exciting Stories!",
          ]}
          loop={100}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
      <Banner />
      <TrendingArticles />
      <AllPublisers />
      {/* Statistic */}
      <Statistic />

      <Plans />
      <FeaturedArticlesSection />
      <Reviews />
      <Modal
        open={showModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Card className="modal-card">
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Thanks for staying! Subscribe now for exclusive content.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubscription}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default Home;
