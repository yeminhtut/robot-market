import { createStore, applyMiddleware } from 'redux'
import appReducer from './AppReducers.js'
import { rootEpic } from './middleware/epics'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()
const epicMiddleware = createEpicMiddleware()

let store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware, loggerMiddleware))
)

epicMiddleware.run(rootEpic)

export default store