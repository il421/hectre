import { FunctionComponent } from "react";

import styles from "./Heading.module.css";

type Level = "main" | "second" | "third";

interface HeadingProps {
  level: Level;
}

export const Heading: FunctionComponent<HeadingProps> = ({
  level,
  children
}) => {
  switch (level) {
    case "main":
      return <h1 className={styles.h1}>{children}</h1>;
    case "second":
      return <h2 className={styles.h2}>{children}</h2>;
    default:
      return <h3 className={styles.h3}>{children}</h3>;
  }
};
