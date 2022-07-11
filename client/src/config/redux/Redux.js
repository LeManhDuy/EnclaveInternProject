import { legacy_createStore as createStore, combineReducers} from 'redux'
import dataLoginReducer from "./reducer/DataLoginReducer"
// import isOpenLoginReducer from "./reducer/isOpenLoginReducer"
// import topicsReducer from "./reducer/TopicsReducer"

const reducer = combineReducers({
  dataLogin: dataLoginReducer,
//   isOpenLogin: isOpenLoginReducer,
//   topics: topicsReducer,
})

const store = createStore(reducer)

export default store
