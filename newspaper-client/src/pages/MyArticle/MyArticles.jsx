import React, { useState, useEffect } from "react";
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

  const { data: articles, isLoading } = useQuery({
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

  const updateMutation = useMutation(updateArticle);
  const deleteMutation = useMutation(deleteArticle);
  const fetchDeclineReasonMutation = useMutation(fetchDeclineReason);

  const handleUpdateArticle = (articleId) => {
    // Handle update logic using updateMutation.mutate()
  };

  const handleDeleteArticle = (articleId) => {
    // Handle delete logic using deleteMutation.mutate()
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
                    onClick={() => handleDeleteArticle(article.id)}
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
