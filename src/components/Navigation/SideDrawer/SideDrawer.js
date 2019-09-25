import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Aux from '../../../Auxilury/Auxi';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
  let attachedClasses = ['SideDrawer', 'Close'];
  if(props.open) {
    attachedClasses = ['SideDrawer', 'Open']
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div style={{height: "11%"}} className="mr-bt-32">
          <Logo />
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;