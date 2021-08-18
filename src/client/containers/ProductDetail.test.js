import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { ProductDetail } from './ProductDetail'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
const mockAxios = new MockAdapter(axios)

beforeEach(() => {
  jest.resetModules()
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1'
  })
}))

describe('Test ProductDetail component', () => {
  jest.setTimeout(10000)

  test('initial render of ProductDetail', async () => {
    mockAxios.onGet('/api/items/1').reply(200, {
      author: {
        name: 'Noelia',
        lastname: 'Donato'
      },
      categories: ['Remeras'],
      item: {
        id: 1,
        title: 'Test',
        price: {
          currency: 'ARS',
          amount: 10,
          decimals: null
        },
        picture: 'some.png',
        condition: 'new',
        free_shipping: false,
        sold_quantity: 1,
        description: 'Remera negra'
      }
    })

    render(
      <Router>
        <ProductDetail />
      </Router>
    )

    await waitFor(() => {
      expect(screen.getByText('Descripción del producto')).toBeInTheDocument()
      expect(screen.getByText('Remera negra')).toBeInTheDocument()
      expect(screen.getByText('Nuevo - 1 vendidos')).toBeInTheDocument()
      expect(screen.getByText('Test')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Comprar' })
      ).toBeInTheDocument()
    })
  })
})
