import React, { Component } from "react"
import { connect } from "react-redux"

export class PlayerContainer extends Component {
  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  player: state.player,
  playlist: state.playlist
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerContainer)
