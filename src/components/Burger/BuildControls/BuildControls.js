import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className="BuildControls">
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl key={control.label} label={control.label} more={() => props.ingredientsAdded(control.type)} less={() => props.ingredientRemoved(control.type)} disabled={props.disabledInfo[control.type]}/>
        ))}
        <button disabled={!props.purchasable} className='OrderNow'>Order now</button>
    </div>
);

export default buildControls;