import React from 'react';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeamNameAvailable: false,
      teamName:'',
      candidateName1:'',
      candidateName2:'',
      candidatePhoneNumber1:'',
      candidatePhoneNumber2:'',
      candidateEmailID1:'',
      candidateEmailID2:''
    };
    this.checkTeamAvailable = this.checkTeamAvailable.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleNameChange1 = this.handleNameChange1.bind(this);
    this.handleNameChange2 = this.handleNameChange2.bind(this);
    this.handlePhoneNumberChange1 = this.handlePhoneNumberChange1.bind(this);
    this.handlePhoneNumberChange2 = this.handlePhoneNumberChange2.bind(this);
    this.handleEmailIDChange1 = this.handleEmailIDChange1.bind(this);
    this.handleEmailIDChange2 = this.handleEmailIDChange2.bind(this);
}

handleTeamChange(event){
    this.setState({teamName:event.target.value});
}

handleNameChange1(event){
    this.setState({candidateName1:event.target.value});
}

handleNameChange2(event){
  this.setState({candidateName2:event.target.value});
}

handlePhoneNumberChange1(event){
  this.setState({candidatePhoneNumber1:event.target.value});
}

handlePhoneNumberChange2(event){
  this.setState({candidatePhoneNumber2:event.target.value});
}

handleEmailIDChange1(event){
  this.setState({candidateEmailID1:event.target.value});
}

handleEmailIDChange2(event){
  this.setState({candidateEmailID2:event.target.value});
}

registerTeam(){
    fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/register?key=SHARED_KEY",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(
      [{"EmailID":this.state.candidateEmailID1,"PhoneNumber":this.state.candidatePhoneNumber1,"Name":this.state.candidateName1,"TeamName":this.state.teamName,"status":null},
      {"EmailID":this.state.candidateEmailID2,"PhoneNumber":this.state.candidatePhoneNumber1,"Name":this.state.candidateName1,"TeamName":this.state.teamName,"status":null}])
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
          if(result.status === "Success"){
            console.log("Registered Successfully");
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
                    <input className="nameInput" type="text" placeholder="Enter name" onChange={this.handleNameChange1}/>
                </div>
                <div className="phoneNumberDiv">
                    <div className="phoneNumberInputTitle">Phone Number</div>
                    <input className="phoneNumberInput" type="text" placeholder="Enter phone number" onChange={this.handlePhoneNumberChange1}/>
                </div>
                <div className="emailIDDiv">
                    <div className="emailIDInputTitle">Email ID</div>
                    <input className="emailIDInput" type="text" placeholder="Enter Email ID" onChange={this.handleEmailIDChange1}/>
                </div>
            </div>
            <div className="candidateForm1">
                <div className="candidateFormHeader">Candidate 2</div>
                <div className="nameDiv">
                    <div className="nameInputTitle">Name</div>
                    <input className="nameInput" type="text" placeholder="Enter name" onChange={this.handleNameChange2}/>
                </div>
                <div className="phoneNumberDiv">
                    <div className="phoneNumberInputTitle">Phone Number</div>
                    <input className="phoneNumberInput" type="text" placeholder="Enter phone number" onChange={this.handlePhoneNumberChange2}/>
                </div>
                <div className="emailIDDiv">
                    <div className="emailIDInputTitle">Email ID</div>
                    <input className="emailIDInput" type="text" placeholder="Enter Email ID" onChange={this.handleEmailIDChange2}/>
                </div>
            </div>
            <div className="registerButton" onClick={ this.registerTeam.bind(this) }>Submit</div>
        </div>:<div></div>}
    </div>
  );
}
}
export default Register;
