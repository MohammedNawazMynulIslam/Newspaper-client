import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Making Admin successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div className="mx-12">
      <div className="justify-evenly my-4 mx-auto">
        {/* <h2 className="text-5xl text-center ">ALL Users {users.length}</h2> */}
        <>
          <Helmet>
            <title>Your App | All Users</title>
          </Helmet>
          <div>
            <h1 className="text-center mt-10 text-4xl ">All Users</h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Profile Picture</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <img
                          src={user.photoURL}
                          alt={`${user.name}'s profile`}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        {user.role === "admin" ? (
                          "Admin"
                        ) : (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleMakeAdmin(user)}
                          >
                            <FaUser></FaUser>
                            Make Admin
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      </div>
    </div>
  );
};

export default AllUsers;
