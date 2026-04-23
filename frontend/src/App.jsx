import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token"); // will store JWT later

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setTasks(res.data));
    }
  }, [token]);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
