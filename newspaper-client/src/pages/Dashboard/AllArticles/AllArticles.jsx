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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

  const handleDecline = async (articleId) => {
    // Implement logic to decline article using axios
    // await axios.post(`/api/decline/${articleId}`);
    // Invalidate the query to refetch data
    // queryClient.invalidateQueries("articles");
  };

  const handleDelete = async (articleId) => {
    // Implement logic to delete article using axios
    // await axios.delete(`/api/articles/${articleId}`);
    // Invalidate the query to refetch data
    // queryClient.invalidateQueries("articles");
  };

  const handleMakePremium = async (articleId) => {
    // Implement logic to make the article premium using axios
    // await axios.post(`/api/premium/${articleId}`);
    // Invalidate the query to refetch data
    // queryClient.invalidateQueries("articles");
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
                  <Button
                    onClick={() => handleApprove(article)}
                    variant="contained"
                    color="success"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleDecline(article.id)}
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
                    onClick={() => handleMakePremium(article.id)}
                    variant="contained"
                    color="primary"
                  >
                    Make Premium
                  </Button>
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
