import { createBrowserRouter, RouterProvider, NavLink, Outlet, useNavigate } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Presupuestador from './components/Presupuestador';
import PresupuestosTable from './components/PresupuestosTable';
import EditablePresupuesto from './components/Presupuestador/EditablePresupuesto';
import Productos from './components/Productos';
import Clientes from './components/Clientes';
import Login from './components/LogIn'

import { useEffect, useState } from 'react';
import { csrfFetch } from './csrf/csrf';
import Duplicate from './components/Presupuestador/Duplicate';



function Layout() {
  const navigate = useNavigate()
  const [authorized, setAuthorized] = useState(false)

  useEffect(()=> {
    const fetchUser = async () => {
      const res = await csrfFetch('/api/session')
      const user = await res.json()
      if (!user){
        navigate('/auth')
      } else {
        setAuthorized(true)
      }
    }
    if(!authorized) fetchUser()
  }, [navigate, authorized])

  if (authorized) return (
    <div>
      <h1 className='page-title'></h1>
      <div className="app">
        <nav className="nav-column">
          <img src="/th-logo.png" alt="Company Logo" className="logo" style={{ maxWidth: '200px' }} />
          <ul>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) => isActive ? 'white' : ''}
                style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor: 'white', color: '#2c3e50' } : {}}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/presupuestador'
                className={({ isActive }) => isActive ? 'white' : ''}
                style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor: 'white', color: '#2c3e50' } : {}}
              >
                Presupuestador
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/productos'
                className={({ isActive }) => isActive ? 'white' : ''}
                style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor: 'white', color: '#2c3e50' } : {}}
              >
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/presupuestos'
                className={({ isActive }) => isActive ? 'white' : ''}
                style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor: 'white', color: '#2c3e50' } : {}}
              >
                Presupuestos
              </NavLink>
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/presupuestador',
        element: <Presupuestador/>
      },
      {
        path: '/presupuestador/edit/:id',
        element: <EditablePresupuesto/>
      },
      {
        path: '/presupuestador/duplicate/:id',
        element: <Duplicate/>
      },
      {
        path: '/productos',
        element: <Productos/>
      },
      {
        path: '/presupuestos',
        element: <PresupuestosTable />,
      },
      {
        path: '/clientes',
        element: <Clientes />
      },

      {
        path: '*',
        element: <h3>Page Not Found</h3>

      }

    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
