import "./register.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/backend/auth/register", user);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="rInput"
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="rInput"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="rInput"
        />

        <button onClick={handleSubmit} className="rButton">
          Sign Up
        </button>

        <p className="loginLink">
          Already have an account?{" "}
          <Link to="/login" className="loginText">
            Login
          </Link>
        </p>

        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default Register;
