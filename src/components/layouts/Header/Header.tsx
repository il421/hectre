import { FunctionComponent, useContext } from "react";

import { stringify } from "query-string";

import { baseURL as AuthBaseUrl } from "../../../api/auth";
import { Urls } from "../../../api/base";
import { config } from "../../../api/config";
import { Context as AuthorizationContext } from "../../../contexts/AuthorizationContext";
import { AuthorizationService } from "../../AuthorizationService";
import { LinkButton } from "../../ui-components/LinkButton/LinkButton";
import { Logo } from "../Logo/Logo";
import styles from "./Header.module.css";

export const Header: FunctionComponent = () => {
  const {
    state: { code },
    actions: { unauthorize }
  } = useContext(AuthorizationContext);

  const onClick = (): void => {
    if (code) {
      unauthorize();
    } else {
      const { grant_type, ...rest } = config;
      const query = stringify(rest);
      window.location.href = `${AuthBaseUrl}${Urls.authorize}?${query}`;
    }
  };

  return (
    <header className={styles.header}>
      <Logo />
      <LinkButton onClick={onClick}>{!code ? "Login" : "Logout"}</LinkButton>
      <AuthorizationService />
    </header>
  );
};
