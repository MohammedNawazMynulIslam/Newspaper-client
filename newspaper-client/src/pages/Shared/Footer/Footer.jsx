import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <>
      <div style={{}}>
        <Typography variant="body2" color="text.secondary">
          {"Copyright © "}
          <Link color="inherit" href="/">
            Newspaper
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </>
  );
}

const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container
            maxWidth="sm"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="https://i.ibb.co/FxJ3Q6z/18157303-newspaper-icon-business-news-removebg-preview.png"
              alt="newspaper"
              style={{ width: 30, marginRight: 10 }}
            />
            <Typography variant="body1">
              Best Newspaper under the finger tip.
            </Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
