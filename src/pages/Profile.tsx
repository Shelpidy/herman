import React from "react";
import AuthUserProfile from "../components/Dashboard/AuthUserProfile";
import Audios from "../components/Dashboard/Audios";

const ProfilePage: React.FC = () => {
  return (
    <div style={{ paddingTop: "12vh" }}>
      <AuthUserProfile />
      <Audios />
    </div>
  );
};

export default ProfilePage;
