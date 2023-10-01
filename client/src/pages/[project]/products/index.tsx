import { Link, NavLink, Outlet, useParams, useRouteLoaderData } from 'react-router-dom'
import ProductItem from '../../../components/product-item'
import clsx from 'clsx'
import Product from '../../../lib/product'

function Project() {
  const { project } = useParams()
  const products = useRouteLoaderData('products') as Product[]

  return (
    <div className="p-2 h-full">
      <div className="bg-zinc-50 dark:bg-neutral-800 rounded-md h-full">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-1 border-r border-zinc-200 dark:border-neutral-700">
            <header className="border-b border-zinc-200 dark:border-neutral-700 pb-3 p-2  h-[48px] flex items-center justify-between">
              <h1 className="text-zinc-500 flex items-center font-medium">
                <span className="material-symbols-rounded text-base me-2 px-1 bg-purple-100 dark:bg-neutral-700 text-purple-600 rounded-md">
                  inventory_2
                </span>{' '}
                Products{' '}
                <span className="bg-zinc-200 text-zinc-500 rounded-md px-1 ms-2 text-xs">
                  213
                </span>
              </h1>

              <Link
                className="material-symbols-rounded text-zinc-500 hover:bg-zinc-200 rounded-md p-1"
                to={`/${project}/products/new`}
              >
                add
              </Link>
            </header>
            <div className="mt-2 px-2">
              <input
                className="w-full border border-zinc-200 dark:border-neutral-700 rounded-md px-2 py-1 outline-none"
                placeholder="Search"
              />
            </div>
            <ul className="px-1 mt-4">
              {products.map((item) => (
                <li className="[&+&]:mt-2" key={item._id}>
                  <NavLink
                    className={({ isActive }: { isActive: boolean }) =>
                      clsx(
                        'block hover:bg-zinc-100 dark:hover:bg-neutral-700 rounded-md p-1',
                        { 'bg-zinc-100 dark:bg-neutral-700': isActive }
                      )
                    }
                    to={item._id}
                  >
                    <ProductItem item={item} />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 border-r border-zinc-200 dark:border-neutral-700">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project
