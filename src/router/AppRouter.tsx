import { FunctionComponent } from "react";

import { Redirect, Switch } from "react-router-dom";

import ChemicalsScreen from "../components/chemicals/ChemicalsScreen";
import { Routes } from "./routes";
import { PublicRouter } from "./RublicRouter";

const AppRouter: FunctionComponent = (): JSX.Element => (
  <Switch>
    <Redirect exact={true} from={Routes.base} to={Routes.chemicals} />

    <PublicRouter
      path={Routes.chemicals}
      component={ChemicalsScreen}
      exact={false}
    />

    {/*<PrivateRouter path={PathNames.base} component={DashboardPage} />*/}
    {/*<Route component={NotFoundPage} />*/}
  </Switch>
);

export default AppRouter;
