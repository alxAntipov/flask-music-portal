import React from "react"
import { connect } from "react-redux"
import Header from "./Header"
import Player from "./Player"
import { currentUser } from "../action/session"

class MainLayout extends React.Component {
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
        <main className="content">
          <div className="container">{children}</div>
        </main>
        <Player />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  session: state.session
})

export default connect(mapStateToProps)(MainLayout)
