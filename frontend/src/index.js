import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import store from "./store"
import routes from "./routes"
import "./styles/index.scss"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={route.layout}
            path={route.path}
            exact={route.exact}
            render={match => (
              <route.layout>
                <route.component {...match} {...route.props} />
              </route.layout>
            )}
          />
        ))}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
)
