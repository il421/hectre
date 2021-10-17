import { Fragment, FunctionComponent, memo, useContext } from "react";

import { parse } from "query-string";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Context as AuthorizationContext } from "../contexts/AuthorizationContext";
import { Routes } from "../router";

/** This component is responsible for authorization. When we receive code in
 * callback url we store one in AuthorizationContext
 */
export const AuthorizationService: FunctionComponent = memo(props => {
  const {
    state: { code: stateCode },
    actions: { authorize }
  } = useContext(AuthorizationContext);
  const { location } = useHistory();

  const match = useRouteMatch({
    path: Routes.callback,
    strict: false
  });

  if (match?.isExact) {
    const { code } = parse(location.search);
    !stateCode && authorize(code as string);
  }

  return <Fragment {...props}>{}</Fragment>;
});
