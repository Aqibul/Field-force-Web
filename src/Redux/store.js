import { configureStore } from "@reduxjs/toolkit";

const getInitialToken = () => {
  const initialToken = localStorage.getItem("token") || null;

  return initialToken;
};

let store;

try {
  store = configureStore({});

  console.log("Redux store created successfully:", store);
} catch (error) {
  console.error("Error creating Redux store:", error);
}

export default store;
