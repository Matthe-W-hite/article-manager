import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, loadingUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // ⬇⬇⬇ WAŻNE: nie renderujemy navbaru dopóki user się ładuje
  if (loadingUser) return null;
  // ⬆⬆⬆

  const handleLogout = async () => {
    await logout();
    setUser(null); // wyczyść usera w kontekście
    navigate("/login");
  };

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  // Linki wspólne
  const commonLinks = [{ label: "Strona główna", to: "/" }];

  // Linki dla zalogowanych
  const userLinks = [{ label: "Dodaj artykuł", to: "/create-article" }];

  // Linki admina
  const adminLinks = [
    { label: "Panel admina", to: "/admin" },
    { label: "Kategorie", to: "/admin/categories" },
  ];

  // Linki dla gościa
  const guestLinks = [
    { label: "Logowanie", to: "/login" },
    { label: "Rejestracja", to: "/register" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <AppBar position="static" color="primary" className="mb-6">
        <Toolbar className="flex justify-between">

          {/* Lewa strona */}
          <div className="flex items-center gap-4">

            {/* Hamburger (mobile only) */}
            <IconButton
              edge="start"
              color="inherit"
              className="md:hidden"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className="font-bold">
              ArticleManager
            </Typography>

            {/* Linki desktopowe */}
            <div className="hidden md:flex items-center gap-4">
              {commonLinks.map((item) => (
                <Button key={item.to} color="inherit" component={Link} to={item.to}>
                  {item.label}
                </Button>
              ))}

              {user &&
                userLinks.map((item) => (
                  <Button key={item.to} color="inherit" component={Link} to={item.to}>
                    {item.label}
                  </Button>
                ))}

              {user?.role === "admin" &&
                adminLinks.map((item) => (
                  <Button key={item.to} color="inherit" component={Link} to={item.to}>
                    {item.label}
                  </Button>
                ))}
            </div>
          </div>

          {/* Prawa strona */}
          <div className="hidden md:flex items-center gap-4">
            {!user &&
              guestLinks.map((item) => (
                <Button key={item.to} color="inherit" component={Link} to={item.to}>
                  {item.label}
                </Button>
              ))}

            {user && (
              <Button color="inherit" onClick={handleLogout}>
                Wyloguj
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* DRAWER (menu mobilne) */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div className="w-64 p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <Typography variant="h6" className="font-bold">
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          <Divider />

          <List>
            {commonLinks.map((item) => (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {user &&
              userLinks.map((item) => (
                <ListItem key={item.to} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}

            {user?.role === "admin" &&
              adminLinks.map((item) => (
                <ListItem key={item.to} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}

            {!user &&
              guestLinks.map((item) => (
                <ListItem key={item.to} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.to}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}

            {user && (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    toggleDrawer(false)();
                    handleLogout();
                  }}
                >
                  <ListItemText primary="Wyloguj" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
