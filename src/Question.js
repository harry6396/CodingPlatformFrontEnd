import React from 'react';
import './Register.css';
import cookie from 'react-cookies';
import Timer from 'react-compound-timer';
import Puzzle from './Puzzle.js';
import Code from './Code.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        code:'',
        isPuzzleCode:true
    };
    this.onEndTest = this.onEndTest.bind(this);
    this.toggleQuestionType = this.toggleQuestionType.bind(this);
}

onEndTest(){

}
toggleQuestionType(value){
    this.setState({isPuzzleCode: value});
}

render() {
  return (
    <div className="">
        <div className="challengeHeader">
            <div className="challengeHeaderMessage">Break the ENGIMA</div>
            <div className="challengeTimer"><Timer
            initialTime={600 * 60 * 48 + 5000}
            direction="backward"
            checkpoints={[
            {
            time: 0,
            callback: () => console.log('Checkpoint A'),
            }
            ]}>
            {() => (
            <React.Fragment>
            <Timer.Hours /> : 
            <Timer.Minutes /> : 
            <Timer.Seconds />
            </React.Fragment>
            )}
             </Timer></div>
            <div className="endTestButton">End Test</div>
        </div>
        <div className="challengeBody">
            {this.state.isPuzzleCode===true?
            <Puzzle toggleQuestion={this.toggleQuestionType}/>:
            <Code toggleQuestion={this.toggleQuestionType}/>}
        </div>
    </div>
  );
}
}
export default Question;
