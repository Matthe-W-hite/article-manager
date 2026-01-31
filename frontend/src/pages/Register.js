import { useState } from "react";
import api from "../api/axios";
import { TextField, Button, Alert, Paper } from "@mui/material";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/auth/register", { email, password });
      setMessage("Rejestracja udana. Możesz się zalogować.");
    } catch (err) {
      setError(err.response?.data?.message || "Błąd rejestracji");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Rejestracja</h2>

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
            Zarejestruj
          </Button>
        </form>

        {message && (
          <Alert severity="success" className="mt-4">
            {message}
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

export default Register;
