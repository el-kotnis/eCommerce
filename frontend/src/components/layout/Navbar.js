import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav className='shadowed'>
		<Bars />
		<NavMenu>
		<NavLink to='/home' >
			Home
		</NavLink>
		<NavLink to='/tea' >
			Tea
		</NavLink>
		<NavLink to='/coffee' >
			Coffee
		</NavLink>
		<NavLink to='/appliances' >
			BevBuddies
		</NavLink>
		<NavLink to='/merch' >
			Merchandise
		</NavLink>
        <NavLink to='/about' >
			About Us
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
