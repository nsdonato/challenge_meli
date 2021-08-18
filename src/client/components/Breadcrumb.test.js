import React from 'react'
import { render, screen } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

beforeEach(() => {
  jest.resetModules()
})

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ url: '/' })
}))

const defaultProps = {
  categories: ['Animales', 'Perros']
}

describe('Test Breadcrumb component', () => {
  test('initial render of Breadcrumb', () => {
    render(<Breadcrumb {...defaultProps} />)

    const animals = screen.getByText('Animales')
    expect(animals).toBeInTheDocument()
    expect(animals).toHaveClass('breadcrumb__category', { exact: true })

    const dogs = screen.getByText('Perros')
    expect(dogs).toBeInTheDocument()
    expect(dogs).toHaveClass('breadcrumb__category bold', { exact: true })
  })
})
