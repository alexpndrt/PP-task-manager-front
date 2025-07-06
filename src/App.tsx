import { useState } from "react";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {
  // État pour forcer la mise à jour de la liste après ajout
  const [refresh, setRefresh] = useState(false);

  // Fonction appelée après l'ajout d'une tâche pour rafraîchir
  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Titre principal */}
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Gestionnaire de Tâches
        </h1>

        {/* Formulaire d'ajout */}
        <AddTask onTaskAdded={handleTaskAdded} />

        {/* Liste des tâches */}
        <TaskList key={refresh.toString()} />
      </div>
    </div>
  );
}

export default App;
