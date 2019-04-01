import React, { Component } from "react"
import { connect } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import Profile from "./Profile"
class Header extends Component {
  render() {
    const { session } = this.props

    return (
      <header className="header">
        <div className="content">
          <div className="header__wrap">
            <nav className="nav-menu">
              <NavLink
                exact
                className="nav-menu__item"
                activeClassName="nav-menu__item--active"
                to="/"
              >
                Главная
              </NavLink>
              <NavLink
                className="nav-menu__item"
                activeClassName="nav-menu__item--active"
                to="/recommendaton"
              >
                Рекомендации
              </NavLink>
              <NavLink
                className="nav-menu__item"
                activeClassName="nav-menu__item--active"
                to="/genres"
              >
                Жанры
              </NavLink>
            </nav>
            {localStorage.getItem("auth") ? (
              <>
                <NavLink
                  className="nav-menu__item"
                  activeClassName="nav-menu__item--active"
                  to="/mySong"
                >
                  Моя музыка
                </NavLink>
                <Profile login={session.login} />
              </>
            ) : (
              <nav className="nav-menu">
                <Link className="nav-menu__item" to="/login">
                  Авторизация
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>
    )
  }
}
const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(Header)
