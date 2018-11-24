import {combineReducers} from 'redux'
import user from './reducers/user'
import inventories from './reducers/inventories'

const rootReducer = combineReducers({
  user: user,
  inventories: inventories
  }
)

export default rootReducer