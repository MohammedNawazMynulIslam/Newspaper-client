import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [subscriptionPeriod, setSubscriptionPeriod] = React.useState("1");

  const handlePeriodChange = (event) => {
    setSubscriptionPeriod(event.target.value);
  };

  const handleSubscribe = () => {
    // Handle navigation to the payment page or perform other actions
    navigate("/payment");
  };

  return (
    <Box marginTop={"50px"}>
      <Container maxWidth="md">
        <Typography variant="h4" textAlign={"center"} gutterBottom>
          Subscribe
        </Typography>
        <img
          src="https://i.ibb.co/1R74RWx/view-3d-man-with-tech-device-23-2150710048.jpg"
          alt="Subscription Banner"
          style={{
            width: "100%",
            height: "450px",
            borderRadius: "8px 8px 0 0",
          }}
        />

        <Box
          sx={{ backgroundColor: "white", p: 3, borderRadius: 8, boxShadow: 1 }}
        >
          <div className="subscription-details">
            <Typography variant="h6">Subscription Details</Typography>
            <label htmlFor="subscriptionPeriod">
              Select Subscription Period:
            </label>
            <Select
              id="subscriptionPeriod"
              value={subscriptionPeriod}
              onChange={handlePeriodChange}
              fullWidth
            >
              <MenuItem value="1">1 minute</MenuItem>
              <MenuItem value="5">5 days</MenuItem>
              <MenuItem value="10">10 days</MenuItem>
            </Select>
          </div>

          <Divider sx={{ my: 2 }} />

          <div className="pricing">
            <Typography variant="h6">Pricing</Typography>
            <div className="pricing-option">
              <span>1 minute</span>
              <span>$1</span>
            </div>
            <div className="pricing-option">
              <span>5 days</span>
              <span>$5</span>
            </div>
            <div className="pricing-option">
              <span>10 days</span>
              <span>$10</span>
            </div>
          </div>

          <Divider sx={{ my: 2 }} />

          <Button variant="contained" color="primary" onClick={handleSubscribe}>
            Subscribe Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SubscriptionPage;
