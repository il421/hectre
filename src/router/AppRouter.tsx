import { FunctionComponent } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import ChemicalsScreen from "../components/chemicals/ChemicalsScreen";
import { NotFoundScreen } from "../components/layouts";
import { ReportScreen } from "../components/reports/ReportScreen";
import { PrivateRouter } from "./PrivateRouter";
import { Routes } from "./routes";
import { PublicRouter } from "./RublicRouter";

const AppRouter: FunctionComponent = (): JSX.Element => {
  return (
    <Switch>
      <Redirect exact={true} from={Routes.base} to={Routes.chemicals} />
      <Redirect from={Routes.callback} to={Routes.chemicals} />

      <PublicRouter
        path={Routes.chemicals}
        component={ChemicalsScreen}
        exact={false}
      />

      <PrivateRouter path={Routes.reports} component={ReportScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};

export default AppRouter;
