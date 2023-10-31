import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import BlogPage from "./pages/Blog";
import { Dashboard } from "@mui/icons-material";
// import "primereact/primereact.all";
import { useMediaQuery } from "@mui/material";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AOS from "aos";

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
            main: themeMode === "dark" ? "#6da5c0" : "#05161a",
            light: themeMode === "light" ? "#6da5c0" : "#05161a",
          },
          secondary: {
            main: themeMode === "dark" ? "#0f969c" : "#072e33",
          },
        },
        typography: {
          fontFamily: ["Poppins-Medium", "Poppins-Light", "Inter"].join(","),
        },
      }),
    [themeMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Header
        setThemeMode={() =>
          setThemeMode(themeMode == "light" ? "dark" : "light")
        }
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/blog/:blogId" Component={BlogPage} />
          <Route path="/signin" Component={SignInPage} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
