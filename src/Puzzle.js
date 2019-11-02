import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';
import cookie from 'react-cookies';

class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzleStatement:'',
      puzzleDescription:'',
      answer:'',
      toShowLoader:false,
      questionType:'',
      toShowAnswerLoader:false,
      toPuzzleLoader:false
    };
    this.onPuzzleAnswerButtonClick = this.onPuzzleAnswerButtonClick.bind(this);
    this.inputPuzzle = this.inputPuzzle.bind(this);
}
inputPuzzle(event){
  this.setState({answer:event.target.value});
}
componentDidMount(){
  this.setState({toShowLoader:true});
  var teamName=cookie.load('teamName');
  if(teamName!==null&&teamName!==undefined&&teamName!==""){
  fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/fetchQuestion?key=SHARED_KEY",{
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
                this.setState({puzzleStatement:result.puzzleStatement,puzzleDescription:result.puzzleDescription,questionType:result.questionType,toShowLoader:false});
              }else if(result.status === "Fail"){
                  alert("Something went wrong");
              }
            }
    )
  }else{
    this.props.history.push('/login');
  }
}
onPuzzleAnswerButtonClick(){
  var teamName=cookie.load('teamName');
  this.setState({toShowAnswerLoader:true});
  if(this.state.answer===""||this.state.answer===undefined||this.state.answer===null){
    alert("Please fill answer");
  }else{
  fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/fetchQuestion?key=SHARED_KEY",{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({"teamName":teamName,"answer":this.state.answer,"questionType":this.state.questionType})
  })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.status === "Success"){
          this.props.toggleQuestion();
        }else if(result.status === "Fail"){
          alert("Answer is wrong");
        }
      }
)
  }
  this.setState({toShowAnswerLoader:false,toPuzzleLoader:false});
}

render() {
  return (
    <div className="header">
      {this.state.toShowLoader===true?<div className="loadingScreen">
      <Loader
         type="Circles"
         color="#3578E5"
         height={100}
         width={100}
      />
      </div>:
      <div>
        <div className="puzzleStatement">{this.state.puzzleStatement}</div>
        <div className="puzzleDescription">{this.state.puzzleDescription}</div>
        <div className=""><input className="puzzleInput" type="text" placeholder="Answer" onChange={this.inputPuzzle}/></div>
        <div className="puzzleAnswerButton" onClick={this.onPuzzleAnswerButtonClick}>Submit</div>
        {this.state.toShowAnswerLoader===true?
        <div className="puzzleAnswerSubmit">
          <Loader
          type="Circles"
          color="#3578E5"
          height={50}
          width={50}
          />
          </div>
       :<div></div>}
      </div>}
    </div>
  );
}
}
export default Puzzle;
