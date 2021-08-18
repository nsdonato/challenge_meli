const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')
const { renderRoutes } = require('react-router-config')
const routes = require('../../client/routes/appRoutes').default

const configRoutes = (html, manifest, title = 'Mercado Libre Test') => {
  const mainStyles = manifest ? manifest['main.css'] : '/assets/app.css'
  const mainBundle = manifest ? manifest['main.js'] : '/assets/app.js'
  const vendorsBundle = manifest ? manifest['vendors.js'] : '/assets/vendors.js'
  const favicon = manifest ? manifest['assets/logo.png'] : '/assets/logo.png'

  return `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="${favicon}">
      <link rel="stylesheet" href="${mainStyles}" type="text/css">
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="${mainBundle}" type="text/javascript"></script>
      <script src="${vendorsBundle}" type="text/javascript"></script>
    </body>
  </html>`
}

export const renderClient = (req, res) => {
  const page = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      {renderRoutes(routes)}
    </StaticRouter>
  )

  res.send(configRoutes(page, req.hashManifest))
}
