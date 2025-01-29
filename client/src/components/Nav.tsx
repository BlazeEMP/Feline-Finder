import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <div className='nav-column'>
                <span>Navigation</span>
                <NavLink to='/'>Login</NavLink>
                <NavLink to='/Homepage'>Home</NavLink>
                <NavLink to='/SavedCats'>Potential Cat Breeds</NavLink>
                <button onClick={() => {
                    localStorage.removeItem('token');
                    alert('You have been logged out');
                }}>Logout</button>
            </div>
        </>
    )
};

export default Nav;