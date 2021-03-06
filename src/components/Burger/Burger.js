import React from 'react';
import './Burger.css';
import { withRouter } from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props)
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, index) => {
            return <BurgerIngredient key={igKey + index} type={igKey}/>
        })
    }).reduce((prevArray, newElement) => {
        return prevArray.concat(newElement)
    }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients.</p>
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);