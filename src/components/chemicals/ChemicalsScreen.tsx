import { FunctionComponent, useCallback, useContext, useEffect } from "react";

import { Alert, CircularProgress } from "@mui/material";

import { Colours } from "../../common/variables";
import { Context as ChemicalContext } from "../../contexts/ChemicalsContext";
import { Chemical } from "../../models/Chemical";
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
      {loading && (
        <CircularProgress
          sx={{ marginTop: 20, alignSelf: "center", color: Colours.base }}
        />
      )}

      {error && <Alert severity="error">{error.message}</Alert>}

      {!loading && (
        <>
          <div className={styles.listWrapper}>
            <DetailList
              items={filteredChemicals(chemicals, show, page)}
              columns={columns}
            />
          </div>
          <ChemicalsScreenFooter />
        </>
      )}
    </section>
  );
};

export default ChemicalsScreen;
