import { FunctionComponent } from "react";

import { Statistics } from "../utils";
import styles from "./styles/Legend.module.css";

interface LegendProps {
  statistics: Statistics[];
}
export const Legend: FunctionComponent<LegendProps> = ({ statistics }) => {
  return (
    <div className={styles.legend}>
      {statistics.map(stat => (
        <div className={styles.wrapper} key={stat.key}>
          <span
            className={styles.color}
            style={{ backgroundColor: stat.color }}
          />
          <span className={styles.title}>{stat.title}</span>
        </div>
      ))}
    </div>
  );
};
