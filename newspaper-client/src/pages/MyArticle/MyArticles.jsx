import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query"; // Assuming you are using React Query for data fetching and mutation
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Replace these with your actual query and mutation functions
const fetchArticles = async () => {
  /* Your fetch articles logic */
};
const updateArticle = async () => {
  /* Your update article logic */
};
const deleteArticle = async () => {
  /* Your delete article logic */
};
const fetchDeclineReason = async () => {
  /* Your fetch decline reason logic */
};

const MyArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: articles,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myArticle"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/article", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error("error", error);
      }
    },
  });
  console.log(articles);
  const updateMutation = useMutation(updateArticle);
  const deleteMutation = useMutation(deleteArticle);
  const fetchDeclineReasonMutation = useMutation(fetchDeclineReason);

  const handleUpdateArticle = (articleId) => {
    // Handle update logic using updateMutation.mutate()
  };

  const handleDeleteArticle = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/article/${id}`);
        if (res.status === 200) {
          await refetch(); // Correct way to call refetch
          Swal.fire("Deleted!", "Your article has been deleted.", "success");
        } else {
          Swal.fire("Error", "Failed to delete article", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      Swal.fire("Error", "Failed to delete article", "error");
    }
  };

  const handleShowDeclineReason = async (articleId) => {
    setSelectedArticle(articleId);

    try {
      const res = await fetchDeclineReasonMutation.mutateAsync(articleId);
      setReason(res.data.reason);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching decline reason:", error.message);
    }
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
    setOpenModal(false);
    setReason("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography
        variant="h4"
        textAlign={"center"}
        marginTop={"40px"}
        gutterBottom
      >
        My Articles
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial No</TableCell>
              <TableCell>Article Title</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>isPremium</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article, index) => (
              <TableRow key={article.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  {/* Add a button to show article details */}
                  <Button variant="outlined" color="primary">
                    Details
                  </Button>
                </TableCell>
                <TableCell>
                  {article.status === "declined" && (
                    <>
                      Declined{" "}
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleShowDeclineReason(article.id)}
                      >
                        View Reason
                      </Button>
                    </>
                  )}
                  {article.status === "approved" && "Approved"}
                  {article.status === "pending" && "Pending"}
                </TableCell>
                <TableCell>{article.isPremium ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {/* Add a button to update the article */}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateArticle(article.id)}
                  >
                    Update
                  </Button>
                </TableCell>
                <TableCell>
                  {/* Add a button to delete the article */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteArticle(article._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to show decline reason */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Decline Reason
          </Typography>
          <Typography variant="body1">{reason}</Typography>
          <Button variant="outlined" color="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MyArticles;
