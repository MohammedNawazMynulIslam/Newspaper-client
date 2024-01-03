import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [subscriptionPeriod, setSubscriptionPeriod] = React.useState("1");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  const handlePeriodChange = (event) => {
    setSubscriptionPeriod(event.target.value);
  };

  const handleSubscribe = async () => {
    try {
      const duration = parseInt(subscriptionPeriod);

      await Promise.all(
        users.map(async (user) => {
          const response = await axiosSecure.patch(
            `/users/subscribe/${user._id}`,
            { duration }
          );

          if (response.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Subscribe successful",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
      );

      navigate("/payment");
    } catch (error) {
      console.error("Error subscribing:", error);
      // Handle error as needed
    }
  };

  return (
    <>
      <Helmet>
        <title>Newspaper || Subscription</title>
      </Helmet>

      <Box
        marginTop={"50px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
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
            sx={{
              backgroundColor: "white",
              p: 5,
              borderRadius: 8,
              boxShadow: 1,
            }}
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

            {/* Single Subscribe Now button for all users */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubscribe}
            >
              Subscribe Now
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SubscriptionPage;
