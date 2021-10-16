import {
  DetailedHTMLProps,
  FunctionComponent,
  HTMLAttributes,
  useContext
} from "react";

import { Context as HarvestContext } from "../../contexts/HarvestContext";

interface OrchardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  code: string;
}
export const Orchard: FunctionComponent<OrchardProps> = ({ code, ...rest }) => {
  const {
    state: { orchards }
  } = useContext(HarvestContext);

  return <span {...rest}>{orchards.get(code)?.name}</span>;
};
