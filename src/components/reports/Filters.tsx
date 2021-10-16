import { Fragment, FunctionComponent } from "react";

import styles from "./styles/Filters.module.css";

export const Filters: FunctionComponent = ({ ...props }) => {
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
      <Fragment {...props} />
    </div>
  );
};
