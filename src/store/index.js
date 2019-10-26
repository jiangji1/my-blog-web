import { createStore, combineReducers } from "redux"

function style (state = {}, action) {
  const { type, style } = action
  switch (type) {
    case 'initStyle':
      return { ...state, ...style }
      break;
  
    default:
      break;
  }
  return state
}

const store = createStore(
  combineReducers({
    style,
  })
)

export default store