// const baseUrl = 'http://127.0.0.1:8080/api'
// const baseUrl = 'http://localhost:8080/api'
let baseUrl = '/api'
if (window.location.origin === 'http://localhost:8080') {
  baseUrl = `http://localhost:8088/api`
}

const url =  {
  login: `${baseUrl}/login`,
  list: `${baseUrl}/list`,
  detail: `${baseUrl}/detail`,
  editSave: `${baseUrl}/editSave`,
  del: `${baseUrl}/del`,
}

export default url