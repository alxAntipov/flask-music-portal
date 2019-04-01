import React from "react"
import { Switch } from "react-router-dom"
import MainLayoutRoute from "./components/MainLayoutRoute"
import AuthLayoutRoute from "./components/AuthLayoutRoute"
import PrivateRoute from "./components/PrivateRoute"
import TrackList from "./container/TrackList"
import Login from "./components/Login"
import Register from "./components/Register"

export default (
  <Switch>
    <MainLayoutRoute exact path="/" component={TrackList} />
    <AuthLayoutRoute path="/login" component={Login} />
    <AuthLayoutRoute path="/register" component={Register} />
    <MainLayoutRoute path="/recommendaton" component={() => "Рекоммендации"} />
    <MainLayoutRoute
      path="/genres"
      component={() => "Эта страница еще не добалена"}
    />
    <PrivateRoute path="/mySong" component={TrackList} />
  </Switch>
)
