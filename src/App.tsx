import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Import des composants de l'application
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";

function App() {
  // État pour forcer le rafraîchissement de la liste des tâches après un ajout
  const [refresh, setRefresh] = useState(false);

  // Fonction qui inverse la valeur de refresh pour forcer un rechargement
  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };

  return (
    // On utilise BrowserRouter pour gérer les routes côté client
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6">

          {/* Routes de l'application */}
          <Routes>

            {/* Route d'accueil avec les boutons Connexion / Inscription */}
            <Route path="/" element={<Home />} />

            {/* Page de connexion */}
            <Route path="/login" element={<Login />} />

            {/* Page d'inscription */}
            <Route path="/signup" element={<Signup />} />

            {/* Page des tâches protégée */}
            <Route
              path="/tasks"
              element={
                // Si le token est présent → afficher la page des tâches
                localStorage.getItem("token") ? (
                  <>
                    <h1 className="text-3xl font-bold text-center text-blue-600">
                      Gestionnaire de Tâches
                    </h1>

                    {/* Formulaire pour ajouter une tâche */}
                    <AddTask onTaskAdded={handleTaskAdded} />

                    {/* Liste des tâches */}
                    <TaskList key={refresh.toString()} />
                  </>
                ) : (
                  // Si pas de token → redirection vers la page de connexion
                  <Navigate to="/login" />
                )
              }
            />

          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
