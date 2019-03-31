import React, { Component } from "react"
import { connect } from "react-redux"
import { logOut } from "../action/session"
class Profile extends Component {
  state = {
    isOpen: false
  }

  _handleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  logOut = () => {
    this.props.dispatch(logOut())
  }

  render() {
    const { login } = this.props
    const { isOpen } = this.state

    return (
      <div className="profile">
        <div onClick={this._handleOpen} className="profile__login">
          {login}
        </div>
        {isOpen ? (
          <div onClick={this.logOut} className="profile__menu">
            Выйти
          </div>
        ) : null}
      </div>
    )
  }
}

export default connect()(Profile)
