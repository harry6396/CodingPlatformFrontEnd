import React from 'react';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeamNameAvailable: false,
      teamName:''
    };
    this.checkTeamAvailable = this.checkTeamAvailable.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
}

handleTeamChange(event){
    this.setState({teamName:event.target.value});
}

checkTeamAvailable(){
    
    fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/checkTeam?key=SHARED_KEY",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({"teamName":this.state.teamName,"status":null})
    })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.status === "Fail"){
            this.setState({isTeamNameAvailable:true});
          }
        }
      )
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
            <div className="teamName">Enter Team Name</div>
            <div className="teamNameDiv"><input placeholder="Enter team name" type="text" className="teamNameInput" onChange={this.handleTeamChange}/></div>
            <div className="submitDiv"><div className="submitButton" onClick={this.checkTeamAvailable}>Check Validity</div></div>
        </div>
        {this.state.isTeamNameAvailable === true?
        <div className="registerForm">
            <div className="candidateForm1">
                <div className="candidateFormHeader">Candidate 1</div>
                <div className="nameDiv">
                    <div className="nameInputTitle">Name</div>
                    <input className="nameInput" type="text" placeholder="Enter name"/>
                </div>
                <div className="phoneNumberDiv">
                    <div className="phoneNumberInputTitle">Phone Number</div>
                    <input className="phoneNumberInput" type="text" placeholder="Enter phone number"/>
                </div>
                <div className="emailIDDiv">
                    <div className="emailIDInputTitle">Email ID</div>
                    <input className="emailIDInput" type="text" placeholder="Enter Email ID"/>
                </div>
            </div>
            <div className="candidateForm1">
                <div className="candidateFormHeader">Candidate 2</div>
                <div className="nameDiv">
                    <div className="nameInputTitle">Name</div>
                    <input className="nameInput" type="text" placeholder="Enter name"/>
                </div>
                <div className="phoneNumberDiv">
                    <div className="phoneNumberInputTitle">Phone Number</div>
                    <input className="phoneNumberInput" type="text" placeholder="Enter phone number"/>
                </div>
                <div className="emailIDDiv">
                    <div className="emailIDInputTitle">Email ID</div>
                    <input className="emailIDInput" type="text" placeholder="Enter Email ID"/>
                </div>
            </div>
            <div className="registerButton">Submit</div>
        </div>:<div></div>}
    </div>
  );
}
}
export default Register;