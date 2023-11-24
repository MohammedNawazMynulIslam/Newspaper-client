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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const pages = [
  { label: "Home", link: "/" },
  { label: "Add Articles", link: "/add-articles" },
  { label: "All Articles", link: "/all-articles" },
  { label: "Subscription", link: "/subscription" },
  { label: "Dashboard", link: "/dashboard" },
  { label: "My Articles", link: "/my-articles" },
  { label: "Premium Articles", link: "/premium-articles" },
  { label: "Login", link: "/login" },
  { label: "Register", link: "/register" },
  // Add more pages as needed
];
// const loginUser = [
//   { label: "Home", link: "/" },
//   { label: "Add Articles", link: "/add-articles" },
//   { label: "All Articles", link: "/all-articles" },
//   { label: "Subscription", link: "/subscription" },
//   { label: "Dashboard", link: "/dashboard" },
//   { label: "My Articles", link: "/my-articles" },
//   { label: "Premium Articles", link: "/premium-articles" },
//   { label: "LogOut", link: "/login" },

//   // Add more pages as needed
// ];

const settings = ["Profile"];

const Navbar = () => {
  const { user, logOut } = useAuth();
  // console.log(user.reloadUserInfo.photoUrl);
  // const userPic = user?.reloadUserInfo?.photoUrl;
  // console.log(userPic);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src="https://i.ibb.co/pdFcRKS/18157303-newspaper-icon-business-news.jpg"
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
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.label}</Typography>
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
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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
            </Box> */}
            <Box sx={{ flexGrow: 1 }}>
              {user ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="" src={user?.photoURL} />
                    </IconButton>
                  </Tooltip>
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
                  <MenuItem>
                    <Typography textAlign={"center"}>Home</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign={"center"}>Add Articles</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign={"center"}>All Articles</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign={"center"}>Subscription</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign={"center"}>Dashboard</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign={"center"}>My Articles</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign={"center"}>
                      Premium Articles
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign={"center"}>
                      Premium Articles
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign={"center"}>Logout</Typography>
                  </MenuItem>
                </>
              ) : (
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
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
