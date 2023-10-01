import clsx from 'clsx'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import NewProject from '../components/new-project'
import { projects } from '../lib/projects'
import slugify from '../lib/slugify'

const appLinks = [
  {
    title: 'Products',
    href: 'products',
    icon: 'inventory_2',
  },
  {
    title: 'Sales',
    href: 'sales',
    icon: 'loyalty',
  },
  {
    title: 'Stock',
    href: 'stock',
    icon: 'euro_symbol',
  },
]

function MainLayout() {
  const { project } = useParams()

  return (
    <div className="grid grid-cols-8 gap-2 h-screen">
      <div className="col-span-1 px-2">
        <div className="p-2 mb-5 text-gray-400">— NVENTORY</div>

        <header className="text-xs text-zinc-400 uppercase mx-4">
          Projects
        </header>
        <ul className="p-2">
          {projects.value.map((project) => (
            <li>
              <NavLink
                className={({ isActive }: { isActive: boolean }) =>
                  clsx(
                    'text-zinc-500 flex items-center hover:bg-zinc-200 px-2 rounded-md',
                    { '!text-inherit bg-zinc-200': isActive }
                  )
                }
                to={slugify(project.title)}
              >
                {project.title}
              </NavLink>
            </li>
          ))}
          <li className="mt-2">
            <NewProject />
          </li>
        </ul>

        <hr className="my-3 bg-zinc-200 h-[2px]" />

        <ul className="p-2">
          {appLinks.map((link) => (
            <li>
              <NavLink
                className={({ isActive }: { isActive: boolean }) =>
                  clsx(
                    'text-zinc-500 flex items-center hover:bg-zinc-200 px-2 rounded-md',
                    { '!text-inherit bg-zinc-200': isActive }
                  )
                }
                to={`${project}/${link.href}`}
              >
                <span className="material-symbols-rounded me-2 text-base">
                  {link.icon}
                </span>{' '}
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-7">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
