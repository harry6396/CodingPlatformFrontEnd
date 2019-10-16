import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';
import cookie from 'react-cookies';
import Select from 'react-select';
import qs from 'qs';

var hackerEarth=require('hackerearth-node'); //require the Library
//Now set your application 
var hackerEarth=new hackerEarth(
        'c80a8e5ab76c54820f05971d7ed7b8286431087a',  //Your Client Secret Key here this is mandatory
        0  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
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
      codeInputFormat:[],
      codeOutputFormat:[],
      codeTestCases:'',
      toShowLoader:false,
      questionType:'',
      codeOutput:'',
      codeInput:'',
      example:[],
      placeHolder: "Select Language",
      selectedOption:'',
      oAvailableLanguage:[{value:"C", label:"C"},{value:"CPP", label:"C++"},{value:"Py", label:"Python"},{value:"JAVA", label:"JAVA"}]
    };
    this.compileCode = this.compileCode.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.submitScore = this.submitScore.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.splitCodeInput = this.splitCodeInput.bind(this);
    this.splitCodeOutput = this.splitCodeOutput.bind(this);
    this.splitCodeExample = this.splitCodeExample.bind(this);
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
              if(result.status === "Success"&&result.problemStatement!=="4"){
                this.splitCodeInput(result.questionInputFormat);
                this.splitCodeOutput(result.questionOutputFormat);
                this.splitCodeExample(result.example);
                this.setState({codeStatement:result.problemStatement,codeDescription:result.problemDescription, toShowLoader:false});
              }else if(result.problemStatement==="4"){
                alert("Test Completed");
              }
              else if(result.status === "Fail"){
                  alert("Something went wrong");
              }
            }
    )
  }else{
    this.props.history.push('/login');
  }
}
updateCode(event){
  this.setState({codeInput:event.target.value});
}
splitCodeInput(questionInputFormat){
  var delimiter="$_$";
  var output = questionInputFormat.split(delimiter);
  this.setState({codeInputFormat:output});
}
splitCodeOutput(questionInputFormat){
  var delimiter="$_$";
  var output = questionInputFormat.split(delimiter);
  this.setState({codeOutputFormat:output});
}
splitCodeExample(questionInputFormat){
  var delimiter="$_$";
  var output = questionInputFormat.split(delimiter);
  this.setState({example:output});
}
compileCode(){
  fetch("https://ideas2it-hackerearth.p.rapidapi.com/compile/", {
    "method": "POST",
    "headers": {
      "x-rapidapi-host": "ideas2it-hackerearth.p.rapidapi.com",
      "x-rapidapi-key": "8befd2b7c8msh15a1471ae2f8f39p1bfc20jsn980dfbdc4c7a",
      "content-type": "application/x-www-form-urlencoded"
    },
    "body": {
      "async": "0",
      "time_limit": "10",
      "memory_limit": "262144",
      "client_secret": "c80a8e5ab76c54820f05971d7ed7b8286431087a",
      "source": "int main() {   printf(\"Hello world\\n\");   return 0; }",
      "lang": "C"
    }
  })
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
}
submitCode(){
  hackerEarth.run(config)
                    .then(result => {
                      console.log(result);
                      //this.submitScore();
                    })
                    .catch(err => {
                      alert(err);
                    });
  //this.submitScore();
}
submitScore(){
  var teamName=cookie.load('teamName');
  if(teamName!==null&&teamName!==undefined&&teamName!==""){
  fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/fetchQuestion?key=SHARED_KEY",{
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
handleChange = (selectedOption) => {
  this.setState({ selectedOption: selectedOption });
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
        <div className="codingQuestion">{this.state.codeStatement}</div>
        <div className="codeDescription">{this.state.codeDescription}</div>
        <div className="codeInputType">Constraints{this.state.codeInputFormat.map((i,key) => {
            return <div key={key}>{i}</div>;
        })}</div>
        <div className="codeOutputType">Input{this.state.example.map((i,key) => {
            return <div key={key}>{i}</div>;
        })}</div>
        <div className="codeOutputType">Expected Output{this.state.codeOutputFormat.map((i,key) => {
            return <div key={key}>{i}</div>;
        })}</div>
        <Select
            className="availableLanguage"
            onChange={this.handleChange}
            options={this.state.oAvailableLanguage}
            placeholder={this.state.placeHolder}
        />
        <div className=""><textarea className="codeInput" type="text" placeholder="Type your code here" onChange={this.updateCode}/></div>
        <div className="buttonHolder">
        <div className="codeAnswerButton" onClick={this.compileCode}>Compile</div>
        <div className="codeAnswerButton" onClick={this.submitCode}>Submit</div>
        </div>
        </div>
      }
    </div>
  );
}
}
export default Code;
