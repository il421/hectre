import { FunctionComponent } from "react";

import { Logo } from "../Logo/Logo";
import styles from "./Header.module.css";

export const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
};
