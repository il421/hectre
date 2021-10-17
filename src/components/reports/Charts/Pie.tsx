import { FunctionComponent, useState } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { LabelRenderFunction } from "react-minimal-pie-chart/types/commonTypes";
import ReactTooltip from "react-tooltip";

import { Colours } from "../../../common/variables";
import styles from "./styles/Pie.module.css";

export type PieData = {
  title: string;
  value: number;
  color: string;
  dateRange: string;
};

interface PieProps {
  title: string;
  total: string;
  data: PieData[];
  label?: LabelRenderFunction;
  getTooltip: (data: PieData) => JSX.Element;
}

export const Pie: FunctionComponent<PieProps> = ({
  title,
  total,
  data,
  label,
  getTooltip
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const TOOLTIP_ID = "chart";

  return (
    <div className={styles.pie} data-tip="" data-for={TOOLTIP_ID}>
      <PieChart
        animate
        label={label}
        labelStyle={{ fontSize: 3 }}
        style={{ height: 400 }}
        data={data}
        labelPosition={110}
        radius={30}
        onMouseOver={(evt, index) => {
          evt.preventDefault();
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
      />
      <ReactTooltip
        className={styles.tooltip}
        backgroundColor={Colours.white}
        border
        id={TOOLTIP_ID}
        getContent={() => (hovered !== null ? getTooltip(data[hovered]) : null)}
      />

      <span className={styles.title}>{title}</span>

      <span className={styles.total}>TOTAL: {total}</span>
    </div>
  );
};
