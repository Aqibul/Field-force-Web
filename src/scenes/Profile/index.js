import React from "react";

const EmployeeContainer = () => {
  const employeeData = {
    code: 213132,
    name: "Aqibul Haque",
    rm: "something",
    role: "Admin",
    state: "Assam",
    territory: "Assam",
  };
  const containerStyle = {
    background: "linear-gradient(to bottom right, #1f2a40, transparent)", // Gradient background
    position: "absolute",
    top: "50%",
    left: "58%",
    transform: "translate(-50%, -50%)",
    width: "50%", // Set width to 50% of the viewport
    height: "50%", // Set height to 50% of the viewport
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)", // Optional: Add a box shadow for better visibility
    color: "white", // Text color
  };

  return (
    <div style={containerStyle}>
      <h1>PROFILE</h1>
      <p>Code: {employeeData.code}</p>
      <p>Name: {employeeData.name}</p>
      <p>RM: {employeeData.rm}</p>
      <p>Role: {employeeData.role}</p>
      <p>State: {employeeData.state}</p>
      <p>Territory: {employeeData.territory}</p>
    </div>
  );
};

export default EmployeeContainer;
