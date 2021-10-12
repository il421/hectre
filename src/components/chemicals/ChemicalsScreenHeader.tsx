import { FunctionComponent } from "react";

import { Titles } from "../../common/variables";
import { Heading } from "../ui-components/Heading";
import { AddNewButton } from "./AddNewButton";
import styles from "./styles/ChemicalsScreenHeader.module.css";
import { Sum } from "./Sum";

export const ChemicalsScreenHeader: FunctionComponent = () => {
  return (
    <div className={styles.heading}>
      <div className={styles.headingWrapper}>
        <Heading level="main">{Titles.mainChemical}</Heading>
        <Sum />
      </div>

      <AddNewButton />
    </div>
  );
};
