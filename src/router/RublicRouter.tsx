import React, { ElementType, FunctionComponent } from "react";

import { Route } from "react-router-dom";

interface PublicRouterProps {
  component: ElementType;
  path: string;
  exact: boolean;
}

export const PublicRouter: FunctionComponent<PublicRouterProps> = ({
  component: Component,
  ...rest
}) => <Route {...rest} component={(props: any) => <Component {...props} />} />;
