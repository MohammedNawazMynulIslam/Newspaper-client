import { Helmet } from "react-helmet-async";
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

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    // Set a timeout for 10 seconds to show the modal
    const timeoutId = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    // Clear the timeout when the component unmounts or when the modal is closed
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleSubscription = () => {
    // Navigate to the subscription page
    navigate("/subscription");
  };
  return (
    <div>
      <Helmet>
        <title>Newspaper || Home</title>
      </Helmet>

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
