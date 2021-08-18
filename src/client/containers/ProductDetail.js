import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiServer } from '../http/api'
import {
  getCurrency,
  formatPrice,
  formatDecimals,
  getCondition,
  formatedPrice
} from '../helpers/helpers'
import * as CONST from '../helpers/constants'
import { Breadcrumb } from '../components/Breadcrumb'
import { Loader } from '../components/Loader'
import { Error } from '../components/Error'
import '../assets/styles/ProductDetail.scss'
import { Helmet } from 'react-helmet'

export const ProductDetail = () => {
  const { id } = useParams()

  const [data, setData] = useState({
    product: null,
    status: CONST.STATUS_PENDING,
    component: <Loader />,
    categories: null
  })

  useEffect(() => {
    const getProductById = async _id => {
      apiServer
        .getProductById(_id)
        .then(response => {
          const { item: _product, categories } = response
          if (_product) {
            const newProduct = {
              title: _product.title,
              currency: getCurrency(_product.price.currency),
              amount: formatPrice(_product.price.amount),
              decimals: formatDecimals(_product.price.decimals),
              picture: _product.picture,
              condition: getCondition(_product.condition),
              sold_quantity: _product.sold_quantity,
              description: _product.description
            }

            setData({ product: newProduct || {}, categories: categories })
          }
        })
        .catch(err => {
          setData({ status: 'error' })
        })
    }

    getProductById(id)
  }, [id])

  let component = null
  switch (data.status) {
    case CONST.STATUS_PENDING:
      component = <Loader />
      break
    case CONST.STATUS_ERROR:
      component = <Error />
      break
    default:
      const { product } = data

      let price = formatedPrice(product)

      const hasSold_quantity =
        product.sold_quantity > 0 ? `- ${product.sold_quantity} vendidos` : null

      component = (
        <>
          <Helmet>
            <title>{product.title} | Mercado Libre</title>
          </Helmet>
          <Breadcrumb categories={data.categories} />
          <div className='product-container'>
            <div className='product-container__information'>
              <img src={product.picture} alt={`Imagen de ${product.title}`} />
              <span>Descripción del producto</span>
              <p>{product.description}</p>
            </div>
            <div className='product-container__resume'>
              <span className='product-container__resume-sales'>
                {product.condition} {hasSold_quantity}
              </span>
              <p>{product.title}</p>
              <span className='product-container__resume-price_text--size-46'>
                {price}
              </span>
              <button className='product-container__resume_btn'>Comprar</button>
            </div>
          </div>
        </>
      )
      break
  }
  return component
}
