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

checkTeam(){
    if(this.state.teamName.length>0&&this.state.passCode.length>0){
        this.setState({toShowLoader:true});
        fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/login?key=SHARED_KEY",{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"teamName":this.state.teamName,"passCode":this.state.teamName,"status":null})
        })
          .then(res => res.json())
          .then(
            (result) => {
              if(result.status === "Success"){
                console.log(result);
                this.saveChallengeData(result.teamName);
              }else if(result.status === "Fail"){
                  alert("Something went wrong");
              }
            }
          )
      }else if(this.state.teamName.length===0){
        alert("Team name cannot be empty");
      }else if(this.state.passCode.length===0){
        alert("Passcode cannot be empty");
      }
}

saveChallengeData(challengeData){
    cookie.save('teamName', challengeData, { path: '/' });
    this.setState({toShowLoader:false});
    this.props.history.push('/challenge');
}

render() {
  return (
    <div className="header">
        <div className="headerBackground">
        <div className="heading">Break the ENGIMA</div>
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
         color="#00BFFF"
         height={50}
         width={50}
         /></div>:<div></div>}
    </div>
  );
}
}
export default Login;
