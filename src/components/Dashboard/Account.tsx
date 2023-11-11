import React from "react";
import AuthUserProfile from "./AuthUserProfile";
import UserRoleUpdateForm from "./UserRoleUpdateForm";

const Account: React.FC = () => {
  return (
    <div>
      <AuthUserProfile />
      <UserRoleUpdateForm />
    </div>
  );
};

export default Account;
