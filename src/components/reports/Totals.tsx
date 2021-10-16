import { FunctionComponent, useContext } from "react";

import { toArray, toLocalRound } from "../../common/utils";
import { Context as HarvestContext } from "../../contexts/HarvestContext";
import { Output, OutputType } from "../ui-components/Output";
import styles from "./styles/Totals.module.css";
import { getTotals, Totals as TotalsType } from "./utils";

export const Totals: FunctionComponent = () => {
  const {
    state: { harvest }
  } = useContext(HarvestContext);

  const totals = toArray<TotalsType>(getTotals(harvest));

  return (
    <div className={styles.totals}>
      {totals.map(([title, output]: [OutputType, number]) => (
        <Output
          key={title}
          title={title}
          output={toLocalRound(output)}
          withCurrency={title === "rate" || title === "laborCosts"}
        />
      ))}
    </div>
  );
};
