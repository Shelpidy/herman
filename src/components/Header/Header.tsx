import React from "react";
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
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import NavMenuBar from "../NavMenuBar/NavMenuBar";

type HeaderProps = {
  setThemeMode: () => void;
};

function Header({ setThemeMode }: HeaderProps) {
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const theme = useTheme();
  const lessThanTab = useMediaQuery(theme.breakpoints.down("md"));
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
            Marah
          </Typography>
        </Box>

        {!lessThanTab && (
          <Tabs
            centered
            className="md:hidden"
            value={activeTab}
            onChange={(e, value) => setActiveTab(value)}
            indicatorColor="primary"
          >
            <Tab
              sx={{ color: theme.palette.primary.light }}
              href="#"
              label="Home"
            ></Tab>
            <Tab
              sx={{ color: theme.palette.primary.light }}
              href="#about"
              label="About"
            ></Tab>
            <Tab
              sx={{ color: theme.palette.primary.light }}
              href="#blogs"
              label="Blogs"
            ></Tab>
            <Tab
              sx={{ color: theme.palette.primary.light }}
              href="#gallery"
              label="Gallery"
            ></Tab>
            <Tab
              sx={{ color: theme.palette.primary.light }}
              href="#contact"
              label="Contact"
            ></Tab>
          </Tabs>
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
            {isLogin && (
              <Link
                color="primary.light"
                style={{ textDecoration: "none" }}
                className="px-10 py-2 rounded"
                href="/signout"
              >
                Signout
              </Link>
            )}
            <IconButton
              onClick={setThemeMode}
              sx={{ color: theme.palette.primary.light }}
            >
              {theme.palette.mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
            {isLogin && (
              <a
                style={{ textDecoration: "none" }}
                className=" px-10 py-2 rounded hover:text-gray-300"
                href="/dashboard"
              >
                <Avatar src="User" sx={{ width: 25, height: 25 }} />
              </a>
            )}
          </Box>
        )}

        {lessThanTab && <NavMenuBar setThemeMode={setThemeMode} />}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
