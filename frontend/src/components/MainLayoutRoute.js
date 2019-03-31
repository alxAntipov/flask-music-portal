import React from "react"
import { Route } from "react-router-dom"
import Authenticated from "../container/Authenticated"

const MainLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Authenticated>
          <Component {...matchProps} />
        </Authenticated>
      )}
    />
  )
}

export default MainLayoutRoute
