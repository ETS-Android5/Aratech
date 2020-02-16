import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavMobile from "./components/NavMobile";
import Landing from "./pages/Landing";
import StdSignUp from "./pages/StdSignup";
import StdSignIn from "./pages/StdSignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={Landing} />
          <Route exact path="/student/signup" component={StdSignUp} />
          <Route exact path="/student/signin" component={StdSignIn} />
          <Route exact path="/student/signin" component={StdSignIn} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword" component={ResetPassword} />
        </Switch>
        {/* Include the mobile nav and footer in every page */}
        <NavMobile />
        <Footer />
      </Router>
    );
  }
}
export default App;
