import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  done: boolean;
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  // 🔄 Récupérer les tâches depuis l'API (GET)
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Aucun token trouvé. Veuillez vous connecter.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
      setError("");
    } catch (err: any) {
      console.error("Erreur lors du chargement des tâches :", err);
      setError("Erreur lors du chargement des tâches.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Supprimer une tâche (DELETE)
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks(); // Recharge la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  // ✅ Modifier le statut "done" (PUT)
  const handleToggleDone = async (task: Task) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const updatedTask = { ...task, done: !task.done };

    try {
      await axios.put(
        `http://localhost:3001/api/tasks/${task.id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks(); // Recharge la liste après modification
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div>
      {/* Affiche une erreur si besoin */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul className="space-y-3 mt-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border p-2 rounded shadow"
          >
            {/* Clic pour changer le statut "done" */}
            <span
              onClick={() => handleToggleDone(task)}
              className={`cursor-pointer ${
                task.done ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </span>

            {/* Bouton de suppression */}
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
