import React from 'react';
import './Register.css';
import cookie from 'react-cookies';
import Puzzle from './Puzzle.js';
import Code from './Code.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        code:'',
        isPuzzleCode:true,
        questionType:'',
        questionNumber:'',
        time: {}
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.onEndTest = this.onEndTest.bind(this);
    this.checkProgress = this.checkProgress.bind(this);
    this.openTimer = this.openTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
}
secondsToTime(secs){
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    "h": hours,
    "m": minutes,
    "s": seconds
  };
  return obj;
}

componentDidMount(){
  this.checkProgress();
  this.openTimer();
}

openTimer(){
  let timeLeftVar = this.secondsToTime(parseInt(cookie.load('challengeTime')));
  this.setState({ time: timeLeftVar });
  this.startTimer();
}

startTimer() {
  if (this.timer == 0 && parseInt(cookie.load('challengeTime')) > 0) {
    this.timer = setInterval(this.countDown, 1000);
  }
}

stopTimer(){
  this.setState({timer:undefined});
}

countDown() {
  // Remove one second, set state so a re-render happens.
  let seconds = parseInt(cookie.load('challengeTime')) - 1;
  this.setState({
    time: this.secondsToTime(seconds)
  });
  cookie.save('challengeTime', seconds.toString(), { path: '/' });
  // Check if we're at zero.
  if (seconds == 0) { 
    clearInterval(this.timer);
    this.onEndTest();
  }
}
checkProgress(){
  var teamName=cookie.load('teamName');
  if(teamName!==null&&teamName!==undefined&&teamName!==""){
  fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/fetchProgress?key=SHARED_KEY",{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"teamName":teamName})
        })
          .then(res => res.json())
          .then(
            (result) => {
              if(result.status === "Success"){
                if(result.questionNumber === "4"){
                  this.props.history.length = -1;
                  this.props.history.push('/CompleteTestPage');
                }
                else{
                  this.setState({questionType:result.questionType,questionNumber:result.questionNumber});
                }
              }else if(result.status === "Fail"){
                  alert("Something went wrong");
              }
            }
    )
  }else{
    this.props.history.push('/login');
  }
}

onEndTest(){
  var teamName=cookie.load('teamName');
  fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/finalSubmission?key=SHARED_KEY",{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"teamName":teamName,"completionTime":cookie.load('challengeTime')})
        })
          .then(res => res.json())
          .then(
            (result) => {
              if(result.status === "Success"){
                this.setState({questionType:result.questionType});
              }else if(result.status === "Fail"){
                  alert("Something went wrong");
              }
            }
    )
}



render() {
  return (
    <div className="">
        <div className="challengeHeader">
            <div className="challengeHeaderMessage">Break the ENGIMA</div>
            <div className="challengeTimer">{this.state.time.h} : {this.state.time.m} : {this.state.time.s}</div>
            <div className="endTestButton" onClick={this.onEndTest}>End Test</div>
        </div>
        <div className="challengeBody">
            {this.state.questionType==="P"?
            <Puzzle timer = {this.state.seconds} toggleQuestion={this.checkProgress}/>:this.state.questionType==="C"?
            <Code timer = {this.state.seconds} toggleQuestion={this.checkProgress}/>:<div></div>}
        </div>
    </div>
  );
}
}
export default Question;
