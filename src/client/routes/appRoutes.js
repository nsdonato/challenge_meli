import { ProductDetail } from '../containers/ProductDetail'
import { Results } from '../containers/Results'
import App from '../containers/App'

const routes = [
  {
    path: '/',
    component: App,
    exact: true,
    key: 'app'
  },
  {
    path: '/items',
    component: Results,
    exact: true,
    key: 'results'
  },
  {
    path: '/items/:id',
    component: ProductDetail,
    exact: true,
    key: 'productDetails'
  }
]

export default routes
