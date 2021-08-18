import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AppRoute = routeProps => {
  const { component: Component, path, exact, extraPropsHeader } = routeProps
  let page = null

  if (path === '/') {
    page = <Redirect to='/' />
  } else {
    page = (
      <Route
        {...{ exact, path }}
        render={props => (
          <Component {...props} extraPropsHeader={e => extraPropsHeader(e)} />
        )}
      />
    )
  }
  return page
}

export default AppRoute
