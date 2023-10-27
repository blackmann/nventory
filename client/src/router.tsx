import { Navigate, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Project from './pages/[project]/products'
import ProductDetail from './pages/[project]/products/[product]'
import NewProduct from './pages/[project]/products/new'
import { getProjectFromSlug, loadProjects, projects } from './lib/projects'
import request from './lib/request'
import Login from './pages/login'
import ErrorPage, { AppError } from './pages/error'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    loader: async () => {
      try {
        await loadProjects()
        return null
      } catch {}
    },
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
              try {
                if (projects.peek().length === 0) {
                  await loadProjects()
                }

                const project = getProjectFromSlug(params.project!)

                const { data } = await request.get(
                  `/products?project=${project?._id}`
                )

                return data.data
              } catch (err) {
                throw new AppError('Failed to load projects or products', err)
              }
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
