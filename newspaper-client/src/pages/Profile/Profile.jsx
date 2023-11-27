import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
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
      await updateUserProfile(name, photo);
      console.log("Profile updated successfully");
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
