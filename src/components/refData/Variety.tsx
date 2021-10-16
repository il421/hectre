import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  useContext
} from "react";

import { Context as HarvestContext } from "../../contexts/HarvestContext";

interface VarietyProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  code: string;
}
export const Variety: FunctionComponent<VarietyProps> = ({ code, ...rest }) => {
  const {
    state: { variety }
  } = useContext(HarvestContext);

  return <span {...rest}>{variety.get(code)?.name}</span>;
};
