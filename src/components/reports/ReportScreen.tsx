import { FunctionComponent, useContext, useEffect } from "react";

import { Context as HarvestContext } from "../../contexts/HarvestContext";
import { Percentage } from "./Percentage";
import { Statistics } from "./Statistics";

export const ReportScreen: FunctionComponent = () => {
  const {
    actions: { getHarvest }
  } = useContext(HarvestContext);

  useEffect(() => {
    getHarvest();
  }, []);
  return (
    <section>
      <Statistics />
      <Percentage />
    </section>
  );
};
