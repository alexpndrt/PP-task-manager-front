import { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        {
          email,
          password,
        }
      );

      setMessage(response.data.message || "Inscription réussie");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Erreur lors de l’inscription"
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Inscription</h2>

      {message && <p className="mb-4 text-sm text-gray-600">{message}</p>}

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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          S’inscrire
        </button>
      </form>
    </div>
  );
}

export default Signup;
