import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Celebrities from "./pages/Celebrities";

const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Celebrities}/>
      </Switch>
    </BrowserRouter>
  );
  
  export default Routes;