import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos");
    } else if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
      axios
        .post(`${apiUrl}/api/auth/register`, {
          username: username,
          password: password,
        })
        .then(() => {
          navigate("/auth/login");
        })
        .catch((err) => {
          setError("Error al registrar usuario");
          console.error(err);
        });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 w-full flex items-center justify-center">
      <main className="bg-base-100 w-3/12 p-12 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-center">Registrarse</h1>
          <p className="text-sm">¿Ya tienes cuenta? <Link to="/auth/login" className="link font-bold">Iniciar sesión</Link></p>
          <label htmlFor="username" className="sr-only">Nombre de usuario</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="username"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input
              type="password"
              className="input input-bordered w-full"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
            <input
              type="password"
              className="input input-bordered w-full"
              id="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button className="btn btn-primary w-full rounded-full " type="submit">
            Registrarse
          </button>
        </form>
      </main>
    </div>
  );
};

export default RegisterPage;
