import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { SignUp } from "../action/register"
import { validateSignUp } from "../utils/auth"

class Register extends Component {
  state = {
    error: ""
  }
  handleSubmit = e => {
    const { dispatch } = this.props
    e.preventDefault()
    const data = {
      login: this.refs.login.value,
      password: this.refs.password.value,
      confirmPassword: this.refs.confirmPassword.value
    }
    const error = validateSignUp(data)
    this.setState({
      error: error
    })
    if (!error) {
      delete data.confirmPassword
      dispatch(SignUp(data))
    }
  }

  _renderErorr() {
    const { register } = this.props
    const error = this.state.error || register.error

    if (!error) {
      return false
    }
    return <div className="auth-form__error">{error}</div>
  }
  render() {
    const { session } = this.props
    if (session.login) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.handleSubmit} className="auth-form" method="post">
        <label className="auth-form__label" htmlFor="login">
          Логин
        </label>
        <input
          ref="login"
          className="auth-form__input"
          name="login"
          placeholder=""
        />
        <label className="auth-form__label" htmlFor="password">
          Пароль
        </label>
        <input
          ref="password"
          className="auth-form__input"
          type="password"
          name="password"
          placeholder=""
        />
        <label className="auth-form__label" htmlFor="confirmPassword">
          Повторите пароль
        </label>
        <input
          ref="confirmPassword"
          className="auth-form__input"
          type="password"
          name="confirmPassword"
          placeholder=""
        />
        {this._renderErorr()}
        <button className="auth-form__btn">Регистрация</button>
      </form>
    )
  }
}
const mapStateToProps = state => ({
  register: state.register,
  session: state.session
})

export default connect(mapStateToProps)(Register)
