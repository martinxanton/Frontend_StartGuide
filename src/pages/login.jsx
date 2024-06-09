import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("Por favor, ingresa el nombre de usuario y la contraseña");
    } else {
      setError("");
      axios
        .post("http://localhost:3000/api/auth/login", {
          username: username,
          password: password,
        })
        .then((response) => {
          const { token } = response.data;
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.user.id;
          localStorage.setItem("token", token);
          navigate("/");
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.msg) {
            setError(err.response.data.msg); // Mostrar el mensaje de error del backend
          } else {
            setError("Error al iniciar sesión");
          }
          console.error(err);
        });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 w-full flex items-center justify-center">
      <main className="bg-base-100 w-3/12 p-12 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-center">Iniciar Sesión</h1>
          <p className="text-sm">
            ¿Aún no tienes cuenta?{" "}
            <a href="/auth/register" className="link font-bold">
              Registrarme
            </a>
          </p>
          <label
            htmlFor="floatingInput"
            className="input input-bordered flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label
            htmlFor="floatingPassword"
            className="input input-bordered flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
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

          <button
            className="btn btn-primary w-full rounded-full "
            type="submit"
          >
            Iniciar Sesión
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
