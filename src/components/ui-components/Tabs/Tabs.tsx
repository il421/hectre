import { FunctionComponent, ReactNode, useState } from "react";

import { Tab, Tabs as MuiTabs } from "@mui/material";

import styles from "./Tabs.module.css";

type OptionTab = string;

interface TabsProps {
  children: (tab: OptionTab) => ReactNode;
  options: OptionTab[];
  defaultTab?: OptionTab;
}

export const Tabs: FunctionComponent<TabsProps> = ({
  children,
  options,
  defaultTab
}) => {
  const [tab, setTab] = useState<OptionTab>(defaultTab ?? options[0]);
  return (
    <div className={styles.tabs}>
      <MuiTabs
        sx={{ alignSelf: "baseline", minWidth: 225 }}
        textColor="secondary"
        indicatorColor="primary"
        value={tab}
        onChange={(evt, value) => setTab(value)}
      >
        {options.map((opt, idx) => (
          <Tab key={idx} value={opt} label={opt} />
        ))}
      </MuiTabs>

      <>{children(tab)}</>
    </div>
  );
};
