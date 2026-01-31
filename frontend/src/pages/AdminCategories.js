import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

import {
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Alert,
  Stack,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await api.post("/categories", { name });
      setCategories([...categories, res.data.category]);
      setName("");
      setMessage("Kategoria została dodana.");
    } catch (error) {
      setMessage("Błąd podczas dodawania kategorii");
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await api.put(`/categories/${editId}`, { name });

      setCategories(
        categories.map((c) => (c._id === editId ? res.data.category : c))
      );

      setEditId(null);
      setName("");
      setMessage("Kategoria została zaktualizowana.");
    } catch (error) {
      setMessage("Błąd podczas edycji kategorii");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Na pewno usunąć kategorię?")) return;

    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
      setMessage("Kategoria została usunięta.");
    } catch (error) {
      setMessage("Błąd podczas usuwania kategorii");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Górny pasek */}
      <Paper elevation={2} className="p-4 mb-6 flex flex-wrap gap-4 items-center">
        <Typography variant="h4" className="font-bold flex-1">
          Panel admina — Kategorie
        </Typography>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/admin")}
        >
          Artykuły
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

      {/* Formularz dodawania/edycji */}
      <Paper elevation={2} className="p-6 mb-6 max-w-xl">
        <Typography variant="h6" className="font-bold mb-4">
          {editId ? "Edytuj kategorię" : "Dodaj kategorię"}
        </Typography>

        <form onSubmit={editId ? handleUpdate : handleAdd} className="space-y-4">
          <TextField
            label="Nazwa kategorii"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth>
            {editId ? "Zapisz" : "Dodaj"}
          </Button>
        </form>

        {message && (
          <Alert severity="info" className="mt-4">
            {message}
          </Alert>
        )}
      </Paper>

      {/* Lista kategorii */}
      <Typography variant="h5" className="font-bold mb-4">
        Lista kategorii
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Card key={cat._id} className="shadow-md">
            <CardContent>
              <Typography variant="h6" className="font-bold">
                {cat.name}
              </Typography>
            </CardContent>

            <CardActions className="flex justify-between">
              <Stack direction="row" spacing={1}>
                <IconButton color="primary" onClick={() => handleEdit(cat)}>
                  <EditIcon />
                </IconButton>

                <IconButton color="error" onClick={() => handleDelete(cat._id)}>
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

export default AdminCategories;
