import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <div className='nav-column'>
                <span>Navigation</span>
                <NavLink to='/'>Login</NavLink>
                <NavLink to='/Homepage'>Home</NavLink>
                <NavLink to='/SavedCats'>Potential Cat Breeds</NavLink>
            </div>
        </>
    )
};

export default Nav;