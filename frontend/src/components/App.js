import React, { Component } from "react"
import Player from "./Player"
import TrackList from "../container/TrackList"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="head">
          <div className="content">
            <nav>
              <ul className="nav-menu">
                <li className="nav-menu__item">Главная</li>
                <li className="nav-menu__item">Рекомендации</li>
                <li className="nav-menu__item">Жанры</li>
              </ul>
            </nav>
          </div>
        </header>
        <main className="content">
          <TrackList />
        </main>
        <Player />
      </div>
    )
  }
}

export default App
