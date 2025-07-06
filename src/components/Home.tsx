import { Link } from "react-router-dom";

// ✅ Composant Home qui affiche l'accueil avec des boutons vers Login et Signup
function Home() {
  return (
    <div className="text-center space-y-6">
      
      {/* Titre de la page */}
      <h1 className="text-3xl font-bold text-blue-600">Bienvenue !</h1>

      {/* Message d'information */}
      <p className="text-gray-600">Veuillez vous connecter ou vous inscrire pour accéder à votre gestionnaire de tâches.</p>

      {/* Groupe de boutons */}
      <div className="flex justify-center gap-4">
        {/* Bouton vers la page de connexion */}
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Connexion
        </Link>

        {/* Bouton vers la page d'inscription */}
        <Link
          to="/signup"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Inscription
        </Link>
      </div>
    </div>
  );
}

export default Home;
