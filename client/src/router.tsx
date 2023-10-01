import { Navigate, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Project from './pages/[project]/products'
import ProductDetail from './pages/[project]/products/[product]'
import NewProduct from './pages/[project]/products/new'
import { getProjectFromSlug, loadProjects, projects } from './lib/projects'
import request from './lib/request'

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      await loadProjects()
      return null
    },
    element: <MainLayout />,
    children: [
      {
        path: ':project',
        children: [
          {
            path: '',
            element: <Navigate to="products" />,
          },
          {
            path: 'products',
            id: 'products',
            element: <Project />,
            loader: async ({ params }) => {
              if (projects.peek().length === 0) {
                await loadProjects()
              }

              const project = getProjectFromSlug(params.project!)

              const { data } = await request.get(
                `/products?project=${project?._id}`
              )

              return data.data
            },
            children: [
              {
                path: 'new',
                element: <NewProduct />,
              },
              {
                loader: async ({ params }) => {
                  const { data: product } = await request.get(
                    `/products/${params.product}`
                  )
                  return product
                },
                path: ':product',
                element: <ProductDetail />,
              },
            ],
          },
          {
            path: '*',
            element: <div>Wip</div>,
          },
        ],
      },
    ],
  },
])

export default router
