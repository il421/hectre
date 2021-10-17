import { FunctionComponent, useContext } from "react";

// import { faFilter } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectChangeEvent } from "@mui/material";

import { capitalizeFirstLetter, refDataToObj } from "../../common/utils";
import { Titles } from "../../common/variables";
import { Context as HarvestContext } from "../../contexts/HarvestContext";
import { DatePickerRange } from "../ui-components/DatePickerRange";
import { Select } from "../ui-components/Select";
import styles from "./styles/Filters.module.css";

export const Filters: FunctionComponent = ({ ...props }) => {
  const {
    state: { orchards, filter },
    actions: { setFilter }
  } = useContext(HarvestContext);
  const { to, from, orchard } = filter;
  return (
    <div className={styles.filters}>
      <DatePickerRange
        to={{
          value: to,
          onChange: date => {
            setFilter("to", date);
          }
        }}
        from={{
          value: from,
          onChange: date => {
            setFilter("from", date);
          }
        }}
      />
      <Select
        value={orchard}
        onChange={(evt: SelectChangeEvent<string[]>) => {
          const value = evt.target.value as string[];
          setFilter("orchard", value.some(v => !v) ? [] : value);
        }}
        emptyValue="All"
        options={refDataToObj(orchards).map(opt => ({
          key: opt.id,
          text: opt.name
        }))}
        label={capitalizeFirstLetter(Titles.orchards)}
      />
    </div>
  );
};
