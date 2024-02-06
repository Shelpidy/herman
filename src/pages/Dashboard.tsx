import { Add } from "@mui/icons-material";
import AccountIcon from "@mui/icons-material/AccountCircle";
import AudiosIcon from "@mui/icons-material/Headset";
import { Container, Tab, Tabs, useTheme } from "@mui/material";
import React from "react";
import Account from "../components/Dashboard/Account";
import AudioAdminUpload from "../components/New/AudioAdminUploadForm";
import AudioList from "../components/New/NewAudioList";

const DashboardPage: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState(0);
  const theme = useTheme();
  let themeMode = theme.palette.mode;
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Container
      style={{
        paddingTop: "12vh",
        paddingBottom: "5vh",
        // paddingLeft:"10px",
        // paddingRight:"10px",
        backgroundColor: themeMode === "dark" ? "#000" : "auto",
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
        {/* <Tab label="Users" icon={<UsersIcon />} /> */}
        <Tab label="Add Audio" icon={<Add />} />
      </Tabs>
      {currentTab === 0 && <Account />}
      {currentTab === 1 && <AudioList />}
      {currentTab === 2 && <AudioAdminUpload />}
    </Container>
  );
};

export default DashboardPage;
