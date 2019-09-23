import React from 'react';
import './Toolbar.css';
import BurgerLogo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';

const toolBar = (props) => (
    <header className="Toolbar">
        <div>
            Menu
        </div>
        <BurgerLogo />
        <nav>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolBar;