import { FunctionComponent } from "react";

import styles from "./NotFoundScreen.module.css";

export const NotFoundScreen: FunctionComponent = (): JSX.Element => (
  <div className={styles.notFound}>
    <span className={styles.notFoundCode}>404</span>
    <span>Sorry, such a page does not exist in the App.</span>
    <span>
      Try to find something interesting on the <b>navigation bar</b>.
    </span>
  </div>
);
