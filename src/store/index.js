import { createStore, combineReducers } from "redux"

function style (state = {}, action) {
  const { 
    type,
    newData,
  } = action
  switch (type) {
    case 'initStyle':
      return { ...state, ...newData }
    default:
    return state
  }
}
function user (state = {}, action) {
  const { 
    type,
    data,
  } = action
  switch (type) {
    case 'saveUser':
      return { ...state, ...data }
    default:
    return state
  }
}

const store = createStore(
  combineReducers({
    style,
    user,
  })
)

export default store