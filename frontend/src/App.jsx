import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Presupuestador from './components/Presupuestador';
import Presupuestos from './components/Presupuestos';
import Productos from './components/Productos';
import Clientes from './components/Clientes';

import { productData } from '../seeders/product-data'


function Layout() {
  return (
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
              style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor:'white', color:'#2c3e50'  } : {}}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/presupuestador'
              className={({ isActive }) => isActive ? 'white' : ''}
              style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor:'white', color: '#2c3e50' } : {}}
            >
              Presupuestador
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/productos'
              className={({ isActive }) => isActive ? 'white' : ''}
              style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor:'white', color: '#2c3e50' } : {}}
            >
              Productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/presupuestos'
              className={({ isActive }) => isActive ? 'white' : ''}
              style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor:'white', color:'#2c3e50' } : {}}
            >
              Presupuestos
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to='/clientes'
              className={({ isActive }) => isActive ? 'white' : ''}
              style={({ isActive }) => isActive ? { fontWeight: 'bold', backgroundColor:'white', color:'#2c3e50'  } : {}}
            >
              Clientes
            </NavLink>
          </li> */}
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
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/presupuestador',
        element: <Presupuestador
          productData={productData}

        />
      },
      {
        path: '/productos',
        element: <Productos productData={productData}/>
      },
      {
        path: '/presupuestos',
        element: <Presupuestos />,
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
