import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';
import cookie from 'react-cookies';
import Select from 'react-select';

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
      example:[]
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
              if(result.status === "Success"&&result.problemStatement!=="7"){
                this.splitCodeInput(result.questionInputFormat);
                this.splitCodeOutput(result.questionOutputFormat);
                this.splitCodeExample(result.example);
                this.setState({codeStatement:result.problemStatement,codeDescription:result.problemDescription});
              }else if(result.problemStatement==="7"){
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
  hackerEarth.compile(config,function(err,response){
    if(err) {
      console.log(err);
    } else {
      console.log(response);
    }
});
    // hackerEarth.compile(config)
    //                     .then(result => {
    //                       console.log(result);
    //                       //this.submitCode();
    //                     })
    //                     .catch(err => {
    //                         console.log(err);
    //                     });
// fetch("https://api.hackerearth.com/v3/code/compile/",{
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*'
//           },
//           method: "POST",
//           body: JSON.stringify({"client_secret": "f3c1455800df92db6737d087ac0c93424bbe1e40",
//             "async": 1,
//             "source": "print(\"Hello\")",
//             "lang": "PYTHON",
//             "input": "",
//             "time_limit": 1,
//             "memory_limit": 323244})
//         })
//           .then(res => res.json())
//           .then(
//             (result) => {
//               if(result.status === "Success"){
//                   this.props.toggleQuestion();
//               }else if(result.status === "Fail"){
//                   alert("Something went wrong");
//               }
//             }
//     )
}
submitCode(){
  hackerEarth.run(config)
                    .then(result => {
                      //this.submitScore();
                    })
                    .catch(err => {
                      alert(err);
                    });
}
submitScore(){
  var teamName=cookie.load('teamName');
  if(teamName!==null&&teamName!==undefined&&teamName!==""){
  fetch("https://codingplatformbackend.herokuapp.com/fetchQuestion?key=SHARED_KEY",{
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
        <div className="codeInputType">Constraints{this.state.codeInputFormat.map((i,key) => {
            return <div key={key}>{i}</div>;
        })}</div>
        <div className="codeOutputType">Input{this.state.example.map((i,key) => {
            return <div key={key}>{i}</div>;
        })}</div>
        <div className="codeOutputType">Output{this.state.codeOutputFormat.map((i,key) => {
            return <div key={key}>{i}</div>;
        })}</div>
        <div className=""><textarea className="codeInput" type="text" placeholder="Type your code here" onChange={this.updateCode}/></div>
        <div className="buttonHolder">
        <div className="puzzleAnswerButton" onClick={this.compileCode}>Compile</div>
        <div className="puzzleAnswerButton" onClick={this.submitCode}>Submit</div>
        </div>
    </div>
  );
}
}
export default Code;
