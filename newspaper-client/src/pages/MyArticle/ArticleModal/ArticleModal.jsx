/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const ArticleModal = ({ isOpen, onClose, onUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(""); // Assuming you want to update the title

  const handleUpdate = () => {
    // Call the onUpdate function passed from the parent component
    onUpdate(updatedTitle);
    // Close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Update Article</DialogTitle>
      <DialogContent>
        {/* Assuming you want to update the title */}
        <TextField
          label="Updated Title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ArticleModal;
