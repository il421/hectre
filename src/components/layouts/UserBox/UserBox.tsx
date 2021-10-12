import { FunctionComponent } from "react";

import { Link } from "react-router-dom";

import logo from "../../../logo.png";
import { Routes } from "../../../router";
import styles from "./Logo.module.css";

export const UserBox: FunctionComponent = () => {
  return (
    <Link className={styles.logo} to={Routes.chemicals}>
      <img src={logo} height={30} width={73} alt="Company logo" />
    </Link>
  );
};
