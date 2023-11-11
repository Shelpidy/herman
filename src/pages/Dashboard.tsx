import React from "react";
import { Container, Tab, Tabs, useTheme } from "@mui/material";
import AccountIcon from "@mui/icons-material/AccountCircle";
import AudiosIcon from "@mui/icons-material/Headset";
import UsersIcon from "@mui/icons-material/People";
import Audios from "../components/Dashboard/Audios";
import Users from "../components/Dashboard/Users";
import Account from "../components/Dashboard/Account";

const DashboardPage: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const theme = useTheme();
  let themeMode = theme.palette.mode;
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Container
      style={{
        paddingTop: "12vh",
        paddingBottom: "5vh",
        backgroundColor: themeMode === "dark" ? "#000" : "#fff",
        width: "100vw",
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Accounts" icon={<AccountIcon />} />
        <Tab label="Audios" icon={<AudiosIcon />} />
        <Tab label="Users" icon={<UsersIcon />} />
      </Tabs>
      {currentTab === 0 && <Account />}
      {currentTab === 1 && <Audios />}
      {currentTab === 2 && <Users />}
    </Container>
  );
};

export default DashboardPage;
