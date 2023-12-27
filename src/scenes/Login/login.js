import React from "react";

const Login = () => {
  return (
    <div style={containerStyle}>
      <h1 style={{ color: "#fff" }}>Login</h1>
      <form style={formStyle}>
        <input type="text" placeholder="Email" style={inputStyle} />

        <button type="button" style={buttonStyle}>
          Get OTP
        </button>
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
  background: "linear-gradient(to bottom right, #1f2a40, transparent)", // Gradient background

  boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)", // Optional: Add a box shadow for better visibility
  color: "white", // Text color
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
