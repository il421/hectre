import { FunctionComponent, useContext } from "react";

// import { faFilter } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectChangeEvent } from "@mui/material";

import { refDataToObj } from "../../common/utils";
import { Titles } from "../../common/variables";
import { Context as HarvestContext } from "../../contexts/HarvestContext";
import { Select } from "../ui-components/Select";
import styles from "./styles/Filters.module.css";

export const Filters: FunctionComponent = ({ ...props }) => {
  const {
    state: { orchards, filter },
    actions: { setFilter }
  } = useContext(HarvestContext);
  return (
    <div className={styles.filters}>
      {/*<LocalizationProvider>*/}
      {/*  <DateRangePicker*/}
      {/*    value={[null, null]}*/}
      {/*    startText="Check-in"*/}
      {/*    endText="Check-out"*/}
      {/*    onChange={newValue => {}}*/}
      {/*    renderInput={(startProps, endProps) => (*/}
      {/*      <>*/}
      {/*        <TextField {...startProps} />*/}
      {/*        <Box sx={{ mx: 2 }}> to </Box>*/}
      {/*        <TextField {...endProps} />*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*  />*/}
      {/*</LocalizationProvider>*/}
      {/*<Fragment {...props} />*/}
      {/*<FontAwesomeIcon icon={faFilter} />*/}
      <Select
        value={filter.orchard}
        onChange={(evt: SelectChangeEvent<string[]>) => {
          const value = evt.target.value as string[];
          setFilter("orchard", value.some(v => !v) ? [] : value);
        }}
        emptyValue="All"
        options={refDataToObj(orchards).map(opt => ({
          key: opt.id,
          text: opt.name
        }))}
        label={Titles.orchards}
      />
    </div>
  );
};
