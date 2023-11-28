import useAuth from "../../hooks/useAuth";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        console.log(res.user);

        const userDetail = {
          email: res.user?.email,
          name: res.user?.displayName,
          photo: res.user?.photoURL,
        };
        axiosPublic.post("/users", userDetail).then((res) => {
          console.log(res);
          navigate(location?.state ? location.state : "/");
        });
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
    <Button
      onClick={handleGoogleSignIn}
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      sx={{ mt: 3, mb: 2 }}
    >
      <GoogleIcon />
    </Button>
  );
};

export default GoogleLogin;
