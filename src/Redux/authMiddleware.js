import { setAuthToken, logoutUser, loginUser } from "./Slice/LoginSlice";

const authMiddleware = (store) => (next) => async (action) => {
  switch (action.type) {
    case loginUser.fulfilled.type:
      // Extract the token from the action payload
      const token = action.payload.token || action.payload.data.token || null;

      // Save the token to local storage
      localStorage.setItem("token", token);

      // Dispatch an action to set the token in the Redux store
      store.dispatch(setAuthToken(token));
      break;

    case loginUser.rejected.type:
      // Clear the token and user data in case of login failure
      localStorage.removeItem("token");
      store.dispatch(logoutUser());
      break;

    // Add additional cases for handling token refresh, if needed

    default:
      break;
  }

  // Continue to the next middleware or reducer
  return next(action);
};

export default authMiddleware;
