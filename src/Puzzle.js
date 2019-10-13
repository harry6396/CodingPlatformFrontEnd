import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';

class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName:'',
      passCode:''
    };
}


render() {
  return (
    <div className="header">
        Puzzle
    </div>
  );
}
}
export default Puzzle;
