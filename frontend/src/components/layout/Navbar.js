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
		<NavLink to='/' activeStyle>
			Home
		</NavLink>
		<NavLink to='/tea' activeStyle>
			Tea
		</NavLink>
		<NavLink to='/coffee' activeStyle>
			Coffee
		</NavLink>
		<NavLink to='/appliances' activeStyle>
			BevBuddies
		</NavLink>
		<NavLink to='/merch' activeStyle>
			Merchandise
		</NavLink>
        <NavLink to='/about' activeStyle>
			About Us
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
