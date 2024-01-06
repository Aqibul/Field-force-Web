import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
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
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {isSidebar && !isLoginPage && <Sidebar />}
            <main className="content">
              {/* {isSidebar && !isLoginPage && (
                <Topbar setIsSidebar={setIsSidebar} />
              )} */}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/viewpjp" element={<ViewPjp />} />
                <Route path="/architect" element={<Architect />} />
                <Route path="/builder" element={<Builder />} />
                <Route path="/contractor" element={<Contractor />} />
                <Route path="/competitor" element={<Competitor />} />
                <Route path="/others" element={<Others />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
}

export default App;
