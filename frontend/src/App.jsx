import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import NavMobile from './components/NavMobile';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={Landing} />
        </Switch>
        {/* Include the mobile nav in every page */}
        <NavMobile />
      </Router>
    );
  }
}
export default App;
