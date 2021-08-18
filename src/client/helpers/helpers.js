import * as CONST from './constants'

const getUrlParams = search => new URLSearchParams(search).get('search')

const getCurrency = currency =>
  currency === CONST.ARS ? CONST.SYMBOL_PESOS : CONST.SYMBOL_DOLAR

const formatPrice = amount =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

const formatDecimals = decimals =>
  decimals ? `0${decimals.toString(10)}`.slice(-2) : '00'

const getCondition = condition =>
  condition === CONST.CONDITION_NEW_EN
    ? CONST.CONDITION_NEW_ES
    : CONST.CONDITION_USED_ES

const formatedPrice = product => {
  let price = `${product.currency} ${product.amount}`

  if (parseInt(product.decimals) > 0) {
    price += `,${product.decimals}`
  }

  return price
}

const capitalize = word => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase()
}

export {
  getCurrency,
  formatPrice,
  formatDecimals,
  getCondition,
  getUrlParams,
  formatedPrice,
  capitalize
}
