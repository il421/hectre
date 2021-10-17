import { FunctionComponent } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
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
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="multiple-name-label" sx={{ textTransform: "capitalize" }}>
        {label}
      </InputLabel>
      <MuiSelect
        size="small"
        labelId="multiple-name-label"
        multiple={multiple}
        value={value}
        input={<OutlinedInput label={label} />}
        onChange={onChange}
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
      </MuiSelect>
    </FormControl>
  );
};
