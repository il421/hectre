import { FunctionComponent } from "react";

import { Filters } from "./Filters";
import styles from "./styles/Statistics.module.css";
import { Totals } from "./Totals";

export const Statistics: FunctionComponent = () => {
  return (
    <div className={styles.statistics}>
      <Filters />
      <Totals />
    </div>
  );
};
