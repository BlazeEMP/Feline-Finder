import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <div className='nav-column'>
                <span>Navigation</span>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/SavedCats'>Potential Candidates</NavLink>
            </div>
        </>
    )
};

export default Nav;