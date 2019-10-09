import React from 'react';
import './Input.css';

const input = (props) => {

  let inputElement = null;

  switch(props.elementType) {
    case('input'):
      inputElement = <input onChange={props.changed} className={"InputElement " + (props.invalid && props.shouldValidate && props.touched ? 'Invalid' : '')} {...props.elementConfig} value={props.value}/>
      break;
    case('textarea'):
      inputElement = <textarea onChange={props.changed} className={"InputElement " + (props.invalid && props.shouldValidate && props.touched ? 'Invalid' : '')} value={props.value}/>
      break;
    case('select'):
      inputElement = (<select onChange={props.changed} value={props.value} className="InputElement">
        {props.elementConfig.options.map(option => (<option key={option.value} value={option.value}>{option.displayValue}</option>))}
      </select>)
      break;
    default:
      inputElement = <input onChange={props.changed} className={"InputElement " + (props.invalid && props.shouldValidate && props.touched ? 'Invalid' : '')} value={props.value}/>;
      break;
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  )
};

export default input;