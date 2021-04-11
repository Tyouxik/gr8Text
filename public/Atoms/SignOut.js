import React from "react";
import styles from "../../styles/buttons.module.scss";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/auth-context";

export default function SignOut() {
  const router = useRouter();
  const { signOut } = useAuth();

  const signoutAccount = () => {
    signOut();
    router.push("/");
  };

  return (
    <button className={styles.signoutBtn} onClick={signoutAccount}>
      Sign out
    </button>
  );
}
