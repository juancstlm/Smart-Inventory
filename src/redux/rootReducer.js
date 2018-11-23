import {combineReducers} from 'redux'
import user from './reducers/user'

const rootReducer = combineReducers({
  user: user,
  }
)

export default rootReducer