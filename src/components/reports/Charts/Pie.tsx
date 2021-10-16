import { FunctionComponent, useState } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { LabelRenderFunction } from "react-minimal-pie-chart/types/commonTypes";
import ReactTooltip from "react-tooltip";

import { Colours } from "../../../common/variables";
import styles from "./styles/Pie.module.css";

type Data = { title: string; value: number; color: string };

interface PieProps {
  title: string;
  total: string;
  data: Data[];
  label?: LabelRenderFunction;
  getTooltip: (data: Data) => JSX.Element;
}

export const Pie: FunctionComponent<PieProps> = ({
  title,
  total,
  data,
  label,
  getTooltip
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={styles.pie} data-tip="" data-for="chart">
      <PieChart
        animate
        label={label}
        labelStyle={{ fontSize: 5, color: Colours.white }}
        style={{ height: 200 }}
        data={data}
        labelPosition={85}
        onMouseOver={(evt, index) => {
          evt.preventDefault();
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
      />
      <ReactTooltip
        backgroundColor={Colours.white}
        borderColor={Colours.naturalDark}
        border
        id="chart"
        getContent={() => (hovered !== null ? getTooltip(data[hovered]) : null)}
      />

      <span className={styles.title}>{title}</span>

      <span className={styles.total}>TOTAL: {total}</span>
    </div>
  );
};
