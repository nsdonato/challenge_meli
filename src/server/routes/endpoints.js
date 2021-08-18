const express = require('express')

const { getProducts, getProductById } = require('../http/api')
const { renderClient } = require('../config/appClient')

const endpoints = app => {
  const router = express.Router()
  app.use('/api/items', router)

  router.get('/', async (req, res, next) => {
    try {
      const resp = await getProducts(req.query.q)
      res.status(200).json(resp || {})
    } catch (error) {
      next(error)
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
      const resp = await getProductById(req.params.id)
      res.status(200).json(resp || {})
    } catch (error) {
      next(error)
    }
  })

  app.get('*', renderClient)

  app.use((err, req, res, next) => {
    if (err && err.response) {
      const { status, error, message } = err.response.data
      res.status(status).json({ status, error, message })
    } else {
      res.status(500).json({
        status: 500,
        error: 'Internal Server Error',
        message: err.code
      })
    }
  })
}

module.exports = endpoints
