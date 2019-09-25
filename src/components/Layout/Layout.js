import React, { Component } from 'react';
import Aux from '../../Auxilury/Auxi';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}
	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}
	sideDrawerOpenHandler = () => {
		this.setState({showSideDrawer: true})
	}
	sidedrawerToggle = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}
	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sidedrawerToggle} open={this.sideDrawerOpenHandler} closed={this.sideDrawerClosedHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/> 
				<main className="mt-10">
					{ this.props.children}
				</main>
			</Aux>
		)
	}
	
}

export default Layout;