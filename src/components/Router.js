import {BrowserRouter, Route, Switch} from 'react-router-dom'

import About from "../views/About"
import NoMatch from "../views/404"
import Welcome from "../views/Welcome"

import Nav from "./bootstrap/Nav"
import WorkshopList from "../views/workshop/WorkshopList"
import DrinkList from "../views/drink/DrinkList"
import DrinkDetails from "../views/drink/DrinkDetails"
import WorkshopDetails from "../views/workshop/WorkshopDetails"
import Login from "../views/auth/Login"
import Logout from "../views/auth/Logout";
import Profile from "../views/user/Profile";

const Router = props => {
  return (
    <BrowserRouter>
      <Nav login={props.login}/>
      <Switch>
        <Route exact path="/">
          <Welcome/>
        </Route>
        <Route exact path="/about">
          <About/>
        </Route>
        <Route exact path="/profile">
          <Profile/>
        </Route>
        <Route exact path="/login">
          <Login monitorSessionChange={props.monitorSessionChange} login={props.login}/>
        </Route>
        <Route exact path="/workshops">
          <WorkshopList/>
        </Route>
        <Route path="/workshop/:id">
          <WorkshopDetails login={props.login}/>
        </Route>
        <Route exact path="/drinks">
          <DrinkList/>
        </Route>
        <Route exact path="/logout">
          <Logout monitorSessionChange={props.monitorSessionChange}/>
        </Route>
        <Route path="/drink/:id">
          <DrinkDetails login={props.login}/>
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router