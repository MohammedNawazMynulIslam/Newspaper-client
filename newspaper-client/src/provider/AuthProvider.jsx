import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signOut } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  // create user with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   signin user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   google sign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  //   logout
  const logOut = () => {
    setLoading(true);

    return signOut(auth);
  };
  // update profile
  const UserUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //   observer
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     // if  else
  //     if (currentUser) {
  //       const userDetail = { email: currentUser.email };
  //       axiosPublic.post("/jwt", userDetail).then((res) => {
  //         if (res.data.token) {
  //           localStorage.setItem("access-token", res.data.token);
  //           console.log("token stored in local storage", res.data.token);
  //         } else {
  //           localStorage.removeItem("access-token");
  //           console.log("token not received or removed from local storage");
  //         }
  //       });
  //     }
  //     setLoading(false);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [axiosPublic]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("onAuthStateChanged triggered");
      setUser(currentUser);
      if (currentUser) {
        const userDetail = { email: currentUser.email };
        try {
          console.log("Sending request to /jwt");
          const res = await axiosPublic.post("/jwt", userDetail);
          if (res.data.token) {
            console.log("Received token from /jwt:", res.data.token);
            localStorage.setItem("access-token", res.data.token);
            // Redirect the user to the desired page here
          } else {
            console.log("Token not received or removed from /jwt response");
            localStorage.removeItem("access-token");
          }
        } catch (error) {
          console.error("Error while sending token to backend:", error);
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    UserUpdateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
