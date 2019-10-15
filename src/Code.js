import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';
import cookie from 'react-cookies';

var hackerEarth=require('hackerearth-node'); //require the Library
//Now set your application 
var hackerEarth=new hackerEarth(
        'f3c1455800df92db6737d087ac0c93424bbe1e40',  //Your Client Secret Key here this is mandatory
        1  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);
var config={};
config.time_limit=1;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source='print("Hello")';  //your source code for which you want to use hackerEarth api
config.input="";  //input against which you have to test your source code
config.language="Py"; //optional choose any one of them or none

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codeStatement:'',
      codeDescription:'',
      toShowLoader:false,
      questionType:'',
      codeOutput:''
    };
    this.compileCode = this.compileCode.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.submitScore = this.submitScore.bind(this);
}
componentDidMount(){
  var teamName=cookie.load('teamName');
  if(teamName!==null&&teamName!==undefined&&teamName!==""){
  fetch("http://localhost:8080/codingPlatform/fetchQuestion?key=SHARED_KEY",{
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
                this.setState({codeStatement:result.problemStatement,codeDescription:result.problemDescription});
              }else if(result.status === "Fail"){
                  alert("Something went wrong");
              }
            }
    )
  }else{
    this.props.history.push('/login');
  }
}
compileCode(){
    hackerEarth.compile(config)
                        .then(result => {
                          console.log(result);
                          this.submitCode();
                        })
                        .catch(err => {
                            console.log(err);
                        });
}
submitCode(){
  hackerEarth.run(config)
                    .then(result => {
                      this.submitScore();
                    })
                    .catch(err => {
                      alert(err);
                    });
}
submitScore(){
  var teamName=cookie.load('teamName');
  if(teamName!==null&&teamName!==undefined&&teamName!==""){
  fetch("http://localhost:8080/codingPlatform/fetchQuestion?key=SHARED_KEY",{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"teamName":teamName,"answer":"ac"})
        })
          .then(res => res.json())
          .then(
            (result) => {
              if(result.status === "Success"){
                  this.props.toggleQuestion();
              }else if(result.status === "Fail"){
                  alert("Something went wrong");
              }
            }
    )
  }else{
    this.props.history.push('/login');
  }
}

render() {
  return (
    <div className="header">
        <div className="codingQuestion">{this.state.codeStatement}</div>
        <div className="codeDescription">{this.state.codeDescription}</div>
        <div className=""><textarea className="codeInput" type="text" placeholder="Insert your code here"/></div>
        <div className="buttonHolder">
        <div className="puzzleAnswerButton" onClick={this.compileCode}>Compile</div>
        <div className="puzzleAnswerButton" onClick={this.submitCode}>Submit</div>
        </div>
    </div>
  );
}
}
export default Code;
