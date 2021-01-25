import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ title, url }) => {
	return (
		<NavLink className="nav-item" to={url}>
			<li>{title}</li>
		</NavLink>
	);
};

export default NavItem;
