import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import StoryPage from "./pages/Story";
// import "primereact/primereact.all";
import { useMediaQuery } from "@mui/material";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AOS from "aos";
import SignUpPage from "./pages/SignUp";
import { CookiesProvider } from "react-cookie";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import UserAudioProfilePage from "./pages/UserAudioProfile";

// Import the functions you need from the SDKs you need

type Mode = "dark" | "light";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState<Mode>("light");

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    let systemThemeMode: Mode = prefersDarkMode ? "dark" : "light";
    setThemeMode(systemThemeMode);
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode === "dark" ? "dark" : "light",
          primary: {
            main: themeMode === "dark" ? "#49a078" : "#1f3421",
            light: themeMode === "light" ? "#49a078" : "#1f3421",
          },
          secondary: {
            main: "#9cc5a1",
          },
        },
        typography: {
          fontFamily: ["Poppins-Light", "Poppins-Medium", "Inter"].join(","),
        },
      }),
    [themeMode],
  );

  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <ThemeProvider theme={theme}>
        <Header
          setThemeMode={() =>
            setThemeMode(themeMode == "light" ? "dark" : "light")
          }
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/stories" Component={StoryPage} />
            <Route path="/profile" Component={ProfilePage} />
            <Route path="/user/:userId" Component={UserAudioProfilePage} />
            <Route path="/signin" Component={SignInPage} />
            <Route path="/signup" Component={SignUpPage} />
            <Route path="/dashboard" Component={DashboardPage} />
            <Route path="*" Component={NotFoundPage} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
