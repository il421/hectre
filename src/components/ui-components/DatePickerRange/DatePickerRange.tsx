import { FunctionComponent } from "react";

import { DateTime } from "luxon";

import { DatePicker } from "@mui/lab";
import { TextField, TextFieldProps } from "@mui/material";
import { makeStyles } from "@mui/styles";

import styles from "./DatePickerRange.module.css";

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-input": {
      padding: "8.5px 14px"
    },
    "& .MuiInputLabel-root:not(.Mui-focused)": {
      top: "-6px"
    }
  }
});

type DateType = {
  value: DateTime | null;
  onChange: (value: DateTime | null) => void;
};

interface DatePickerRangeProps {
  to: DateType;
  from: DateType;
}

export const DatePickerRange: FunctionComponent<DatePickerRangeProps> = ({
  to,
  from
}) => {
  const classes = useStyles();
  const renderInput = (params: TextFieldProps) => <TextField {...params} />;

  return (
    <div className={styles.range}>
      <div className={classes.root}>
        <DatePicker
          className={"ilya"}
          label="Date from"
          value={from.value}
          maxDate={DateTime.now()}
          onChange={date => from.onChange(date)}
          renderInput={renderInput}
        />
      </div>
      <div className={classes.root}>
        <DatePicker
          label="Date to"
          value={to.value}
          maxDate={DateTime.now()}
          minDate={from.value}
          onChange={to.onChange}
          renderInput={renderInput}
        />
      </div>
    </div>
  );
};
