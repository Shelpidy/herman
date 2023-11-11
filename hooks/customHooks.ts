import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

declare type CurrentUser = {
  id: string | number;
  fullName: string;
  profileImage: string;
  role: "admin" | "user";
};

export function useCurrentUser(): CurrentUser | null {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [cookie, setCookie] = useCookies(["token"]);
  useEffect(() => {
    if (cookie?.token) {
    } else {
      setUser(null);
    }
  }, []);

  return user;
}
