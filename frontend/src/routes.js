import React from "react"
import { Switch } from "react-router-dom"
import MainLayoutRoute from "./components/MainLayoutRoute"
import AuthLayoutRoute from "./components/AuthLayoutRoute"
import TrackList from "./container/TrackList"
import Login from "./components/Login"
import Register from "./components/Register"

export default (
  <Switch>
    <MainLayoutRoute exact path="/" component={TrackList} />
    <AuthLayoutRoute path="/login" component={Login} />
    <AuthLayoutRoute path="/register" component={Register} />
    <MainLayoutRoute path="/recommend" component={() => "Рекоммендации"} />
    <MainLayoutRoute
      path="/genres"
      component={() => "Эта страница еще не добалена"}
    />
  </Switch>
)
