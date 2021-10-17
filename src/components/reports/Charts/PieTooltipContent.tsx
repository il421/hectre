import { FunctionComponent } from "react";

import { DataEntry } from "react-minimal-pie-chart/types/commonTypes";

import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles/PieTooltipContent.module.css";

interface TooltipProps {
  data: DataEntry & { tooltip: string; dateRange: string };
}
export const Tooltip: FunctionComponent<TooltipProps> = ({ data }) => {
  return (
    <div className={styles.tooltip}>
      <div className={styles.date}>
        <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
        <div>{data.dateRange}</div>
      </div>
      <div>{data.tooltip}</div>
    </div>
  );
};
