import React from 'react'
import { Link } from 'react-router-dom'
import {
  getCurrency,
  formatPrice,
  formatDecimals,
  formatedPrice
} from '../helpers/helpers'

import '../assets/styles/Card.scss'
import free_shipping_icon from '../assets/images/shipping.png'

export const Card = ({ product }) => {
  const { id, title, price, picture, free_shipping, location } = product

  const _currency = getCurrency(price.currency)
  const _price = formatPrice(price.amount)
  const _decimals = formatDecimals(price.decimals)

  const dataPrice = {
    currency: _currency,
    amount: _price,
    decimals: _decimals
  }
  const currencyAndPrice = formatedPrice(dataPrice)

  return (
    <>
      <Link to={`/items/${id}`}>
        <div className='card'>
          <div className='card__img'>
            <img src={picture} alt={`Imagen de ${title}`} />
          </div>
          <div className='card-information'>
            <div className='card-information__header'>
              <span className='card-information__price_text--size-24'>
                {currencyAndPrice}{' '}
                {free_shipping && (
                  <img src={free_shipping_icon} alt='Imagen de envío gratis' />
                )}
              </span>
              <span className='card-information__location_text--size-12'>
                {location}
              </span>
            </div>
            <div className='card-information__description_text--size-18'>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
