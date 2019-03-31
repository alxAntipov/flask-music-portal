import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { SignIn } from "../action/session"
import { validateSignIn } from "../utils/auth"

class Login extends Component {
  state = {
    error: ""
  }
  handleSubmit = e => {
    const { dispatch } = this.props
    e.preventDefault()
    const data = {
      login: this.refs.login.value,
      password: this.refs.password.value
    }
    const error = validateSignIn(data)
    this.setState({
      error: error
    })
    if (!error) {
      dispatch(SignIn(data, this.props.history)).then(data => {
        console.log("hy ", data)

        this.props.history.push("/")
      })
    }
  }

  _renderErorr() {
    const { session } = this.props
    const error = this.state.error || session.error

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
          className="auth-form__input"
          ref="password"
          type="password"
          name="password"
          placeholder=""
        />
        {this._renderErorr()}
        <button className="auth-form__btn">Вход</button>
      </form>
    )
  }
}
const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(Login)
