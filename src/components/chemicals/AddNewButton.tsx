import { FunctionComponent } from "react";

import styles from "./styles/AddNewButton.module.css";

export const AddNewButton: FunctionComponent = () => {
  return <button className={styles.button}>+ Add new chemicals</button>;
};
