import { Route, Switch } from "react-router-dom";
import QrCode from "../components/QrCode";
import Report from "../components/Report";
import PrivateRoute from "./PrivateRoute";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={QrCode} />
      <PrivateRoute path="/report" component={Report} />
    </Switch>
  );
};
