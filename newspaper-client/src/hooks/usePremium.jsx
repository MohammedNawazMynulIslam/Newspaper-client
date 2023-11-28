// import useAuth from "./useAuth";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";

// const usePremium = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const { data: premiumTaken } = useQuery({
//     queryKey: [user?._id, "premiumTaken"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/subscribe/${_id}}`);
//       console.log(res.data);
//       return res.data?.premiumTaken;
//     },
//   });
//   return [premiumTaken];
// };
// export default usePremium;
