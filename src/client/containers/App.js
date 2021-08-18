import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Switch } from 'react-router-dom'
import { SearchBox } from '../components/SearchBox'
import routes from '../routes/appRoutes'
import AppRoute from '../routes/AppRoute'
import { Helmet } from 'react-helmet'

import '../assets/styles/App.scss'

const App = () => {
  const history = useHistory()
  const [value, setValue] = useState('')

  const onChange = e => {
    setValue(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (!value) {
      return
    }
    history.push(`/items?search=${value}`)
  }

  return (
    <>
      <Helmet>
        <title>Mercado Libre Argentina</title>
        <meta
          name='description'
          content='La comunidad de compra y venta online más grande de América Latina.'
        />
      </Helmet>
      <main className='app-container'>
        <SearchBox onChange={onChange} onSubmit={onSubmit} value={value} />
        <div className='app-container__layout'>
          <Switch>
            {routes.map(route => {
              return <AppRoute key={route.key} {...route} />
            })}
          </Switch>
        </div>
      </main>
    </>
  )
}

export default App
