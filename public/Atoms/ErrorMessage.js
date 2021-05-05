import React from "react";
import styles from "../../styles/errMessage.module.scss";

export default function ErrorMessage({ children }) {
  if (!children) return <></>;
  return <div className={styles.errMessage}>{children}</div>;
}
