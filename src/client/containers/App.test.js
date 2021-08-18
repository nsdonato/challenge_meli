import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

beforeEach(() => {
  jest.resetModules()
})

describe('Test App component', () => {
  test('initial render of App', () => {
    render(
      <Router>
        <App />
      </Router>
    )
    const logo = screen.getByRole('img', {
      name: /imagen del logo de mercado libre/i
    })
    expect(logo).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
