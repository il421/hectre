export type Column = {
  name: string;
  minWidth: number;
  maxWidth: number;
  onRender: (item: any) => JSX.Element | string;
};

export interface DetailListProps {
  items: object[];
  columns: Column[];
}
