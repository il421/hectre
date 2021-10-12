import React, { FunctionComponent } from "react";

import AppRouter from "../../router/AppRouter";
import { Header } from "./Header/Header";
import styles from "./Main.module.css";

export const Main: FunctionComponent = () => {
  return (
    <div className={styles.mainWrapper}>
      <Header />

      <main className={styles.main}>
        <AppRouter />
      </main>
    </div>
  );
};
