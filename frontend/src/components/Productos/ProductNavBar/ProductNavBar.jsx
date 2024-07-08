import { NavLink, Outlet } from 'react-router-dom'

function ProductNavBar() {
    return (
        <>
            <div className='nav-child-container'>
                <nav className='product-nav-bar-container'>
                    <ul className='product-nav-bar'>
                        <li>
                            <NavLink
                                to='search'
                                className={({ isActive }) => isActive ? 'green' : ''}
                            >Search
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='edit'
                                className={({ isActive }) => isActive ? 'green' : ''}
                            >
                                Edit</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='add'
                                className={({ isActive }) => isActive ? 'green' : ''}
                            >
                                Add
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='delete'
                                className={({ isActive }) => isActive ? 'green' : ''}
                            >
                                Delete
                            </NavLink>
                        </li>

                    </ul>
                </nav>
                <Outlet />
            </div>
        </>
    )
}

export default ProductNavBar
