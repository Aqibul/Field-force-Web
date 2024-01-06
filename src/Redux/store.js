import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slice/LoginSlice";
import authMiddleware from "./authMiddleware";
import ViewPjpSlice from "./Slice/Pjp/ViewPjpSlice";
import ViewCategorySlice from "./Slice/Category/ViewCategorySlice";
import ViewAllDealerSlice from "./Slice/AllDealer/ViewAllDealerSlice";

const getInitialToken = () => {
  const initialToken = localStorage.getItem("token") || null;

  return initialToken;
};

let store;

try {
  store = configureStore({
    reducer: {
      auth: AuthReducer,
      ViewPjp: ViewPjpSlice,
      ViewCategory: ViewCategorySlice,
      ViewAllDealer: ViewAllDealerSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authMiddleware),
    preloadedState: {
      auth: {
        token: getInitialToken(),
        // other auth state fields
      },
    },
  });

  console.log("Redux store created successfully:", store);
} catch (error) {
  console.error("Error creating Redux store:", error);
}

export default store;
