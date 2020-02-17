import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import './App.css';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';  

class App extends Component {
  state = {
    show: true
  }

  componentDidMount () {
    // setTimeout(() => {this.setState({show: false})}, 5000)
  }


  render () {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/Auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
          {/* {this.state.show ? <BurgerBuilder /> : null}
          <Checkout/> */}
        </Layout>
      </div>
    );
    }
}

export default App;
