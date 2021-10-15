import { ButtonHTMLAttributes, FunctionComponent } from "react";

import styles from "./LinkButton.module.css";

interface LinkButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {}

export const LinkButton: FunctionComponent<LinkButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  );
};
