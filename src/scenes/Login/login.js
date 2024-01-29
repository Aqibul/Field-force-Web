import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Slice/LoginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const action = await dispatch(loginUser({ email, password }));

      if (action.payload.error) {
        setErrorMessage(action.payload.error.message || "Login failed");
        return;
      }

      setErrorMessage("");

      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Incorrect User Id Or Password");
    }
  };

  useEffect(() => {
    const getStoredToken = () => {
      const storedToken = localStorage.getItem("token");
      console.log("Token from localStorage (on mount):", storedToken);
    };

    getStoredToken();
  }, []);
  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#fff" }}>Login</h1>
      <form style={formStyle}>
        <input
          type="text"
          placeholder="User ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="button" onClick={handleLogin} style={buttonStyle}>
          Login
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: "linear-gradient(to bottom right, #1f2a40, transparent)",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
  color: "white",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  width: "300px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "20px",
  borderRadius: "8px",
};

const inputStyle = {
  margin: "10px",
  padding: "8px",
  fontSize: "16px",
};

const buttonStyle = {
  margin: "10px",
  padding: "10px",
  fontSize: "18px",
  backgroundColor: "#141b2d",
  color: "white",
  cursor: "pointer",
};

export default Login;
