import { FunctionComponent } from "react";

import { Titles } from "../../common/variables";
import { Heading } from "../ui-components/Heading";
import { Tabs } from "../ui-components/Tabs";
import { Charts } from "./Charts";
import styles from "./styles/Percentage.module.css";
import { StatisticsType } from "./utils";

export const Percentage: FunctionComponent = () => {
  return (
    <div className={styles.percentage}>
      <Heading level="main">{Titles.percentage}</Heading>
      <Tabs options={[StatisticsType.varieties, StatisticsType.orchards]}>
        {(type: StatisticsType) => <Charts type={type} />}
      </Tabs>
    </div>
  );
};
