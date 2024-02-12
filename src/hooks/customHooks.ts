import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

export function useCurrentUser(): CurrentUser | null {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [cookie] = useCookies(["token"]);
  useEffect(() => {
    // console.log("Cookie",cookie)
    if (cookie?.token) {
      let _user = jwtDecode(cookie.token) as CurrentUser;
      // console.log({ jwt: _user });
      setUser(_user);
    } else {
      setUser(null);
    }
  }, [cookie]);

  return user;
}
