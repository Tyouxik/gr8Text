import React from "react";
import NavbarLoggedOut from "./NavbarLoggedOut";
import NavbarLoggedIn from "./NavbarLoggedIn";
import { useAuth } from "../../utils/auth-context";

export default function Navbar() {
  const { auth } = useAuth();

  return (
    <div>
      {!auth && <NavbarLoggedOut />}
      {auth && <NavbarLoggedIn />}
    </div>
  );
}
