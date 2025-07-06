import { useState } from "react";
import axios from "axios";

interface AddTaskProps {
  onTaskAdded: () => void;
}

function AddTask({ onTaskAdded }: AddTaskProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post("http://localhost:3001/api/tasks", {
        title,
        done: false,
      });
      setTitle("");
      onTaskAdded(); // 🔄 Rafraîchir la liste après ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la tâche"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Ajouter
      </button>
    </form>
  );
}

export default AddTask;
