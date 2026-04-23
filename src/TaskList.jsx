// src/TaskList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, Card, CardContent, CardActions, Grid } from "@mui/material";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("https://task-manager-app-1e2m.onrender.com/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  useEffect(() => { if (token) fetchTasks(); }, [token]);

  const addTask = async () => {
    if (!title) return;
    await axios.post("https://task-manager-app-1e2m.onrender.com/tasks", { title }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://task-manager-app-1e2m.onrender.com/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom color="primary">Your Tasks</Typography>
      <TextField
        label="New Task"
        fullWidth
        margin="normal"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={addTask}>Add Task</Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {tasks.map(t => (
          <Grid item xs={12} sm={6} key={t.id}>
            <Card>
              <CardContent>
                <Typography>{t.title}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="error" onClick={() => deleteTask(t.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
