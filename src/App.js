import React from 'react';
import Register from './Register.js';
import Checkout from './Checkout.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends React.Component {

render() {
  return (
        <Router>
        <div className="App">
        <Route path = "/register" component = {Register} />
        <Route path = "/checkout" component = {Checkout} />
        </div>
        </Router>
  );
}
}
export default App;