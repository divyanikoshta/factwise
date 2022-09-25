import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Celebrities from "./pages/Celebrities";

const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <Redirect to={"/celebrities"} />}/>
        <Route exact path="/celebrities" component={Celebrities}/>
      </Switch>
    </BrowserRouter>
  );
  
  export default Routes;