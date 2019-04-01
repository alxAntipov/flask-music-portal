import React from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import Authenticated from "../container/Authenticated"

function PrivateRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Authenticated>
            <Component {...props} />
          </Authenticated>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = state => ({
  isAuth: state.session.login
})

export default connect(mapStateToProps)(PrivateRoute)
