// On importe les hooks React nécessaires
import { useEffect, useState } from 'react';
// On importe axios pour faire les requêtes HTTP
import axios from 'axios';

// On définit une interface TypeScript pour décrire la structure d'une tâche
interface Task {
  id: number;
  title: string;
  done: boolean;
}

// On déclare le composant fonctionnel TaskList
function TaskList() {
  // On déclare un state React pour stocker la liste des tâches
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🚀 Fonction pour charger les tâches depuis l'API
  const fetchTasks = () => {
    // On envoie une requête GET vers notre API pour récupérer les tâches
    axios.get('http://localhost:3001/api/tasks')
      .then(response => {
        // Si la requête réussit → on met à jour le state avec les tâches reçues
        setTasks(response.data);
      })
      .catch(error => {
        // Si une erreur survient → on l'affiche dans la console
        console.error('Erreur lors du chargement des tâches :', error);
      });
  };

  // useEffect avec tableau vide [] → se déclenche une seule fois au montage du composant
  useEffect(() => {
    fetchTasks(); // On charge les tâches dès que le composant est affiché
  }, []);

  // 🚀 Fonction pour supprimer une tâche
  const handleDelete = (id: number) => {
    // On envoie une requête DELETE vers l'API avec l'id de la tâche
    axios.delete(`http://localhost:3001/api/tasks/${id}`)
      .then(() => {
        // Après suppression → on recharge la liste des tâches
        fetchTasks();
      })
      .catch(error => {
        // En cas d'erreur → message dans la console
        console.error('Erreur lors de la suppression :', error);
      });
  };

  // 🔗 Partie JSX : ce qui sera affiché dans le navigateur
  return (
    <div>
      {/* Titre */}
      <h2>Liste des Tâches</h2>

      {/* Liste des tâches sous forme de <ul> */}
      <ul>
        {/* On parcourt chaque tâche avec .map() */}
        {tasks.map(task => (
          <li key={task.id}>
            {/* Affichage du titre et de l'état (fait ou non fait) */}
            {task.title} - {task.done ? '✔️' : '❌'}

            {/* Bouton pour supprimer la tâche */}
            <button onClick={() => handleDelete(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// On exporte le composant pour pouvoir l'utiliser ailleurs
export default TaskList;
