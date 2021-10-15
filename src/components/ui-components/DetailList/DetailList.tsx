import { FunctionComponent } from "react";

import styles from "./DetailList.module.css";
import { DetailListProps } from "./DetailList.types";

export const DetailList: FunctionComponent<DetailListProps> = ({
  columns,
  items
}) => {
  return (
    <div className={styles.detailList}>
      {/* header */}
      <div className={styles.detailListHeader}>
        {columns.map((col, idx) => (
          <div
            style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
            className={styles.detailListItem}
            key={`head-${col.name + idx}`}
          >
            {col.name}
          </div>
        ))}
      </div>

      {/* rows */}
      <div className={styles.detailListBody}>
        {items.map((item, idx) => (
          <div key={`row-${idx}`} className={styles.detailListRow}>
            {columns.map((col, idx) => (
              <div
                style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
                className={styles.detailListItem}
                key={`row-col-${idx}`}
              >
                {col.onRender(item)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
