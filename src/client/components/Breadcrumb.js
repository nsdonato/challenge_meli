import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import '../assets/styles/Breadcrumb.scss'

export const Breadcrumb = ({ categories }) => {
  const { isExact } = useRouteMatch('/')

  return (
    <div className='breadcrumb'>
      {!isExact &&
        categories?.map((category, index) => {
          const bold = index === categories.length - 1 ? 'bold' : ''
          return (
            <>
              <span className={`breadcrumb__category ${bold}`}>{category}</span>
              <span className='breadcrumb__category_symbol'></span>
            </>
          )
        })}
    </div>
  )
}
