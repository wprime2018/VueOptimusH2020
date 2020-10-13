import Home from '@/pages/Home'
import Products from '@/pages/Products'
import Cart from '@/pages/Cart'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import MyOrders from '@/pages/Auth/MyOrders'
import DetailOrder from '@/pages/DetailOrder'
import LoadTableCompany from '@/pages/LoadTableCompany'
import PageNotFound from '@/pages/PageNotFound'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultTemplate'),
    children: [
      {
        path: '/:token_company/:token_table',
        component: LoadTableCompany,
        name: 'load.table.company',
        props: true,
      },

      {
        path: '/pedido/:identify',
        component: DetailOrder,
        name: 'detail.order',
        props: true,
        meta: {
          title: 'Pedido'
        }
      },

      {
        path: '/carrinho',
        component: Cart,
        name: 'cart',
        meta: {
          title: 'Carrinho'
        }
      },
    
      {
        path: '/loja/:companyFlag',
        component: Products,
        name: 'products',
        props: true
      },
    
      {
        path: '/',
        component: Home,
        name: 'home',
        meta: {
          title: 'Empresas'
        }
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/AuthTemplate'),
    children: [
      {
        path: '/entrar',
        component: Login,
        name: 'login'
      },
    
      {
        path: '/cadastrar',
        component: Register,
        name: 'register'
      },

      {
        path: '/meus-pedidos',
        component: MyOrders,
        name: 'myorders'
      },
    ]
  },
  {
    path: '*',
    component: PageNotFound,
    meta: {
      title: 'Página não encontrada!'
    }
  }


]

export default routes