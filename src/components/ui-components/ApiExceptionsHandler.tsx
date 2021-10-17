import { FunctionComponent, useContext } from "react";

import { AxiosError } from "axios";

import { Alert, CircularProgress } from "@mui/material";

import { Colours } from "../../common/variables";
import { Context as AuthorizationContext } from "../../contexts/AuthorizationContext";

interface ApiExceptionsHandlerProps {
  loading: boolean;
  error: AxiosError | undefined;
}

/**
 * Designed to handle api delay and exceptions
 * @param loading
 * @param error
 * @param children
 * @constructor
 */
export const ApiExceptionsHandler: FunctionComponent<ApiExceptionsHandlerProps> = ({
  loading,
  error,
  children
}) => {
  const {
    actions: { unauthorize }
  } = useContext(AuthorizationContext);

  // logout user if token is expired
  if (error && error.response && error.response.status === 401) {
    unauthorize();
    return null;
  }

  return (
    <>
      {loading && (
        <CircularProgress
          sx={{ marginTop: 20, alignSelf: "center", color: Colours.base }}
        />
      )}
      {error && <Alert severity="error">{error.message}</Alert>}
      {!loading && !error && children}
    </>
  );
};
