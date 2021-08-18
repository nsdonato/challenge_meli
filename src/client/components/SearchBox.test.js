import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { SearchBox } from './SearchBox'
import userEvent from '@testing-library/user-event'

const mockOnChange = jest.fn()
const mockOnSubmit = jest.fn()

const defaultProps = {
  value: '',
  onChange: mockOnChange,
  onSubmit: mockOnSubmit
}

beforeEach(() => {
  jest.resetModules()
  mockOnChange.mockReset()
  mockOnSubmit.mockReset()
})

describe('Test SearchBox component', () => {
  test('initial render of SearchBox', () => {
    render(
      <Router>
        <SearchBox {...defaultProps} />
      </Router>
    )

    const logo = screen.getByRole('img', {
      name: /imagen del logo de mercado libre/i
    })
    const btnSearch = screen.getByRole('button')
    const inputSearch = screen.getByRole('textbox')

    expect(logo).toBeInTheDocument()
    expect(btnSearch).toBeInTheDocument()
    expect(inputSearch).toBeInTheDocument()
  })

  test('render with proper value', () => {
    defaultProps.value = 'test'

    render(
      <Router>
        <SearchBox {...defaultProps} />
      </Router>
    )

    const inputSearch = screen.getByRole('textbox')
    expect(inputSearch).toHaveValue('test')
  })

  test('Set value on SearchBox and Submit', async () => {
    defaultProps.value = ''
    render(<SearchBox {...defaultProps} />)

    const btnSearch = screen.getByRole('button')
    const inputSearch = screen.getByRole('textbox')

    expect(inputSearch).toHaveValue('')

    userEvent.type(inputSearch, 'remeras')
    expect(mockOnChange).toHaveBeenCalledTimes(7)

    userEvent.click(btnSearch)
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })
})
