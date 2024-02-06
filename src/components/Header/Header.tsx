import React, { useEffect, useState } from "react";
import "./Header.css";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Avatar,
  Box,
  Link,
  Button,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import NavMenuBar from "../NavMenuBar/NavMenuBar";
import { useCurrentUser } from "../../hooks/customHooks";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  setThemeMode: () => void;
};

function Header({ setThemeMode }: HeaderProps) {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const theme = useTheme();
  const _currentUser = useCurrentUser();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const lessThanTab = useMediaQuery(theme.breakpoints.down("md"));
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  // const navigate = useNavigate()

  const handleSignout = () => {
    removeCookie("token");
    // navigate("/")
    window.location.reload();
  };

  useEffect(() => {
    setCurrentUser(_currentUser);
    // console.log({CurrentUser:_currentUser})
  }, [_currentUser]);

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar
        className="flex flex-row justify-between"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="blod">
            Herman Story
          </Typography>
        </Box>

        {!lessThanTab && (
          <Box>
            <Link
              color="primary.light"
              style={{ textDecoration: "none" }}
              className="px-5 py-2 rounded"
              href="/"
            >
              Home
            </Link>
            <Link
              color="primary.light"
              style={{ textDecoration: "none" }}
              className="px-5 py-2 rounded"
              href="/stories"
            >
              Audio Stories
            </Link>
          </Box>
        )}

        {!lessThanTab && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {currentUser && (
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.primary.light,
                  textTransform: "none",
                  fontFamily: "Poppins-Medium",
                }}
                onClick={handleSignout}
              >
                Signout
              </Button>
            )}
            {!currentUser && (
              <Link
                color="primary.light"
                style={{ textDecoration: "none" }}
                className="px-5 py-2 rounded"
                href="/signin"
              >
                Signin
              </Link>
            )}

            <Link
              color="primary.light"
              style={{ textDecoration: "none" }}
              className="px-5 py-2 rounded"
              href="/signup"
            >
              Signup
            </Link>

            <IconButton
              onClick={setThemeMode}
              sx={{ color: theme.palette.primary.light }}
            >
              {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
            {currentUser && currentUser.role === "admin" && (
              <Link
                style={{ textDecoration: "none" }}
                className=" px-10 py-2 rounded hover:text-gray-300"
                href="/dashboard"
              >
                <Avatar src="User" sx={{ width: 25, height: 25 }} />
              </Link>
            )}

            {currentUser && currentUser.role === "user" && (
              <Link
                style={{ textDecoration: "none" }}
                className=" px-10 py-2 rounded hover:text-gray-300"
                href="/profile"
              >
                <Avatar src="User" sx={{ width: 25, height: 25 }} />
              </Link>
            )}
          </Box>
        )}

        {lessThanTab && <NavMenuBar setThemeMode={setThemeMode} />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
