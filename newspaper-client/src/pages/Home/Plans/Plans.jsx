import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Plans = () => {
  const bulletPoints = [
    "Premium account",
    "Cancel anytime",
    "15 hours/month of listening time from our audiobooks subscribe catelog",
  ];
  const bulletPointsPD = [
    "2 Premium account",
    "Cancel anytime",
    "15 hours/month of listening time from our audiobooks subscribe catelog",
  ];
  const bulletPointsPF = [
    "Up to 6 premium",
    "Block explicit music",
    "Access to Spotify",
    "cancel anytime",
    "15 hours/month of listening time from our audiobooks subscribe catalog",
  ];

  return (
    <Container maxWidth="lg" style={{ marginTop: 20, justifyItems: "center" }}>
      <Typography variant="h4" style={{ textAlign: "center" }} gutterBottom>
        Subscription Plans
      </Typography>
      <div></div>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card
            className="border-5 border-solid border-skyblue bg-black text-white w-fit-content text-center"
            style={{
              border: "5px solid skyblue",
              backgroundColor: "black",
              color: "white",
              height: "500px",
              width: "fit-content",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Free for 1 Month
              </Typography>
              <Typography variant="subtitle1" color="white">
                Next time: Premium Individual
              </Typography>
              <Typography variant="h5" style={{ marginTop: 10 }}>
                Free
              </Typography>
              <Typography variant="subtitle2" color="white">
                For 1 month
              </Typography>
              <ul
                style={{
                  // listStyleType: "disc",
                  lineHeight: "1.6",
                  padding: "20px",
                }}
              >
                {bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: 50 }}
              >
                Try Free
              </Button>
              <Typography
                variant="body2"
                color="white"
                style={{ marginTop: 10 }}
              >
                Free for 1 month, For couples who reside at the same address.
                Terms apply.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            style={{
              border: "5px solid gold",
              backgroundColor: "black",
              color: "white",
              height: "500px",
              width: "fit-content",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Premium Duo
              </Typography>
              <Typography variant="subtitle1" color="white"></Typography>
              <Typography variant="h5" style={{ marginTop: 10 }}>
                $10.99
              </Typography>
              <Typography variant="subtitle2" color="white">
                per month
              </Typography>
              <ul
                style={{
                  lineHeight: "1.6",
                  padding: "20px",
                }}
              >
                {bulletPointsPD.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>

              <Button
                variant="contained"
                color="warning"
                fullWidth
                style={{ marginTop: 60 }}
              >
                Get Premium Duo
              </Button>

              <Typography
                variant="body2"
                color="white"
                style={{ marginTop: 10 }}
              >
                For couples who reside at the same address. Terms apply.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/*  premum family*/}
        <Grid item xs={12} md={4}>
          <Card
            style={{
              border: "5px solid purple",
              backgroundColor: "black",
              color: "white",
              height: "500px",
              width: "fit-content",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Premium Family
              </Typography>

              <Typography variant="h5" style={{ marginTop: 10 }}>
                $19.99
              </Typography>
              <Typography variant="subtitle2" color="white">
                per month
              </Typography>
              <ul
                style={{
                  lineHeight: "1.6",
                  padding: "20px",
                }}
              >
                {bulletPointsPF.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{ marginTop: 10 }}
              >
                Get Premium Family
              </Button>

              <Typography
                variant="body2"
                color="white"
                style={{ marginTop: 10 }}
              >
                For upto 6 family members. Terms apply.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <style>{`
        .before {
          content: '';
          position: absolute;
          width: 100px;
          background-image: linear-gradient(180deg, rgb(0, 183, 255), rgb(255, 48, 255));
          height: 130%;
          animation: rotBGimg 3s linear infinite;
          transition: all 0.2s linear;
          top: 0;
          left: 0;
        }

        @keyframes rotBGimg {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Container>
  );
};

export default Plans;
