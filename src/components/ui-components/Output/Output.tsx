import { FunctionComponent } from "react";

import styles from "./Output.module.css";
import { OutputProps, Titles } from "./Output.types";

export const Output: FunctionComponent<OutputProps> = ({
  title,
  output,
  withCurrency,
  currencyPrefix = "NZ",
  currencySign = "$"
}) => {
  return (
    <div className={styles.output}>
      <span>{Titles[title]}</span>
      <span>
        {withCurrency && <small>{currencyPrefix}</small>}
        {withCurrency ? `${currencySign}${output}` : output}
      </span>
    </div>
  );
};
