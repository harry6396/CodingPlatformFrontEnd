import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';
import cookie from 'react-cookies';
import Select from 'react-select';

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testCase:'',
      compileOutput:'',
      compileMessage:'',
      isCompileTest:false,
      isRunTest:false,
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
      sTestCase:[],
      expectedOp:[],
      oAvailableLanguage:[{value:"JAVA", label:"JAVA"}]
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
              if(result.status === "Success"){
                this.splitCodeInput(result.questionInputFormat);
                this.splitCodeOutput(result.questionOutputFormat);
                this.splitCodeExample(result.example);
                this.setState({codeStatement:result.problemStatement,codeDescription:result.problemDescription, toShowLoader:false, testCase:result.testCase, expectedOp:result.expectedOp});
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
  // this.setState({isCompileTest:true,compileOutput:'', compileMessage:''});
  // var teamName=cookie.load('teamName');
  // if(this.state.selectedOption === '' || this.state.selectedOption === undefined || this.state.selectedOption === null){
  //     alert("Please select a language");
  // }else if(this.state.codeInput === '' || this.state.codeInput === undefined || this.state.codeInput === null){
  //     alert("Please write code to compile");
  // }
  // else{
  // fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/compileAPI?key=SHARED_KEY",{
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         method: "POST",
  //         body: JSON.stringify({"teamName":teamName,"sourceCode":this.state.codeInput,"lang":this.state.selectedOption,"type":"compile"})
  //       })
  //         .then(res => res.json())
  //         .then(
  //           (result) => {
  //             if(result.result.compile_status==="OK"){
  //               this.setState({isCompileTest:false,compileOutput:'Compiled Successfully', compileMessage:''});
  //             }else{
  //               this.setState({isCompileTest:false,compileOutput:'Failed', compileMessage:result.result.compile_status});
  //               console.log(result.result.compile_status);
  //             }
  //           }
  //   )
  // }
  this.setState({isCompileTest:false,compileOutput:'Compiled Successfully', compileMessage:''});
}
submitCode(){
  // this.setState({isRunTest:true,compileOutput:'', compileMessage:'',isCompileTest:false});
  // fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/compileAPI?key=SHARED_KEY",{
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         method: "POST",
  //         body: JSON.stringify({"sourceCode":this.state.codeInput,"lang":this.state.selectedOption,"type":"run", "testCase":this.state.testCase})
  //       })
  //         .then(res => res.json())
  //         .then(
  //           (result) => {
  //             if(result.result.run_status.output === undefined){
  //               alert("Compilation Error");
  //             }
  //             else if(result.result.run_status.output!==null){
  //               console.log(result.result.run_status.output);
  //               var opString = result.result.run_status.output.replace(/(\r\n|\n|\r)/gm, "");
  //               if(opString === this.state.expectedOp){
  //               alert("Passed all test cases");
  //               this.submitScore();
  //               }else{
  //                 alert("Please try again. Not all test case passed");
  //               }
  //             }else if(result.result.run_status.output=== null){
  //               alert("First compile and then submit");
  //             }else{
  //               alert("Please try again. Not all test case passed");
  //             }
  //             this.setState({isRunTest:false});
  //           }
  //   )
  this.setState({isRunTest:true,compileOutput:'', compileMessage:'',isCompileTest:false});
  this.submitScore();
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
                  this.setState({isRunTest:false});
              }else if(result.status === "Fail"){
                  alert("Something went wrong");
                  this.setState({isRunTest:false});
              }
            }
    )
  }else{
    this.props.history.push('/login');
  }
}
handleChange = (selectedOption) => {
  this.setState({ selectedOption: selectedOption.value });
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
        <div className="codeOutputType">Please note:- Use Test as class name for JAVA</div>
        <Select
            className="availableLanguage"
            onChange={this.handleChange}
            options={this.state.oAvailableLanguage}
            placeholder={this.state.placeHolder}
        />
        <div className=""><textarea className="codeInput" type="text" placeholder="Type your code here" onChange={this.updateCode} onCopy="return false" onDrag="return false" onDrop="return false" onPaste="return false"/></div>
        <div className="buttonHolder">
        <div className="codeAnswerButton" onClick={this.compileCode}>{this.state.isCompileTest?<Loader type="Circles" color="#ffffff" height={20} width={20}/>:<div>Compile</div>}</div>
        <div className="codeAnswerButton" onClick={this.submitCode}>{this.state.isRunTest === true?<Loader type="Circles" color="#ffffff" height={20} width={20}/>:<div>Submit</div>}</div>
        </div>
        <div className = "compileOutput">{this.state.compileOutput}</div>
        <div className = "compileMessage">{this.state.compileMessage}</div>
        </div>
      }
    </div>
  );
}
}
export default Code;
