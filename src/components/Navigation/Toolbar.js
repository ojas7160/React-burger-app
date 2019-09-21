import React from 'react';
import './Toolbar.css';
import BurgerLogo from '../Logo/Logo';

const toolBar = (props) => (
    <header className="Toolbar">
        <div>
            Menu
        </div>
        <BurgerLogo />
        <nav>
            ...
        </nav>
    </header>
);

export default toolBar;