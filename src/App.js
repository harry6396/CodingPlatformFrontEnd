import React from 'react';
import Register from './Register.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends React.Component {

render() {
  return (
        <Router>
        <div className="App">
        <Route path = "/" component = {Register} />
        </div>
        </Router>
  );
}
}
export default App;