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
    <div>
      <div className="container-login"></div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleFormSubmission} className="form-login">
        <h2>Welcome!</h2>
        <label htmlFor="input-email" className="label-login">
          <h6>E-mail</h6>
        </label>
        <input
          className="input-login"
          id="input-email"
          type="text"
          name="email"
          placeholder="Enter e-mail"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password" className="label-login">
          <h6>Password</h6>
        </label>
        <input
          className="input-login"
          id="input-password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>{error.message}. Please, provide correct credentials.</p>
          </div>
        )}

        <button className="button-login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
