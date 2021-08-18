import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getUrlParams, capitalize } from '../helpers/helpers'
import * as CONST from '../helpers/constants'
import { apiServer } from '../http/api'
import { Breadcrumb } from '../components/Breadcrumb'
import { Card } from '../components/Card'
import { Loader } from '../components/Loader'
import { Error } from '../components/Error'
import { Helmet } from 'react-helmet'

import '../assets/styles/Results.scss'

export const Results = () => {
  const [data, setData] = useState({
    products: null,
    status: CONST.STATUS_PENDING,
    component: <Loader />,
    categories: null
  })
  const location = useLocation()
  const query = getUrlParams(location.search)

  useEffect(() => {
    const getProducts = async q => {
      apiServer
        .getProducts(q)
        .then(response => {
          setData({
            products: response.items,
            categories: response.categories,
            status: CONST.STATUS_SUCCESS
          })
        })
        .catch(err => {
          setData({ status: CONST.STATUS_ERROR })
        })
    }

    if (query) {
      getProducts(query)
    }
  }, [query])

  let component = null
  switch (data.status) {
    case CONST.STATUS_PENDING:
      component = <Loader />
      break
    case CONST.STATUS_ERROR:
      component = <Error />
      break
    default:
      const { products } = data
      component = (
        <>
          <Helmet>
            <title>{capitalize(query)} | Mercado Libre</title>
          </Helmet>
          <Breadcrumb categories={data.categories} />
          <div className='results-container'>
            {products
              ? products.map(product => (
                  <Card key={product.id} product={product} />
                ))
              : null}
          </div>
        </>
      )
      break
  }

  return component
}
