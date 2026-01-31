import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

function CreateArticle() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  // Pobierz listę kategorii
  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/articles", {
        title,
        content,
        category,
      });

      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Błąd tworzenia artykułu");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <Paper elevation={3} className="p-8 w-full max-w-2xl">
        <Typography variant="h4" className="font-bold mb-6 text-center">
          Nowy artykuł
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Tytuł"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Treść artykułu"
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
              <MenuItem value="">
                <em>Wybierz kategorię</em>
              </MenuItem>

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
            Dodaj artykuł
          </Button>
        </form>

        {message && (
          <Alert severity="error" className="mt-4">
            {message}
          </Alert>
        )}
      </Paper>
    </div>
  );
}

export default CreateArticle;
