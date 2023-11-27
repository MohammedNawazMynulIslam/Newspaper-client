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
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    console.log(name, email, password, photoURL);

    const passwordLengthError = password.length < 6;
    const passwordCapitalError = !/[A-Z]/.test(password);
    const passwordSpecialCharError = !/[^A-Za-z0-9]/.test(password);
    const passwordNumericCharError = !/\d/.test(password);

    if (
      passwordLengthError ||
      passwordCapitalError ||
      passwordSpecialCharError ||
      passwordNumericCharError
    ) {
      let errorMessage = "Password must meet the following criteria:\n";
      if (passwordLengthError)
        errorMessage += "- Be at least 6 characters long\n";
      if (passwordCapitalError)
        errorMessage += "- Contain at least one capital letter\n";
      if (passwordSpecialCharError)
        errorMessage += "- Contain at least one special character\n";
      if (passwordNumericCharError)
        errorMessage += "- Contain at least one numeric character\n";
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: errorMessage,
      });
      return;
    }
    try {
      const res = await createUser(email, password);
      console.log(res);
      const userInfo = {
        name: name,
        email: email,
        photoURL: photoURL,
      };

      const userRes = await axiosPublic.post("/users", userInfo);

      if (userRes.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Signed up successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: "Failed to register user",
      });
    }
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
          <TextField
            margin="normal"
            fullWidth
            id="photoURL"
            label="Profile Picture URL"
            name="photoURL"
            autoComplete="photoURL"
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
