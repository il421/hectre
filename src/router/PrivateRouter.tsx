import React, { useContext } from "react";

import { Redirect, Route } from "react-router-dom";

import { Context as AuthorizationContext } from "../contexts/AuthorizationContext";
import { Routes } from "./routes";

interface PrivateRouterProps {
  component: React.ElementType;
  path: string;
}

export const PrivateRouter: React.FunctionComponent<PrivateRouterProps> = ({
  component: Component,
  ...rest
}) => {
  const {
    state: { code: isAuthorized }
  } = useContext(AuthorizationContext);

  return (
    <Route
      {...rest}
      component={(props: any) =>
        isAuthorized ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={Routes.chemicals} />
        )
      }
    />
  );
};
