import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Por favor, ingresa el nombre de usuario y la contraseña");
    } else {
      setError("");
      navigate("/");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 w-full flex items-center justify-center">
      <main className="bg-base-100 w-3/12 p-12 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-center">Iniciar Sesión</h1>
          <div>
            <label htmlFor="floatingInput" className="sr-only">Correo electrónico</label>
            <input
              type="text"
              className="input input-bordered w-full"
              id="floatingInput"
              placeholder="Correo electrónico"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="floatingPassword" className="sr-only">Contraseña</label>
            <input
              type="password"
              className="input input-bordered w-full"
              id="floatingPassword"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              className="checkbox"
              type="checkbox"
              value="remember-me"
              id="rememberMe"
            />
            <label className="ml-2 text-sm" htmlFor="rememberMe">
              Recordarme
            </label>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          
          <button className="btn btn-primary w-full rounded-full " type="submit">
            Iniciar Sesión
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
