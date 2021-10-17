import { FunctionComponent, useCallback, useContext, useEffect } from "react";

import { Context as ChemicalContext } from "../../contexts/ChemicalsContext";
import { Chemical } from "../../models/Chemical";
import { ApiExceptionsHandler } from "../ui-components/ApiExceptionsHandler";
import { Column, DetailList } from "../ui-components/DetailList";
import { ChemicalsScreenFooter } from "./ChemicalsScreenFooter";
import { ChemicalsScreenHeader } from "./ChemicalsScreenHeader";
import styles from "./styles/ChemicalsScreen.module.css";
import { filteredChemicals } from "./utils";

const ChemicalsScreen: FunctionComponent = () => {
  const {
    state: { chemicals, loading, show, page, error },
    actions: { fetchChemicals }
  } = useContext(ChemicalContext);

  const fetch = useCallback(() => fetchChemicals(), []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const columns: Column[] = [
    {
      name: "chemical type",
      maxWidth: 250,
      minWidth: 250,
      onRender: (item: Chemical) => item.chemicalType
    },
    {
      name: "activeingredient",
      maxWidth: 150,
      minWidth: 150,
      onRender: (item: Chemical) => item.activeIngredient
    },
    {
      name: "name",
      maxWidth: 150,
      minWidth: 150,
      onRender: (item: Chemical) => item.name
    },
    {
      name: "phi (days)",
      maxWidth: 150,
      minWidth: 150,
      onRender: (item: Chemical) => item.phi
    }
  ];

  return (
    <section className={styles.chemicals}>
      <ChemicalsScreenHeader />
      <ApiExceptionsHandler loading={loading} error={error}>
        <div className={styles.listWrapper}>
          <DetailList
            items={filteredChemicals(chemicals, show, page)}
            columns={columns}
          />
        </div>
        <ChemicalsScreenFooter />
      </ApiExceptionsHandler>
    </section>
  );
};

export default ChemicalsScreen;
