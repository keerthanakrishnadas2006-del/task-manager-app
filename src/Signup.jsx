// src/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("https://task-manager-app-1e2m.onrender.com/signup", { username, password });
      setMessage("User created successfully! Please login.");
    } catch (err) {
      setMessage("Signup failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">Signup</Typography>
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
        <Button variant="contained" color="secondary" onClick={handleSignup}>
          Signup
        </Button>
        <Typography sx={{ mt: 2 }} color="error">{message}</Typography>
      </Paper>
    </Container>
  );
}
