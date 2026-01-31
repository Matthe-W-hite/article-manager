import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { UserContext } from "../context/UserContext";
import { getUser } from "../utils/auth";

import { Paper, TextField, Button, Alert } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/auth/login", { email, password });

      // pobierz usera z backendu i zapisz w kontekście
      const u = await getUser();
      setUser(u);

      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Błąd logowania");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Logowanie</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Hasło"
            type="password"
            fullWidth
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            className="!mt-4"
          >
            Zaloguj
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

export default Login;
