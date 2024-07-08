import { NavLink } from "react-router-dom"
function Dashboard() {
    return (
        // <h1 className="page-title">Dashboard</h1>
        <div className="dashboard-container">
            <h3 className="welcome-title">Hi, Admin</h3>
            <nav className="dashboard-nav" >
                <NavLink to="/presupuestador">Presupuestar</NavLink>
                <span>|</span>
                <NavLink to="/productos">Buscar Productos</NavLink>
                <span>|</span>
                <NavLink to="/presupuestos">Ver Presupuestos</NavLink>
                {/* <span>|</span> */}
                {/* <NavLink>Agregar Cliente</NavLink> */}
            </nav>
        </div>
    )
}

export default Dashboard
