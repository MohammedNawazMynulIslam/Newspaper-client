import { useState } from "react";
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
import ArticleModal from "./ArticleModal/ArticleModal";
import { Helmet } from "react-helmet-async";

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
  const [openDeclineReasonModal, setOpenDeclineReasonModal] = useState(false);
  const [reason, setReason] = useState("");
  const axiosSecure = useAxiosSecure();
  // only title update for test
  const [updatedTitle, setUpdatedTitle] = useState("");

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

  // const handleUpdateArticle = async (id) => {
  //   try {
  //     // Fetch the article details first, if needed
  //     const updateRes = await axiosSecure.put(`/article/${id}`){

  //     }

  //     // Assuming you have a form or a modal for updating the article
  //     // You can populate the form or modal with the fetched article details

  //     // After the user updates the article and submits the form
  //     // You can send a PUT request to update the article
  //     const updatedArticle =
  //     /* Get the updated article data from the form or modal */

  //     const updateRes = await axiosSecure.put(`/article/${id}`, updatedArticle);

  //     if (updateRes.status === 200) {
  //       await refetch(); // Correct way to call refetch
  //       Swal.fire("Updated!", "Your article has been updated.", "success");
  //     } else {
  //       Swal.fire("Error", "Failed to update article", "error");
  //     }
  //   } catch (error) {
  //     console.error("Error updating article:", error);
  //     Swal.fire("Error", "Failed to update article", "error");
  //   }
  // };

  // update

  // delete article
  //

  //

  const handleUpdateArticle = async (id) => {
    setSelectedArticle(id);
    setOpenModal(true);
    // Fetch the article details here if needed
  };

  const handleUpdate = async (id) => {
    try {
      // Assuming you have an endpoint like `/article/:id` for updating an article
      const updateRes = await axiosSecure.put(`/article/${id}`, {
        title: updatedTitle, // Include other updated fields as needed
      });

      if (updateRes.status === 200) {
        await refetch();
        Swal.fire("Updated!", "Your article has been updated.", "success");
      } else {
        Swal.fire("Error", "Failed to update article", "error");
      }
    } catch (error) {
      console.error("Error updating article:", error);
      Swal.fire("Error", "Failed to update article", "error");
    } finally {
      // Close the modal
      setOpenModal(false);
      setSelectedArticle(null);
      setUpdatedTitle(""); // Reset the updated title
    }
  };
  // show decline reason
  const handleShowDeclineReason = async (articleId) => {
    setSelectedArticle(articleId);

    try {
      const res = await fetchDeclineReasonMutation.mutateAsync(articleId);
      setReason(res.data.reason);
      setOpenDeclineReasonModal(true);
    } catch (error) {
      console.error("Error fetching decline reason:", error.message);
    }
  };

  // delete article
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

  // const handleShowDeclineReason = async (articleId) => {
  //   setSelectedArticle(articleId);

  //   try {
  //     const res = await fetchDeclineReasonMutation.mutateAsync(articleId);
  //     setReason(res.data.reason);
  //     setOpenModal(true);
  //   } catch (error) {
  //     console.error("Error fetching decline reason:", error.message);
  //   }
  // };

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
      <Helmet>
        <title>Newspaper || My Article</title>
      </Helmet>
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
                    onClick={() => handleUpdate(article.id)}
                  >
                    Update
                  </Button>
                  {/* Modal for updating article */}
                  <ArticleModal
                    isOpen={openModal}
                    onClose={() => {
                      setOpenModal(false);
                      setSelectedArticle(null);
                      setUpdatedTitle(""); // Reset the updated title on modal close
                    }}
                    onUpdate={handleUpdate}
                  />
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
      <Modal
        open={openDeclineReasonModal}
        onClose={() => setOpenDeclineReasonModal(false)}
      >
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenDeclineReasonModal(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MyArticles;
