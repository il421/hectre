import { FunctionComponent } from "react";

import { Alert, CircularProgress } from "@mui/material";

import { Colours } from "../../common/variables";

interface ApiExceptionsHandlerProps {
  loading: boolean;
  error: Error | undefined;
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
