import React from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/" active>Burger Builder</NavigationItem> {// for boolean props you can just mention active instead of active={true}
    }
    
    <NavigationItem link="/">checkout</NavigationItem>
  </ul>
);

export default navigationItems;