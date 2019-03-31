import React from "react"
import { connect } from "react-redux"
import Header from "../components/Header"
import Player from "../components/Player"
import { currentUser } from "../action/session"

class AuthenticatedContainer extends React.Component {
  componentDidMount() {
    const { dispatch, session } = this.props
    const authToken = localStorage.getItem("auth")
    if (authToken && !session.login) {
      dispatch(currentUser())
    }
  }

  render() {
    const { children } = this.props

    return (
      <div className="App">
        <Header />
        <main className="content">{children}</main>
        <Player />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(AuthenticatedContainer)
