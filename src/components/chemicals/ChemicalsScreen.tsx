import { FunctionComponent, useContext, useEffect } from "react";

import { Context as ChemicalContext } from "../../contexts/ChemicalsContext";
import { Chemical } from "../../models/Chemical";
import { Column, DetailList } from "../ui-components/DetailList";
import { ChemicalsScreenFooter } from "./ChemicalsScreenFooter";
import { ChemicalsScreenHeader } from "./ChemicalsScreenHeader";
import styles from "./styles/ChemicalsScreen.module.css";

const ChemicalsScreen: FunctionComponent = () => {
  const {
    state: { chemicals, loading, error },
    fetchChemicals
  } = useContext(ChemicalContext);

  useEffect(() => {
    fetchChemicals();
  }, []);

  const columns: Column[] = [
    {
      name: "chemical type",
      maxWidth: 250,
      minWidth: 250,
      onRender: (item: Chemical) => item.chemicalType
    },
    {
      name: "activeingredient",
      maxWidth: 200,
      minWidth: 200,
      onRender: (item: Chemical) => item.activeIngredient
    },
    {
      name: "name",
      maxWidth: 200,
      minWidth: 200,
      onRender: (item: Chemical) => item.name
    },
    {
      name: "phi (days)",
      maxWidth: 200,
      minWidth: 200,
      onRender: (item: Chemical) => item.phi
    }
  ];

  return (
    <div className={styles.chemicals}>
      <ChemicalsScreenHeader />
      <DetailList items={chemicals} columns={columns} loading={loading} />
      <ChemicalsScreenFooter />
    </div>
  );
};

export default ChemicalsScreen;
