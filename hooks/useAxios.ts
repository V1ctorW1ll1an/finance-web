import axios from 'axios'

export function useAxios() {
  // set default configs for axios
  const api = axios.create({
    baseURL: 'http://localhost:3001',
  })

  return { api }
}
