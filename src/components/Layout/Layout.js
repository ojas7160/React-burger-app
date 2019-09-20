import React from 'react';
import Aux from '../../Auxilury/Auxi';
import './Layout.css';

const Layout = (props) => (
	<Aux>
		<div>Toolbar, sidebar, backdrop</div>
		<main className="mt-10">
			{ props.children}
		</main>
	</Aux>
);

export default Layout;