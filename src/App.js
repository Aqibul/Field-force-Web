import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Login from "./scenes/Login/login";
import { Provider } from "react-redux";
import store from "./Redux/store";
import ViewPjp from "./scenes/Pjp/ViewPjp";
import Architect from "./scenes/Architect/Architect";
import Builder from "./scenes/Builder/Builder";
import Contractor from "./scenes/Contractor/Contractor";
import Competitor from "./scenes/Competitor/Competitor";
import Others from "./scenes/Others/Others";
import Dealer from "./scenes/Dealer/Dealer";
import Subdealer from "./scenes/SubDealer/Subdealer";
import Visits from "./scenes/Visits/Visits";
import Profile from "./scenes/Profile";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ display: "flex", height: "100%" }}>
            {isSidebar && !isLoginPage && <Sidebar />}
            <div
              className="content"
              style={{
                flex: 1,
                overflowY: "auto",
                marginLeft: isSidebar && !isLoginPage ? "270px" : "0", // Adjust the sidebar width as needed
                transition: "margin 0.2s ease", // Optional: add a transition effect
              }}
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/viewpjp" element={<ViewPjp />} />
                <Route path="/dealer" element={<Dealer />} />
                <Route path="/subdealer" element={<Subdealer />} />
                <Route path="/architect" element={<Architect />} />
                <Route path="/builder" element={<Builder />} />
                <Route path="/contractor" element={<Contractor />} />
                <Route path="/competitor" element={<Competitor />} />
                <Route path="/others" element={<Others />} />
                <Route path="/visits" element={<Visits />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
