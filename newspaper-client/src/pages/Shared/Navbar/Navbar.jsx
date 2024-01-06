import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, Link as RouterLink, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const location = useLocation();
  const { user, logOut } = useAuth();
  console.log(user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ["Profile"];
  const [isAdmin] = useAdmin();
  const [premiumTaken, setPremiumTaken] = React.useState(false);
  const axiosSecure = useAxiosSecure();
  // console.log({ user });
  // Add a state variable to track the selected item
  const [selectedItem, setSelectedItem] = React.useState("");
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { data: premiumUsers = [] } = useQuery({
    queryKey: ["premiumUsers"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users/premium", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error("Error fetching premium users", error);
      }
    },
  });
  const isPremium = premiumUsers;
  // console.log(isPremium);
  const isPremiumUser = isPremium.some(
    (premiumUser) => premiumUser.email === user?.email
  );
  const pages = user
    ? [
        { label: "Home", link: "/" },
        { label: "Add Articles", link: "/add-articles" },
        { label: "All Articles", link: "/all-articles" },
        { label: "Subscription", link: "/subscription" },
        { label: "My Articles", link: "/my-articles" },
        isAdmin && {
          label: "Dashboard",
          link: "/dashboard",
        },

        isPremiumUser && {
          label: "Premium Articles",
          link: "/premium-articles",
        },
        { label: "Profile", link: "/profile" },
      ].filter(Boolean)
    : [
        { label: "Home", link: "/" },
        { label: "All Articles", link: "/all-articles" },
        { label: "Login", link: "/login" },
        { label: "Register", link: "/register" },
      ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage: "linear-gradient(to right, #007BFF, #00BFFF)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src="https://i.ibb.co/FxJ3Q6z/18157303-newspaper-icon-business-news-removebg-preview.png"
              alt="logo"
              style={{ width: 30, marginRight: 10 }}
            />

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Newspaper
            </Typography>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                display: { lg: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  component={RouterLink}
                  to={page.link}
                  selected={location.pathname === page.link}
                  onClick={() => {
                    handleCloseNavMenu();
                    setSelectedItem(page.label);
                  }}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                  {selectedItem === page.label && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        width: "100%",
                        height: 2,
                        background: "white",
                        marginTop: 5,
                      }}
                    ></motion.div>
                  )}
                </MenuItem>
              ))}
            </Menu>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Newspaper
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={RouterLink}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
              {user ? (
                <>
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center">LOGOUT</Typography>
                  </MenuItem>
                </>
              ) : (
                <Box
                  sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                ></Box>
              )}
            </Box>
            {user && (
              <Box>
                <Link to="/profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="" src={user?.photoURL} />
                  </IconButton>
                  <Typography>{user?.displayName}</Typography>
                </Link>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
