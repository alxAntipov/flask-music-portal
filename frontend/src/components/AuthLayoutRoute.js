import React from "react"
import { Route, Redirect, NavLink } from "react-router-dom"
import Header from "./Header"

const AuthLayout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <main className="content">
        <div className="auth-wrap">
          <nav className="auth-nav">
            <NavLink
              className="auth-nav__item"
              activeClassName="auth-nav__item--active"
              to="/Login"
            >
              Вход
            </NavLink>
            <NavLink
              className="auth-nav__item"
              activeClassName="auth-nav__item--active"
              to="/register"
            >
              Регистрация
            </NavLink>
          </nav>
          {children}
        </div>
      </main>
    </div>
  )
}

const AuthLayoutRoute = ({ component: Component, ...rest }) => {
  return localStorage.getItem("auth") === null ? (
    <Route
      {...rest}
      render={matchProps => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  ) : (
    <Redirect to="/" />
  )
}

export default AuthLayoutRoute
