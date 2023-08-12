import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import "./LogIn.css";
import "../Signup/Signup";
import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOME_PAGE);
    });
  }
  return (
    <div className="container-login-image ">
      <div className="container-login">
        <div className="container-form">
          <form onSubmit={handleFormSubmission} className="form-login">
            <div className="content-form">
              <h4 className="h2-style-loggin">Plant Weblog </h4>
              <label htmlFor="input-email" className="label-login">
                <span className="label-login-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-plus-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    <path
                      fillRule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                    ></path>
                  </svg>
                </span>
                <h6 className="label-login-name">E-mail</h6>
              </label>
              <input
                className="input-login"
                id="input-email"
                type="text"
                name="email"
                placeholder="default@example.com"
                value={email}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="input-password" className="label-login">
                <span className="label-password-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-key-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                  </svg>
                </span>{" "}
                <h6 className="label-password-name">Password</h6>
              </label>
              <input
                className="input-login"
                id="input-password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={handleInputChange}
                required
                minLength="8"
                autoComplete="current-password"
              />
              {error && (
                <div className="error-block">
                  <p>{error.message}. Please, provide correct credentials.</p>
                </div>
              )}
              <button
                className="primary btn btn-secondary mb-4 button-login"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
