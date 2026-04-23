// src/Login.jsx
import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://task-manager-app-1e2m.onrender.com/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful!");
      window.location.href = "/tasks";
    } catch (err) {
      setMessage("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">Login</Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          Login
        </Button>
        <Typography sx={{ mt: 2 }} color="error">{message}</Typography>
      </Paper>
    </Container>
  );
}
