import React from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';

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
      teamName:'',
      passCode:''
    };
}

compileCode(){
    hackerEarth.compile(config)
                        .then(result => {
                          console.log(result);
                        })
                        .catch(err => {
                            console.log(err);
                        });
}

render() {
  return (
    <div className="header">
        Coding Question
    </div>
  );
}
}
export default Code;
