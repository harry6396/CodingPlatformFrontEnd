import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTeamNameAvailable: false,
      teamName:'',
      candidateName1:'',
      candidateName2:'',
	  candidateName3:'',
      candidateName4:'',
      candidatePhoneNumber1:'',
      candidatePhoneNumber2:'',
	  candidatePhoneNumber3:'',
      candidatePhoneNumber4:'',
      candidateEmailID1:'',
      candidateEmailID2:'',
	  candidateEmailID3:'',
      candidateEmailID4:'',
      toShowLoader:false,
      toShowBlurBackGround: false,
      teamAvailableMessage: '',
      toShowTeamMessage: false
    };
    this.checkTeamAvailable = this.checkTeamAvailable.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleNameChange1 = this.handleNameChange1.bind(this);
    this.handleNameChange2 = this.handleNameChange2.bind(this);
	  this.handleNameChange3 = this.handleNameChange3.bind(this);
    this.handleNameChange4 = this.handleNameChange4.bind(this);
    this.handlePhoneNumberChange1 = this.handlePhoneNumberChange1.bind(this);
    this.handlePhoneNumberChange2 = this.handlePhoneNumberChange2.bind(this);
	  this.handlePhoneNumberChange3 = this.handlePhoneNumberChange3.bind(this);
    this.handlePhoneNumberChange4 = this.handlePhoneNumberChange4.bind(this);
    this.handleEmailIDChange1 = this.handleEmailIDChange1.bind(this);
    this.handleEmailIDChange2 = this.handleEmailIDChange2.bind(this);
	  this.handleEmailIDChange3 = this.handleEmailIDChange3.bind(this);
    this.handleEmailIDChange4 = this.handleEmailIDChange4.bind(this);
    this.registerTeam = this.registerTeam.bind(this);
    
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

handleNameChange3(event){
    this.setState({candidateName3:event.target.value});
}

handleNameChange4(event){
  this.setState({candidateName4:event.target.value});
}

handlePhoneNumberChange1(event){
  this.setState({candidatePhoneNumber1:event.target.value});
}

handlePhoneNumberChange2(event){
  this.setState({candidatePhoneNumber2:event.target.value});
}

handlePhoneNumberChange3(event){
  this.setState({candidatePhoneNumber3:event.target.value});
}

handlePhoneNumberChange4(event){
  this.setState({candidatePhoneNumber4:event.target.value});
}

handleEmailIDChange1(event){
  this.setState({candidateEmailID1:event.target.value});
}

handleEmailIDChange2(event){
  this.setState({candidateEmailID2:event.target.value});
}

handleEmailIDChange3(event){
  this.setState({candidateEmailID3:event.target.value});
}

handleEmailIDChange4(event){
  this.setState({candidateEmailID4:event.target.value});
}

registerTeam(){
  this.setState({toShowLoader:true,toShowBlurBackGround:true});
    fetch("https://codingplatformbackend.herokuapp.com/codingPlatform/register?key=SHARED_KEY",{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(
      [{"EmailID":this.state.candidateEmailID1,"PhoneNumber":this.state.candidatePhoneNumber1,"Name":this.state.candidateName1,"TeamName":this.state.teamName,"status":null},
      {"EmailID":this.state.candidateEmailID2,"PhoneNumber":this.state.candidatePhoneNumber2,"Name":this.state.candidateName2,"TeamName":this.state.teamName,"status":null},
	  {"EmailID":this.state.candidateEmailID3,"PhoneNumber":this.state.candidatePhoneNumber3,"Name":this.state.candidateName3,"TeamName":this.state.teamName,"status":null},
	  {"EmailID":this.state.candidateEmailID4,"PhoneNumber":this.state.candidatePhoneNumber4,"Name":this.state.candidateName4,"TeamName":this.state.teamName,"status":null}
	  ])
      })
      .then(res => res.json())
      .then(
        (result) => {
          if(result.status === "Success"){
            this.setState({toShowLoader:false,toShowBlurBackGround:false});
            this.props.history.push('');
            this.props.history.push('/checkout');
          }
        }
      )
}

checkTeamAvailable(){
    if(this.state.teamName.length>0){
    this.setState({toShowLoader:true});
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
            this.setState({toShowTeamMessage:true,isTeamNameAvailable:true,toShowLoader:false, teamAvailableMessage:'Team Name Available'});
            document.getElementById('teamID').readOnly = true;
          }else if(result.status === "Fail"){
            alert("Team Name Not Available");
            this.setState({toShowTeamMessage:true,toShowLoader:false, teamAvailableMessage:'Team Name Not Available'});
          }
        }
      )
  }else{
    alert("Team name cannot be empty");
  }
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
            <div className="teamNameDiv">
              <input id="teamID" placeholder="Enter team name" type="text" className="teamNameInput" onChange={this.handleTeamChange}/></div>
            {this.state.isTeamNameAvailable === false?<div className="submitDiv"><div className="submitButton" onClick={this.checkTeamAvailable}>Check Validity</div></div>:<div></div>}
        </div>
        {this.state.toShowLoader?<div className="loaderDiv"><Loader
         type="Circles"
         color="#00BFFF"
         height={100}
         width={100}
         /></div>:<div></div>}
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
			<div className="candidateForm1">
                <div className="candidateFormHeader">Candidate 3</div>
                <div className="nameDiv">
                    <div className="nameInputTitle">Name</div>
                    <input className="nameInput" type="text" placeholder="Enter name" onChange={this.handleNameChange3}/>
                </div>
                <div className="phoneNumberDiv">
                    <div className="phoneNumberInputTitle">Phone Number</div>
                    <input className="phoneNumberInput" type="text" placeholder="Enter phone number" onChange={this.handlePhoneNumberChange3}/>
                </div>
                <div className="emailIDDiv">
                    <div className="emailIDInputTitle">Email ID</div>
                    <input className="emailIDInput" type="text" placeholder="Enter Email ID" onChange={this.handleEmailIDChange3}/>
                </div>
            </div>
			<div className="candidateForm1">
                <div className="candidateFormHeader">Candidate 4</div>
                <div className="nameDiv">
                    <div className="nameInputTitle">Name</div>
                    <input className="nameInput" type="text" placeholder="Enter name" onChange={this.handleNameChange4}/>
                </div>
                <div className="phoneNumberDiv">
                    <div className="phoneNumberInputTitle">Phone Number</div>
                    <input className="phoneNumberInput" type="text" placeholder="Enter phone number" onChange={this.handlePhoneNumberChange4}/>
                </div>
                <div className="emailIDDiv">
                    <div className="emailIDInputTitle">Email ID</div>
                    <input className="emailIDInput" type="text" placeholder="Enter Email ID" onChange={this.handleEmailIDChange4}/>
                </div>
            </div>
            <div className="registerButton" onClick={ this.registerTeam }>Submit</div>
        </div>:<div></div>}
    </div>
  );
}
}
export default Register;
