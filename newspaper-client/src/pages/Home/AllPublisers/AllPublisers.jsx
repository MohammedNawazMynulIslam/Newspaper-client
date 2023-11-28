import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const AllPublisers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: publisher = [] } = useQuery({
    queryKey: ["allpubliser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });
  console.log(publisher);
  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        textAlign={"center"}
        marginTop={"50px"}
        marginBottom={"50px"}
      >
        All Publisher
      </Typography>
      <Grid container spacing={2}>
        {publisher.map((publisher) => (
          <Grid key={publisher.id} item xs={12} sm={6} md={4} lg={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={publisher.logo}
                title={publisher.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {publisher.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllPublisers;
