import { FunctionComponent, useCallback, useContext, useEffect } from "react";

import { Context as HarvestContext } from "../../contexts/HarvestContext";
import { ApiExceptionsHandler } from "../ui-components/ApiExceptionsHandler";
import { Percentage } from "./Percentage";
import { Statistics } from "./Statistics";

export const ReportScreen: FunctionComponent = () => {
  const {
    actions: { getHarvest },
    state: { loading, error }
  } = useContext(HarvestContext);

  const fetch = useCallback(() => getHarvest(), []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <section>
      <ApiExceptionsHandler loading={loading} error={error}>
        <Statistics />
        <Percentage />
      </ApiExceptionsHandler>
    </section>
  );
};
