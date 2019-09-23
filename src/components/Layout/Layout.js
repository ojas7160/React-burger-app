import React from 'react';
import Aux from '../../Auxilury/Auxi';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => (
	<Aux>
		<Toolbar />
		<SideDrawer /> 
		<main className="mt-10">
			{ props.children}
		</main>
	</Aux>
);

export default Layout;