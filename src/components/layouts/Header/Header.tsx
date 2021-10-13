import { FunctionComponent } from "react";

import { Logo } from "../Logo/Logo";
import styles from "./Header.module.css";

export const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <a
        href={
          "https://hectre-code-challenge.auth.ap-southeast-2.amazoncognito.com/oauth2/authorize?response_type=code&client_id=57pfn3fjg8qfdd05qdgjeq1khd&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fcallback"
        }
      >
        Login
      </a>
    </header>
  );
};
