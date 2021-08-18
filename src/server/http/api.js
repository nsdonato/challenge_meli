const axios = require('axios')

const { getCategory, getCategories, getPrice } = require('../helpers/helpers')

const Axios = axios.create({
  baseURL: process.env.API_URL
})

const authorData = {
  author: {
    name: 'Noelia',
    lastname: 'Donato'
  }
}

const getProducts = async query => {
  const { data } = await Axios.get(
    `sites/MLA/search?q=${encodeURIComponent(query)}&limit=${
      process.env.SEARCH_LIMIT
    }`
  )

  const { results, filters, available_filters: availableFilters } = data
  const categories = getCategory(filters, availableFilters)

  const items = (results || []).map(item => {
    const [amount, decimals] = getPrice(item.price)
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount,
        decimals
      },
      picture: item.thumbnail.replace(/-I/, '-L'),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      location: item.address.state_name
    }
  })

  return {
    ...authorData,
    categories,
    items
  }
}

const getProductById = async id => {
  const { data: product } = await Axios.get(`/items/${id}`)
  const {
    data: { plain_text: description }
  } = await Axios.get(`/items/${id}/description`)

  const {
    data: { path_from_root: path }
  } = await Axios.get(`/categories/${product.category_id}`)

  const [amount, decimals] = getPrice(product.price)

  return {
    ...authorData,
    categories: getCategories(path),
    item: {
      id: product.id,
      title: product.title,
      price: {
        currency: product.currency_id,
        amount,
        decimals
      },
      picture: product.thumbnail.replace(/-I/, '-L'),
      condition: product.condition,
      free_shipping: product.shipping.free_shipping,
      sold_quantity: product.sold_quantity,
      description: description
    }
  }
}

module.exports = {
  getProducts,
  getProductById
}
