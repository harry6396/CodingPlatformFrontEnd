import React from 'react';
import './Register.css';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

render() {
  return (
    <div className="">
        <div className="imageHolder"><img src="./green-tick.png"/></div>
        <div className="imageMessage">Miraculous! Registration Successfull</div>
    </div>
  );
}
}
export default Checkout;
