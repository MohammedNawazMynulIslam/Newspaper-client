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
import Aos from "aos";
import "aos/dist/aos.css";
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
  useEffect(() => {
    Aos.init();
  }, []);
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
    <>
      <div>
        <Helmet>
          <title>Newspaper || Home</title>
        </Helmet>

        <Banner />
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <TrendingArticles />
        </div>

        <AllPublisers />
        {/* Statistic */}
        <div data-aos="flip-down">
          <Statistic />
        </div>

        <Plans />
        <div data-aos="fade-up-left">
          <FeaturedArticlesSection />
        </div>
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
    </>
  );
};

export default Home;
