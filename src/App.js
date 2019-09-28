import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import './App.css';

class App extends Component {
  state = {
    show: true
  }

  componentDidMount () {
    setTimeout(() => {this.setState({show: false})}, 5000)
  }


  render () {
    return (
      <div className="App">
        <Layout>
          {this.state.show ? <BurgerBuilder /> : null}
        </Layout>
      </div>
    );
    }
}

export default App;
