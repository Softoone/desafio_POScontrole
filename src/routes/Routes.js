import { BrowserRouter, Route, Switch } from "react-router-dom";
import QrCode from "../components/QrCode";
import Report from "../components/Report";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={QrCode} />
        <Route path="/report" component={Report} />
      </Switch>
    </BrowserRouter>
  );
};
