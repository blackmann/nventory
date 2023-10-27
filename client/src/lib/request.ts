import axios from 'redaxios'

const authJson = localStorage.getItem('auth')
const headers: Record<string, string> = {}

if (authJson) {
  try {
    const auth = JSON.parse(authJson)
    headers['Authorization'] = `Bearer ${auth.auth.token}`
  } catch {}
}

const request = axios.create({ baseURL: 'http://localhost:3000/api', headers })

export default request
