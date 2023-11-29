import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, UserUpdateProfile } = useAuth();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  console.log(user);
  useEffect(() => {
    if (user) {
      // Set initial values if the user is available
      setName(user.displayName || "");
      setPhoto(user.photoURL || "");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      await UserUpdateProfile(name, photo);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: `Successfully Changed the ${name} || ${photo}`,
      });
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Newspaper || Profile</title>
      </Helmet>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Photo URL"
          fullWidth
          margin="normal"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
        >
          Update Profile
        </Button>
      </Container>
    </>
  );
};

export default Profile;
