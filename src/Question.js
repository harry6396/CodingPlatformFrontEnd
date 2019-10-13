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
    this.changeCodingQuestion = this.changeCodingQuestion.bind(this);
}

changeCodingQuestion(){
    var iProblemCounter = cookie.load('challengeQuestionNumber');
    cookie.save('challengeQuestionNumber', iProblemCounter++, {path: '/'} );
    this.setState({isPuzzleCode: true});
}

componentDidMount(){

}

onEndTest(){

}

toggleQuestionType(){
    cookie.save('currentQuestionTypeStatus', 'C', {path: '/'} );
    this.setState({isPuzzleCode: false});
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
            },
            {
            time: 600 * 60,
            callback: () => console.log('Checkpoint B'),
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
            <Puzzle
            
            />:
            <Code/>}
        </div>
    </div>
  );
}
}
export default Question;
