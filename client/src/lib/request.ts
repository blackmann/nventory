import axios from 'redaxios'

const request = axios.create({baseURL: 'http://localhost:3000/api'})

export default request
