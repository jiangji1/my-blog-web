export const inintStoreStyle = (newData) => {
  return {
    type: 'initStyle',
    newData
  }
}
export const saveUser = (data) => {
  return {
    type: 'saveUser',
    data
  }
}