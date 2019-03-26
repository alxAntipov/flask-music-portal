import React from "react"
import ReactDOM from "react-dom"
import thunkMiddleware from "redux-thunk"
import logger from "redux-logger"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"
import "./styles/index.scss"
import App from "./components/App"

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
