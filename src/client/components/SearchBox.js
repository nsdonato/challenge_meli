import React from 'react'
import '../assets/styles/SearchBox.scss'
import logo from '../assets/images/logo.png'

export const SearchBox = props => {
  const { value, onChange, onSubmit } = props

  return (
    <nav>
      <form aria-label='form' className='search-form' onSubmit={onSubmit}>
        <img
          id='logo'
          name='logo'
          src={logo}
          alt='Imagen del logo de Mercado libre'
          className='search-form__logo'
        />
        <input
          id='search'
          name='search'
          className='search-form__input'
          placeholder='Nunca dejes de buscar'
          onChange={onChange}
          value={value}
        />
        <button
          type='submit'
          id='btnSearch'
          name='btnSearch'
          className='search-form__button'
        />
      </form>
    </nav>
  )
}
