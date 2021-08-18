import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

beforeEach(() => {
  jest.resetModules()
})

const defaultProps = {
  id: 1,
  title: 'Test',
  price: {
    currency: 'ARS',
    amount: 10,
    decimals: null
  },
  picture: 'some.png',
  free_shipping: false,
  location: 'CABA'
}

describe('Test Card component', () => {
  test('initial render of Card', () => {
    render(
      <Router>
        <Card product={{ ...defaultProps }} />
      </Router>
    )

    expect(screen.getByText('$ 10')).toBeInTheDocument()
    expect(screen.getByText('CABA')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByAltText('Imagen de Test')).toBeInTheDocument()
  })

  test('Render product with free shipping', () => {
    defaultProps.free_shipping = true
    render(
      <Router>
        <Card product={{ ...defaultProps }} />
      </Router>
    )

    expect(screen.getByAltText('Imagen de envío gratis')).toBeInTheDocument()
  })
})
