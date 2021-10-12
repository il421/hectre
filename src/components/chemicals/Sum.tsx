import { FunctionComponent, useContext } from "react";

import { Context as ChemicalContext } from "../../contexts/ChemicalsContext";
import styles from "./styles/Sum.module.css";

export const Sum: FunctionComponent = () => {
  const {
    state: { chemicals }
  } = useContext(ChemicalContext);
  return (
    <span className={styles.sum}>
      There are {chemicals.length} chemicals in total
    </span>
  );
};
