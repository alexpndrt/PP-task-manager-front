// On importe les hooks React nécessaires
import { useEffect, useState } from 'react';
// On importe axios pour faire des requêtes HTTP
import axios from 'axios';

// On définit une interface TypeScript pour décrire la structure d'une tâche
interface Task {
  id: number;      // L'identifiant unique de la tâche (nombre)
  title: string;   // Le titre de la tâche (texte)
  done: boolean;   // Le statut de la tâche : terminée (true) ou non (false)
}

// Déclaration du composant React TaskList
function TaskList() {
  // Déclaration d'un état React pour stocker la liste des tâches (tableau vide au départ)
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fonction pour récupérer les tâches depuis l'API (GET)
  const fetchTasks = () => {
    axios.get('http://localhost:3001/api/tasks') // On envoie une requête GET vers l'API
      .then(response => {
        setTasks(response.data); // Si tout va bien, on stocke les données dans le state
      })
      .catch(error => {
        console.error('Erreur lors du chargement des tâches :', error); // En cas d'erreur, on l'affiche
      });
  };

  // Hook useEffect qui s'exécute au montage du composant (une seule fois)
  useEffect(() => {
    fetchTasks(); // On appelle la fonction pour charger les données au démarrage
  }, []); // Le tableau vide [] signifie qu'on l'exécute une seule fois

  // Fonction pour supprimer une tâche via l'API (DELETE)
  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:3001/api/tasks/${id}`) // On envoie une requête DELETE avec l'id de la tâche
      .then(() => {
        fetchTasks(); // Après suppression, on recharge la liste pour refléter le changement
      })
      .catch(error => {
        console.error('Erreur lors de la suppression :', error); // Gestion des erreurs
      });
  };

  // Fonction pour modifier le statut "done" d'une tâche (PUT)
  const handleToggleDone = (task: Task) => {
    const updatedTask = { ...task, done: !task.done }; // On crée une copie de la tâche avec "done" inversé

    axios.put(`http://localhost:3001/api/tasks/${task.id}`, updatedTask) // On envoie une requête PUT avec la tâche modifiée
      .then(() => {
        fetchTasks(); // Après la mise à jour → on recharge la liste
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour :', error); // Affichage de l'erreur
      });
  };

  // Ce que le composant renvoie (le JSX affiché dans le navigateur)
  return (
    <div>
      {/* Titre de la section */}
      <h2>Liste des Tâches</h2>

      {/* On crée une liste non ordonnée */}
      <ul>
        {/* On parcourt le tableau de tâches avec .map() */}
        {tasks.map(task => (
          <li key={task.id}>
            {/* Titre de la tâche + état : clicable pour cocher/décocher */}
            <span
              style={{
                cursor: 'pointer',                      // Le curseur devient une main au survol
                textDecoration: task.done ? 'line-through' : 'none' // Si la tâche est terminée → texte barré
              }}
              onClick={() => handleToggleDone(task)} // Au clic → on inverse le statut "done"
            >
              {task.title} - {task.done ? '✔️' : '❌'}  {/* On affiche le titre + une icône */}
            </span>

            {/* Bouton pour supprimer la tâche */}
            <button onClick={() => handleDelete(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// On exporte le composant pour pouvoir l'utiliser dans App.tsx
export default TaskList;
