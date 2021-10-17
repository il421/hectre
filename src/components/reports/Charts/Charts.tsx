import { FunctionComponent, useContext } from "react";

import { toLocalRound } from "../../../common/utils";
import { Titles } from "../../../common/variables";
import { Context as HarvestContext } from "../../../contexts/HarvestContext";
import {
  getPieData,
  getStatistics,
  getStatisticsTotal,
  StatisticsId,
  StatisticsType
} from "../utils";
import { Legend } from "./Legend";
import { Pie } from "./Pie";
import { Tooltip } from "./PieTooltipContent";
import styles from "./styles/Charts.module.css";

interface ChartsProps {
  type: StatisticsType;
}

export const Charts: FunctionComponent<ChartsProps> = ({ type }) => {
  const {
    state: { harvest, orchards, variety }
  } = useContext(HarvestContext);

  const isVarieties: boolean = type === StatisticsType.varieties;

  const statistics = getStatistics({
    harvest,
    refData: isVarieties ? variety : orchards,
    key: isVarieties ? "varietyId" : "orchardId"
  });

  const prodPieData = getPieData(statistics, "production");
  const costsPieData = getPieData(statistics, "cost");

  return (
    <div className={styles.charts}>
      <div className={styles.wrapper}>
        <Pie
          data={prodPieData}
          title={Titles.production}
          total={`${toLocalRound(
            getStatisticsTotal(statistics, StatisticsId.production)
          )} bins`}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          getTooltip={data => (
            <Tooltip
              data={{
                ...data,
                tooltip: `${data.title} ${toLocalRound(data.value)} bins`
              }}
            />
          )}
        />
        <Pie
          data={costsPieData}
          title={Titles.cost}
          total={`$${toLocalRound(
            getStatisticsTotal(statistics, StatisticsId.cost)
          )}`}
          label={({ dataEntry }) => `$${toLocalRound(dataEntry.value)}`}
          getTooltip={data => (
            <Tooltip
              data={{
                ...data,
                tooltip: `${data.title} $${toLocalRound(data.value)}`,
                dateRange: data.dateRange
              }}
            />
          )}
        />
      </div>

      <Legend statistics={statistics} />
    </div>
  );
};
