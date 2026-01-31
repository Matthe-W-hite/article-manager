import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { UserContext } from "../context/UserContext";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  IconButton,
  Chip,
  Stack,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";

function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    api.get("/articles").then((res) => setArticles(res.data));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno usunąć artykuł?")) return;

    try {
      await api.delete(`/articles/${id}`);
      setArticles(articles.filter((a) => a._id !== id));
    } catch (error) {
      alert("Błąd podczas usuwania");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Górny pasek */}
      <Paper elevation={2} className="p-4 mb-6 flex flex-wrap gap-4 items-center">
        {user && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={Link}
            to="/create-article"
          >
            Dodaj artykuł
          </Button>
        )}

        {user?.role === "admin" && (
          <>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              component={Link}
              to="/admin"
            >
              Panel admina
            </Button>

            <Button
              variant="outlined"
              startIcon={<CategoryIcon />}
              component={Link}
              to="/admin/categories"
            >
              Kategorie
            </Button>
          </>
        )}

        {!user && (
          <>
            <Button variant="contained" component={Link} to="/login">
              Logowanie
            </Button>
            <Button variant="outlined" component={Link} to="/register">
              Rejestracja
            </Button>
          </>
        )}

        {user && (
          <Button variant="text" color="error" onClick={handleLogout}>
            Wyloguj
          </Button>
        )}
      </Paper>

      <Typography variant="h4" className="font-bold mb-6">
        Artykuły
      </Typography>

      {/* Lista artykułów */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Card key={a._id} className="shadow-md">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-2">
                {a.title}
              </Typography>

              <Typography variant="body2" className="text-gray-700 mb-4">
                {a.content.length > 120
                  ? a.content.substring(0, 120) + "..."
                  : a.content}
              </Typography>

              {a.category && (
                <Chip
                  label={a.category.name}
                  color="primary"
                  size="small"
                  className="mb-2"
                />
              )}
            </CardContent>

            <CardActions className="flex justify-between">
              <Button size="small" component={Link} to={`/article/${a._id}`}>
                Czytaj więcej
              </Button>

              {user &&
                (user.role === "admin" || user.id === a.author?._id) && (
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      color="primary"
                      component={Link}
                      to={`/edit-article/${a._id}`}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(a._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                )}
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;
