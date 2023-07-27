import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/auth";
import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";

export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
  });

  const { username, password, email, country } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
      email,
      country,
    };
    // console.log(" 👉 👉 / handleFormSubmission / credentials", credentials);

    signup(credentials).then((res) => {
      console.log(" 👉 👉 / signup / res", res);
      if (!res.status) {
        // unsuccessful signup
        return setError({
          message: "Signup was unsuccessful!",
        });
      }
      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOME_PAGE);
    });
  }

  return (
    <div className="signupcontainer">
      <form onSubmit={handleFormSubmission} className="form-signup">
        <h4 className="h4-style-signup">Join Plant Weblog!</h4>
        <h6 className="h6-style-signup">
          First, let's create your user account
        </h6>

        <label className="label-signup" htmlFor="input-username">
          Username
        </label>
        <input
          className="input-signup"
          id="input-username"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleInputChange}
          required
        />

        <label className="label-signup" htmlFor="input-email">
          E-mail
        </label>
        <input
          className="input-signup"
          id="input-email"
          type="email"
          name="email"
          placeholder="default@example.com"
          value={email}
          onChange={handleInputChange}
          required
        />
        <label className="label-signup" htmlFor="input-country">
          Country
        </label>
        <input
          className="input-signup"
          id="input-country"
          type="text"
          name="country"
          placeholder="country"
          value={country}
          onChange={handleInputChange}
          required
        />

        <label className="label-signup" htmlFor="input-password">
          Password
        </label>
        <input
          className="input-signup"
          id="input-password"
          type="password"
          name="password"
          placeholder="•••••••"
          // value={password}
          onChange={handleInputChange}
          required
          minLength="8"
          autoComplete="username"
        />
        {error && (
          <div className="error-signup">
            <p>{error.message} Please, check if all fields are correct.</p>
          </div>
        )}
        <button
          className="primary btn btn-secondary mb-4 button-signup"
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
