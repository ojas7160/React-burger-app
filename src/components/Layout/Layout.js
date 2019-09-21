import React from 'react';
import Aux from '../../Auxilury/Auxi';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar';

const Layout = (props) => (
	<Aux>
		<Toolbar />
		<main className="mt-10">
			{ props.children}
		</main>
	</Aux>
);

export default Layout;