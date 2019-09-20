import React from 'react';
import Aux from '../../../Auxilury/Auxi';

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
  .map(igKey => {
    return (
      <li key={igKey}>
        <span style={{textTranform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</span>
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients.</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>Continue to checkout</p>
    </Aux>
  )
};

export default orderSummary;