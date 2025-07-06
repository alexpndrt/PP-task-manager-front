import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  // États pour gérer les champs du formulaire et le message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Appel à l'API pour se connecter
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        }
      );

      // On récupère le token renvoyé par l'API
      const token = response.data.token;

      // On stocke le token dans le localStorage pour les futures requêtes sécurisées
      localStorage.setItem("token", token);

      // Message de succès optionnel
      setMessage("Connexion réussie !");

      // Redirection vers la page des tâches
      navigate("/tasks");
    } catch (error: any) {
      console.error(error);
      setMessage(error.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow max-w-md mx-auto">
      {/* Titre */}
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Connexion</h2>

      {/* Message d'erreur ou de succès */}
      {message && <p className="mb-4 text-sm text-gray-600">{message}</p>}

      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>

      {/* Lien pour revenir à l'accueil */}
      <Link
        to="/"
        className="block mt-4 text-blue-500 hover:underline text-center"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default Login;
