import { FunctionComponent } from "react";

import {
  MenuItem,
  SelectProps as MuiSelectProps,
  TextField,
  Theme,
  useTheme
} from "@mui/material";

//
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// };

const getStyles = (name: string, value: string[], theme: Theme) => {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
};

type Option = {
  key: string;
  text: string;
};

interface SelectProps
  extends Pick<MuiSelectProps, "value" | "onChange" | "multiple"> {
  label: string;
  options: Option[];
  value: string[];
  emptyValue?: string;
}

export const Select: FunctionComponent<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  emptyValue,
  multiple = true
}) => {
  const theme = useTheme();

  return (
    <TextField
      size="small"
      label={label}
      variant="outlined"
      style={{ width: 200 }}
      select
      SelectProps={{
        value,
        onChange,
        multiple
      }}
    >
      {emptyValue && (
        <MenuItem value="">
          <em>{emptyValue}</em>
        </MenuItem>
      )}

      {options.map(({ key, text }) => (
        <MenuItem key={key} value={key} style={getStyles(text, value, theme)}>
          {text}
        </MenuItem>
      ))}
    </TextField>
  );
};
