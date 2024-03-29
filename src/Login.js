import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';
import cookie from 'react-cookies';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName:'',
      passCode:''
    };
    this.checkTeam = this.checkTeam.bind(this);
    this.saveChallengeData = this.saveChallengeData.bind(this);
    this.handleTeam = this.handleTeam.bind(this);
    this.handlePassCode = this.handlePassCode.bind(this);
}

handleTeam(event){
    this.setState({teamName:event.target.value});
}

handlePassCode(event){
    this.setState({passCode:event.target.value});
}
componentDidMount(){
  var temaName = cookie.load('teamName');
  if(temaName!==null && temaName!==undefined && temaName !== ""){
    this.props.history.push('/challenge');
  }
}

checkTeam(){
    if(this.state.teamName.length>0&&this.state.passCode.length>0){
        this.setState({toShowLoader:true});
        fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/login?key=SHARED_KEY",{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"teamName":this.state.teamName,"passCode":this.state.passCode,"status":null})
        })
          .then(res => res.json())
          .then(
            (result) => {
              if(result.status === "Success"){
                this.saveChallengeData(result.teamName, result.initialTime);
              }else if(result.status === "Fail"){
                this.setState({toShowLoader:false});
                  alert("Wrong team name or passcode or already completed the test");
              }
            }
          )
      }else if(this.state.teamName.length===0){
        alert("Team name cannot be empty");
      }else if(this.state.passCode.length===0){
        alert("Passcode cannot be empty");
      }
}

saveChallengeData(challengeData, initialTime){
    cookie.save('teamName', challengeData, { path: '/' });
    cookie.save('challengeTime', initialTime, { path: '/' });
    this.setState({toShowLoader:false});
    this.props.history.push('/challenge');
}

render() {
  return (
    <div className="header">
        <div className="headerBackground">
        <div className="heading">Break the ENIGMA</div>
        <div className="quote">“Those who can imagine anything, can create the impossible.”
            ― Alan Turing</div>
        </div>
        <div className="registerForm">
            <div className="teamName">Team Name</div>
            <div className="teamNameDiv">
              <input id="teamID" placeholder="Enter team name" type="text" className="teamNameInput" onChange={this.handleTeam}/>
            </div>
            <div className="teamName">Team Passcode</div>
            <div className="teamNameDiv">
              <input id="teampasscode" placeholder="Enter passcode" type="password" className="teamNameInput" onChange={this.handlePassCode}/>
            </div>
            <div className="submitDiv"><div className="submitButton" onClick={this.checkTeam}>Login</div></div>
        </div>
        {this.state.toShowLoader===true?<div className="loaderDiv"><Loader
         type="Circles"
         color="#3578E5"
         height={50}
         width={50}
         /></div>:<div></div>}
    </div>
  );
}
}
export default Login;
