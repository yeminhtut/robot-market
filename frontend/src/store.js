import { createStore, applyMiddleware } from 'redux'
import appReducer from './AppReducers.js'
import { rootEpic } from './middleware/epics'
import { createEpicMiddleware } from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const epicMiddleware = createEpicMiddleware()

let store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
)

epicMiddleware.run(rootEpic)

export default store