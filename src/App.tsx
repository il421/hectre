import React from "react";

import styles from "./App.module.css";
import { Main, NavBar } from "./components/layouts";

function App() {
  return (
    <div className={styles.appWrapper}>
      <NavBar />
      <Main />
    </div>
  );
}

export default App;
