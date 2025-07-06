import { useState } from "react";
import axios from "axios";

interface AddTaskProps {
  onTaskAdded: () => void; // Fonction pour rafraîchir la liste après ajout
}

function AddTask({ onTaskAdded }: AddTaskProps) {
  const [title, setTitle] = useState(""); // État pour le champ de la tâche

  // Fonction appelée quand on soumet le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔑 Récupération du token JWT depuis le localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Aucun token trouvé, impossible d’ajouter la tâche");
      return;
    }

    try {
      // 🔗 Appel API pour créer une tâche avec le token dans les headers
      await axios.post(
        "http://localhost:3001/api/tasks",
        { title, done: false }, // Données envoyées au serveur
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Envoi du token dans l'en-tête Authorization
          },
        }
      );

      setTitle(""); // On vide le champ après l’ajout
      onTaskAdded(); // On déclenche le rafraîchissement de la liste
    } catch (error) {
      console.error("Erreur lors de l’ajout de la tâche :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ajouter une tâche..."
        className="flex-1 p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Ajouter
      </button>
    </form>
  );
}

export default AddTask;
