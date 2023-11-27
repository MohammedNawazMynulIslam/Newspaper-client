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
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";

const fetchDeclineReason = async () => {
  /* Your fetch decline reason logic */
};

const MyArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openDeclineReasonModal, setOpenDeclineReasonModal] = useState(false);
  const { id } = useParams();
  const [reason, setReason] = useState("");
  const axiosSecure = useAxiosSecure();
  const [updatedData, setUpdatedData] = useState({
    title: "",
    publisher: "",
    tags: "",
    image: "",
    description: "",
  });

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
  // modal
  const handleOpenUpdateModal = (article) => {
    setSelectedArticle(article);
    setUpdatedData({
      title: article.title,
      publisher: article.publisher,
      tags: article.tags, // Assuming tags is an array
      image: article.image,
      description: article.description,
    });
    setOpenModal(true);
  };
  // update
  const handleUpdate = async () => {
    console.log("Update article with ID:", selectedArticle._id);
    try {
      const updateRes = await axiosSecure.put(
        `/article/${selectedArticle._id}`,
        updatedData
      );
      console.log("Update Response:", updateRes);
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
      setUpdatedData({
        title: "",
        publisher: "",
        tags: "",
        image: "",
        description: "",
      });
    }
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
                  {/* <Link to={`/updateForm/${id}`}> */}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenUpdateModal(article)}
                  >
                    Update
                  </Button>
                  {/* </Link> */}
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
      {/* Modal for updating article */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
            Update Article
          </Typography>
          <TextField
            label="Title"
            value={updatedData.title}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, title: e.target.value })
            }
          />
          <TextField
            label="Publisher"
            value={updatedData.publisher}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, publisher: e.target.value })
            }
          />
          <TextField
            label="Tags"
            value={updatedData.tags}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, tags: e.target.value })
            }
          />
          <TextField
            label="Image"
            value={updatedData.image}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, image: e.target.value })
            }
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            value={updatedData.description}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, description: e.target.value })
            }
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleUpdate(selectedArticle._id)}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

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
