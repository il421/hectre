import { FunctionComponent, useCallback, useContext, useEffect } from "react";

import { Context as HarvestContext } from "../../contexts/HarvestContext";
import { ApiExceptionsHandler } from "../ui-components/ApiExceptionsHandler";
import { Percentage } from "./Percentage";
import { Statistics } from "./Statistics";
import styles from "./styles/ReportScreen.module.css";

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
    <section className={styles.report}>
      <ApiExceptionsHandler loading={loading} error={error}>
        <Statistics />
        <Percentage />
      </ApiExceptionsHandler>
    </section>
  );
};
