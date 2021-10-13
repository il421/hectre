import { FunctionComponent, useContext } from "react";

import { NativeSelect, Pagination } from "@mui/material";

import { Context as ChemicalContext } from "../../contexts/ChemicalsContext";
import styles from "./styles/ChemicalsScreenFooter.module.css";

export const ChemicalsScreenFooter: FunctionComponent = () => {
  const {
    state: { show, page, chemicals },
    actions: { setPage, setShow }
  } = useContext(ChemicalContext);

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
      <NativeSelect
        value={show}
        onChange={evt => {
          evt.preventDefault();
          setShow(Number(evt.target.value));
        }}
      >
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </NativeSelect>
    </div>
  );
};
