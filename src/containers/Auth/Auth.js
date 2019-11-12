import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        label: 'Email',
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Mail'
        },
        value: '',
        validation: {
          required: true
          // isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        label: 'Password',
        elementType: 'input',
        elementConfig: {
            type: 'password',
            placeholder: 'password'
        },
        value: '',
        validation: {
          required: true
          // minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  }
  checkValidity (value, rules) {
    let isValid = false;
    if(!rules) {
        return true;
    }

    if(rules.required) {
        isValid = value.trim() !== '';
    }
    return isValid;
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls})
    // console.log("TCL: ContactData -> inputChangeHandler -> inputIdentifier", inputIdentifier)
    // console.log(event.target.value)
    // const updatedOrderForm = {
    //     ...this.state.orderForm
    // }
    // const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    // updatedFormElement.value = event.target.value;
    // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    // updatedFormElement.touched = true;
    // updatedOrderForm[inputIdentifier] = updatedFormElement;
    // let formIsValid = true;
    // for(let inputIdentifier in updatedOrderForm) {
    //     formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    // }
    // this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
  }

  render() {
    const formElementArray = [];
    for(let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }
    let form = formElementArray.map(formElement => (
      <Input 
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
        key={formElement.id}
        label={formElement.config.label}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        shouldValidate={formElement.config.validation}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}/>
        
    ))

    if(this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;
    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    return (
      <div className="Auth">
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);