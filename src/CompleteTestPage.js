import React from 'react';
import './Register.css';

class CompleteTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}

render() {
  return (
    <div className="">
        <div className="imageHolder"><img src="./green-tick.png"/></div>
        <div className="imageMessage">Test Completed</div>
    </div>
  );
}
}
export default CompleteTestPage;
