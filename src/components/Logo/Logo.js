import React from 'react';
import BurgerLogo from '.././../assets/images/133 burger-logo.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={BurgerLogo} alt="Logo" />
    </div>
);  

export default logo;