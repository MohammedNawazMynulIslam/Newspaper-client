import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["allArticle"],
    queryFn: async () => {
      const res = await axiosSecure.get("/article", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });

  // handle approve article
  const handleApprove = async (article) => {
    axiosSecure.patch(`/article/approve/${article._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Approved successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const [reason, setReason] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleDecline = async (article) => {
    setSelectedArticle(article);
  };
  const handleDeclineSubmit = async (article) => {
    axiosSecure
      .patch(`/article/decline/${article._id}`, { reason })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          setSelectedArticle(null);
          setReason("");
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Decline",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDelete = async (articleId) => {};

  const handleMakePremium = async (article) => {
    axiosSecure.patch(`/article/premium/${article._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Promoted to Premium",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <h1>All Articles</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author Name</TableCell>
              <TableCell>Author Email</TableCell>
              <TableCell>Author Photo</TableCell>
              <TableCell>Posted Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article?.title}</TableCell>
                <TableCell>{article.author?.name}</TableCell>
                <TableCell>{article.author?.email}</TableCell>
                <TableCell>
                  <Avatar
                    alt={article.author?.name}
                    src={article.author?.photo}
                  />
                </TableCell>
                <TableCell>{article?.postedDate}</TableCell>
                <TableCell>{article?.status}</TableCell>
                <TableCell>{article?.publisher}</TableCell>
                <TableCell>
                  {/* approve btn */}
                  <Button
                    onClick={() => handleApprove(article)}
                    variant="contained"
                    color="success"
                  >
                    Approve
                  </Button>
                  {/* decline modal */}
                  <Button
                    onClick={() => handleDecline(article)}
                    variant="contained"
                    color="error"
                  >
                    Decline
                  </Button>

                  <Button
                    onClick={() => handleDelete(article.id)}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleMakePremium(article)}
                    variant="contained"
                    color="primary"
                  >
                    Make Premium
                  </Button>
                  <Dialog
                    open={Boolean(selectedArticle === article)}
                    onClose={() => {
                      setSelectedArticle(null);
                      setReason("");
                    }}
                  >
                    <DialogTitle>Write Reason for Decline</DialogTitle>
                    <DialogContent>
                      <TextField
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        label="Reason"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                        margin="dense"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => handleDeclineSubmit(article)}
                        variant="contained"
                        color="error"
                      >
                        Decline
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllArticles;
