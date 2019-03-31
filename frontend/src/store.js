import thunkMiddleware from "redux-thunk"
import logger from "redux-logger"
import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
)
