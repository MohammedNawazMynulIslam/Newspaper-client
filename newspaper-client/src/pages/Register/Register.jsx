import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";
import login from "../../assets/login.json";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    createUser(email, password)
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Signed in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
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
        <title>Newspaper || Register</title>
      </Helmet>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h2" mt="20px">
          Register
        </Typography>
        <Lottie animationData={login} />

        <form onSubmit={handleSignUp}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Divider sx={{ my: 2, width: "100%" }}>
            <Typography variant="body2" color="textSecondary" sx={{ px: 2 }}>
              OR
            </Typography>
          </Divider>

          {/* create account btn */}
          <Typography
            variant="body2"
            textAlign={"center"}
            color="blue"
            sx={{ px: 2 }}
          >
            Already have an account? Login Now
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={() => navigate("/login")}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default Register;
