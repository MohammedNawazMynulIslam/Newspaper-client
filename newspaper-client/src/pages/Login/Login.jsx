import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import login from "../../assets/login.json";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn } = useAuth();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);

        Swal.fire({
          icon: "success",
          title: "Signed in successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      })
      .catch((error) => {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Invalid email or password",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Newspaper || Login</title>
      </Helmet>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h2">
          Login
        </Typography>
        <Lottie
          animationData={login}
          style={{ width: isSmallScreen ? "column" : "row" }}
        />

        <form onSubmit={handleLogin}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Divider sx={{ my: 2, width: "100%" }}>
            <Typography variant="body2" color="textSecondary" sx={{ px: 2 }}>
              OR
            </Typography>
          </Divider>
          {/* google signin */}
          <GoogleLogin></GoogleLogin>
          {/* create account btn */}
          <Typography
            variant="body2"
            textAlign={"center"}
            color="blue"
            sx={{ px: 2 }}
          >
            Dont have account? Register Now
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={() => navigate("/register")}
            sx={{ mt: 2 }}
          >
            SignUp{" "}
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Login;
