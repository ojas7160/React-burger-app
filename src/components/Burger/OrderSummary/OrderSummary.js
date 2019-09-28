import React, { Component } from 'react';
import Aux from '../../../Auxilury/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  UNSAFE_componentWillUpdate() {
    console.log('order summary will update')
  }
  
  render () {
    const ingredientsSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{textTranform: 'capitalize'}}>{igKey}: {this.props.ingredients[igKey]}</span>
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
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>Cancel</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
      </Aux>
    )
  }
  
};

export default OrderSummary;