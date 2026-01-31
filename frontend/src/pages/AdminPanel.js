import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { logout } from "../utils/auth";

import {
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

function AdminPanel() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/articles").then((res) => setArticles(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno usunąć artykuł?")) return;

    try {
      await api.delete(`/articles/${id}`);
      setArticles(articles.filter((a) => a._id !== id));
    } catch (error) {
      alert("Błąd podczas usuwania");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Górny pasek */}
      <Paper elevation={2} className="p-4 mb-6 flex flex-wrap gap-4 items-center">
        <Typography variant="h4" className="font-bold flex-1">
          Panel administratora
        </Typography>

        <Button
          variant="outlined"
          startIcon={<CategoryIcon />}
          component={Link}
          to="/admin/categories"
        >
          Kategorie
        </Button>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/create-article"
        >
          Dodaj artykuł
        </Button>

        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          component={Link}
          to="/"
        >
          Strona główna
        </Button>

        <Button
          variant="text"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Wyloguj
        </Button>
      </Paper>

      <Typography variant="h5" className="font-bold mb-4">
        Lista artykułów
      </Typography>

      <Divider className="mb-6" />

      {/* Lista artykułów */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Card key={a._id} className="shadow-md">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-2">
                {a.title}
              </Typography>
            </CardContent>

            <CardActions className="flex justify-between">
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
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
