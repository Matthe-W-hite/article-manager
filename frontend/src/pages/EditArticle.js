import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

import {
  TextField,
  Button,
  Paper,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api.get(`/articles/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
      setCategory(res.data.category?._id || "");
    });

    api.get("/categories").then((res) => setCategories(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.put(`/articles/${id}`, {
        title,
        content,
        category,
      });

      setSuccess("Artykuł został zaktualizowany.");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setError("Błąd podczas edycji artykułu");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <Paper elevation={3} className="p-8 w-full max-w-2xl">
        <Typography variant="h4" className="font-bold mb-6 text-center">
          Edytuj artykuł
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Tytuł"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Treść"
            fullWidth
            multiline
            minRows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Kategoria</InputLabel>
            <Select
              value={category}
              label="Kategoria"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            className="!mt-4"
          >
            Zapisz zmiany
          </Button>
        </form>

        {success && (
          <Alert severity="success" className="mt-4">
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" className="mt-4">
            {error}
          </Alert>
        )}
      </Paper>
    </div>
  );
}

export default EditArticle;
