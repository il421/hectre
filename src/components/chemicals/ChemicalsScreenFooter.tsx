import { FunctionComponent, useContext } from "react";

import { NativeSelect, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { Context as ChemicalContext } from "../../contexts/ChemicalsContext";
import styles from "./styles/ChemicalsScreenFooter.module.css";

const useStyles = makeStyles(() => ({
  root: {
    "&::before": {
      borderBottomColor: "red"
    }
  }
}));

export const ChemicalsScreenFooter: FunctionComponent = () => {
  const {
    state: { show, page, chemicals },
    actions: { setPage, setShow }
  } = useContext(ChemicalContext);
  const classes = useStyles();
  const count =
    chemicals.length / show <= 0 ? 1 : Math.ceil(chemicals.length / show);

  return (
    <div className={styles.footer}>
      <Pagination
        count={count}
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={(evt, page) => {
          evt.preventDefault();
          setPage(page);
        }}
      />
      <div className={styles.showRecordText}>Show records</div>
      <NativeSelect
        className={classes.root}
        value={show}
        onChange={evt => {
          evt.preventDefault();
          setShow(Number(evt.target.value));
        }}
      >
        <option value={10}>10 rows</option>
        <option value={20}>20 rows</option>
        <option value={30}>30 rows</option>
      </NativeSelect>
    </div>
  );
};
