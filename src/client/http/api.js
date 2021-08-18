import axios from 'axios'

const get = url =>
  axios
    .get(url)
    .then(response => response.data)
    .catch(error => error)

const getProducts = query => get(`/api/items?q=${encodeURIComponent(query)}`)

const getProductById = id => get(`/api/items/${id}`)

export const apiServer = {
  getProducts,
  getProductById
}
