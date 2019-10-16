import React from 'react';
import './Register.css';
import cookie from 'react-cookies';
import Timer from 'react-compound-timer';
import Puzzle from './Puzzle.js';
import Code from './Code.js';
import CompleteTestPage from './CompleteTestPage.js';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        code:'',
        isPuzzleCode:true,
        questionType:'',
        questionNumber:''
    };
    this.onEndTest = this.onEndTest.bind(this);
    this.checkProgress = this.checkProgress.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
}
componentDidMount(){
  this.checkProgress();
}

stopTimer(){

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
          body: JSON.stringify({"teamName":teamName,"completionTime":"0"})
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
            <div className="challengeTimer">HH:MM:SS:</div>
        </div>
        <div className="challengeBody">
            {this.state.questionType==="P"?
            <Puzzle toggleQuestion={this.checkProgress}/>:this.state.questionType==="C"?
            <Code toggleQuestion={this.checkProgress}/>:<div></div>}
        </div>
    </div>
  );
}
}
export default Question;
