import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../utils/Auth";

const PrivateRoute = (props) =>
  isAuthenticated() ? <Route {...props} /> : <Redirect to="/" />;

export default PrivateRoute;
